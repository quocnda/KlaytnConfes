import React from 'react'

const Result = (result) => {
  return (
    <div>
        {result ? (<div> Du an duoc thong qua </div>) : (<div> Du an khong duoc thong qua </div>)}
    </div>
  )
}

export default Result