import React, { useEffect, useState } from 'react'

function MyBookShelfPage() {

  const [userBooks, setuserBooks] = useState([])

  useEffect(() => {
    if(localStorage.UserBooks){
      setuserBooks(JSON.parse(localStorage.getItem("UserBooks")))
    }
  }, [])

  return (
    <>
    <div className='text-center font-bold text-2xl mt-3'>My BookShelf</div>
      <div className='card-container'>
        {userBooks.map((info, index) =>
          <div className='card-box' key={index}>
            <div><b>Book Title :</b> {info[0]}</div>
            <div><b>Edition Count :</b> {info[1]}</div>
          </div>
        )}
        {userBooks.length==0?<h2>No Books to display</h2>:""}
      </div>
    </>
  )
}

export default MyBookShelfPage