import React, { useState } from 'react'

const Search = ({ searchTerm, setsearchTerm }) => {
  useState
  return (
    <div className='search'>
      <div>
        <img src="search.svg" alt="" />
        <input type="text"
          placeholder="serach thruog thousand of move"
          value={searchTerm} onChange={(e)=>setsearchTerm(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Search