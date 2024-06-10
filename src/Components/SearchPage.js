import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';

function SearchPage() {

  const navigate = useNavigate()

  const [searchBox, setsearchBox] = useState("")
  const [searchData, setsearchData] = useState([])
  const [loading, setLoading] = useState(false)
  const [listAddedBooks, setListAddedBooks] = useState([])

  useEffect(() => {
    if (localStorage.UserBooks) {
      let info = JSON.parse(localStorage.getItem("UserBooks"))
      setListAddedBooks(info.map((data) => data[2]))
    }
  }, [])

  const handleChange = (e) => {
    setsearchBox(e.target.value)
  }


  const getResponse = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`https://openlibrary.org/search.json?q=${searchBox}&limit=10&page=1`);
      setsearchData(data.docs)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
    setLoading(false)
  }, [searchBox])

  useEffect(() => {
    if (searchBox !== " ") {
      getResponse();
    }
  }, [searchBox, getResponse])

  const addBooks = (title, edition_count, cover_id) => {
    let updatedBooksList = []
    if (localStorage.UserBooks) {
      updatedBooksList = JSON.parse(localStorage.getItem("UserBooks"))
    }
    updatedBooksList.push([title, edition_count, cover_id])
    localStorage.setItem("UserBooks", JSON.stringify(updatedBooksList))
    setListAddedBooks([...listAddedBooks, cover_id])
    toast.success("Book Added")
  }

  return (
    <>
      <div className='navbar'>
        <div className='navbar-1'>
          <div>Search By Book Name</div>
          <input type='text' name="searchbox" value={searchBox} onChange={handleChange} />
        </div>
        <div className='navbar-2'>
          <button onClick={() => navigate('/MyBooks')}>My BookShelf</button>
        </div>
      </div>
      <div className='card-container'>
        {!loading && searchData.map((info, index) =>
          <div className='card-box' key={index}>
            <div><b>Book Title :</b> {info.title}</div>
            <div><b>Edition Count :</b> {info.edition_count}</div>
            {!listAddedBooks.includes(info.cover_i) && <button onClick={() => addBooks(info.title, info.edition_count, info.cover_i)}>Add to BookShelf</button>}
          </div>
        )}
      </div>
      {loading && <h2 style={{ textAlign: "center" }}>Loading data</h2>}
      {searchData.length == 0 && loading == false ? <h2 style={{ textAlign: "center" }}>No Data to display</h2> : ""}
    </>
  )
}

export default SearchPage