import React from 'react'

export const CanVote = ({VoteCandidate,voteYes,voteNo,timeremain}) => {



  return (
    <div>
        <h2>
        <div>
          Vote Count
        </div>
        <div>
          <table className='candidates-table'>
            <tr>
              <td>Count Vote Yes</td>
              <td>Count Vote No</td>
              <td>Time Remain</td>
            </tr>
            <tr>
              <td>{voteYes}</td>
              <td>{voteNo}</td>
              <td>
                {timeremain}
              </td>
            </tr>
            <tr>
              <td>
                <button
                  onClick={() => { VoteCandidate(1) }}
                >
                  Yes
                </button>
              </td>
              <td>
                <button
                  onClick={() => { VoteCandidate(2) }}
                >
                  No
                </button>
              </td>
              
            </tr>
          </table>
        </div>
      </h2>
    </div>
  )
}
