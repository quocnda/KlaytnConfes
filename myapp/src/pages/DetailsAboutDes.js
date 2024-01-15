import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/AppContext'
import { ethers } from 'ethers';
import { address_Voteduan, ABI_voteduan } from '../constant/constants';
import { CanVote } from '../components/CanVote';
import Result from '../components/Result';
export const DetailsAboutDes = () => {
  const { candidate, setcandidate, contract } = useGlobalContext();
  const [id_candi, setid_candi] = useState(0);
  const [voteYes, setvoteYes] = useState(0);
  const [voteNo, setvoteNo] = useState(0);
  const [timeremain, settimeremain] = useState(0);
  const [statusvote, setstatus] = useState(false);
  const [result,setresult] = useState(false);

  const LoadDate = () => {
    console.log(candidate)
    const voteY = candidate.voteCountYes;
    console.log("da vao loaddate")
    const voteN = candidate.voteCountNo;
    const t1 = parseInt(voteY._hex);
    const t2 = parseInt(voteN._hex);
    const id = parseInt(candidate.id._hex);
    setvoteYes(t1);
    setvoteNo(t2);
    setid_candi(id);
  }

  const getRemainingTime = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address_Voteduan, ABI_voteduan, signer);
    const time = await contract.getRemainingTime(id_candi);
    settimeremain(parseInt(time, 16));
    console.log(timeremain)
    const status = await contract.getVotingStatus(id_candi);
    console.log("status la ")
    console.log(status);
    setstatus(false)
    // const result = await contract.getCandidateApprove(id_candi);
    // console.log(result);
    // setresult(result);
  }
  const VoteCandidate = async (choice) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address_Voteduan, ABI_voteduan, signer);
    if (contract == null) {
      console.log(contract)
      alert("Error about contract")
    } else {
      if (choice == 1) {
        try {
          await contract.vote(id_candi, 1);
        } catch (error) {
          alert("You already vote");
        }
      }
      else {
        try {
          await contract.vote(id_candi, 2);
        } catch (error) {
          alert("You already vote");
        }
      }
    }
  }
  useEffect(() => {
    LoadDate();
    getRemainingTime();
  },)
  return (
    <div>
      <h1>
        Information about project
      </h1>
      <h2>
        {candidate.noidungduan}

      </h2>
      <h2>
        Descriptions :
        </h2>
        <div>
          {candidate.descriptionsProject}
        </div>
      
      <div>
        { statusvote ?  (<CanVote VoteCandidate={VoteCandidate}
        voteYes={voteYes}
        voteNo={voteNo}
        timeremain={timeremain}
      />) : (
        <div>
          <h2>
            Result:
          </h2>
         <Result result = {result} />
         </div>
      )}
      </div>
      
    </div>
  )
}
