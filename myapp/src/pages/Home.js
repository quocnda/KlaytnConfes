import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { address_Voteduan, ABI_voteduan } from '../constant/constants'
import { DetailsAboutDes } from './DetailsAboutDes'
import { useGlobalContext } from '../context/AppContext'
import { DescriptionsToAdd } from '../components/DescriptionsToAdd'
export const Home = () => {
    const {candidate,setcandidate,setremainTime} = useGlobalContext();
    const [canNavi, setcanNavi] = useState(false);
    const [contract,setContract] = useState(null);
    const [listOfCandidate,setlistOfCandidate] = useState([]);
    const [toggle,settoggle] = useState(false);
    const [numcandi,setnumcandi] = useState(0);
    

    const navigate = useNavigate();
    if (canNavi) {
        navigate('/about');
    }
    const LoadContract = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(address_Voteduan, ABI_voteduan, signer);
            console.log("contract la" + contract);
            console.log(contract);
            setContract(contract);
            const candidates = await contract.getAllVotesOfCandiates();
            setlistOfCandidate(candidates);
            const leng = Object.keys(candidates);
            setnumcandi(leng.length);
        } else {
            console.log("chua cai metamask");
        }
    }

    
    const setToggle = () => {
        if(toggle == true) {
            console.log("tat toggle")
            settoggle(false);
        }
        else {
            console.log("bat toggle")
            settoggle(true);
        }
    }
    const NaviToCheckDetail = (id,candidate) => {
        setcandidate(candidate)
        navigate(`/checkdetailaboutdes/${id}`)
    }
    useEffect(() => {
        LoadContract()
    },[])

    return (
        <div>
            {toggle && 
             (<DescriptionsToAdd toggle = {toggle} contract = {contract}
                numberid = {numcandi} 
                settoggle = {setToggle}
                />)
            }
            <h1>
                List For data

            </h1>
            <button 
            className='nav__connect'
            onClick={LoadContract}
            >
                Login
            </button>
            <button
            onClick={setToggle}
            >
                Add Candidates
            </button>
            <div>
                <table className='candidates-table'>
                    
                    <tr>
                        <th>Description about vote</th>
                        <th>Check</th>
                    </tr>
                    
                    <tbody>
                        {listOfCandidate.map((candidate,index) => (
                            <tr key={index}>
                                <td>
                                    {candidate.noidungduan};
                                </td>
                                <td>
                                    <button
                                    onClick={ () =>NaviToCheckDetail(index,candidate)}
                                    >
                                        Check
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    
                </table>
            </div>

            <button
                onClick={() => {
                    setcanNavi(true);
                }}
            >
                Go to About
            </button>
        </div>
    )
}
