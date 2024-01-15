import React from 'react'
import { useState } from 'react';
export const DescriptionsToAdd = ({toggle, contract, numberid,settoggle,test}) => {

    const [stringDes,setstringDes] = useState("");
    const [stringduan,setstringduan] = useState("");
    const [timetoadd,settimetoadd] = useState(0);
    const check = () => {
       settoggle();
        console.log("da vao check")
    }
    const handleonchange = (e) => {
        setstringDes(e.target.value);
        console.log(stringDes);
    }
    const handleonchangetime = (e) => {
        settimetoadd(e.target.value);
    }
    const handleonchangeDuanname = (e) => {
        setstringduan(e.target.value);
    }
    const handleonclick = async () => {
        if(timetoadd == 0 || stringduan == "" || stringDes == "") {
            alert("Plesase to fill the blanks");
        }
        else {
            console.log(stringDes);
            try {
                await contract.addCandidate(numberid,stringduan,stringDes,timetoadd);
            } catch (error) {
                console.log(error)
            }
            console.log("adu vjp 1")
            convertstring();
        }
        
    }
    const convertstring = () => {
        let ans = "";
        for(let i = 0 ; i < stringDes.length ; i ++) {
            if(stringDes[i]!='\n') {
                ans+=stringDes[i];
            }
            else {
                ans+='\n';
            }
        }
        console.log(ans);
    }
  return (
    <div className='product'>
        <div className='product__details'>
            <div className='connected-account'>
                Name
            </div>
            <input className='textareaforname' value={stringduan} onChange={handleonchangeDuanname} />
            <div className='connected-account'>
            Descriptions: 
            </div>
            <textarea className='textarea' value={stringDes} onChange={handleonchange}/>
            Time to set: 
            <input className='textareamini' value={timetoadd} onChange={handleonchangetime}/>
            
            <button
            onClick={handleonclick}
            >
                Submit
            </button>
            <div>
                {
                    
                }
            </div>
            <div className='product__close'>
                <button onClick={check}>
                    <img src= 'https://i.imgur.com/kwnCxKr.png' alt = 'Close'/>
                </button>
            </div>
        </div>
    </div>
  )
}
