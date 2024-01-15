import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { address_Voteduan, ABI_voteduan } from '../constant/constants'
import { ethers } from "ethers";
import { Home } from "../pages/Home";

const AppContext = createContext();
export const AppProvider = ({ children }) => {
    const [candidate, setcandidate] = useState({});
    const [listOfCandidate, setlistOfCandidate] = useState([]);
    const [contract, setContract] = useState(null);
   
    const LoadContract = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(address_Voteduan, ABI_voteduan, signer);
            setContract(contract);
            const candidates = await contract.getAllVotesOfCandiates();
            setlistOfCandidate(candidates);
            console.log(candidates);
        } else {
            console.log("chua cai metamask");
        }
    }

    useEffect(() => {
        console.log("da vao useeffect")
        LoadContract();
    }, [])
    return (
        <AppContext.Provider value={{ candidate, setcandidate,contract }}>
            {children}
        </AppContext.Provider>
    )
}
export const useGlobalContext = () => useContext(AppContext);