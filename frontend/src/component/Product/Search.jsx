import React, { useState } from 'react'
import './Search.css'
import { useNavigate } from 'react-router-dom';

function Search() {
    const [keyword, setKeyword] = useState()
    let navigate = useNavigate();

    const SearchSubmitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/products/${keyword}`)
        } else {
            navigate(`/products`)
        }
    }

    return (
        <>
            <form className='searchBox' onSubmit={SearchSubmitHandler}>
                <input
                    type="text"
                    placeholder='Search a Product...'
                    onChange={(e => setKeyword(e.target.value))}
                />
                <input type="submit" value="Search" />
            </form>
        </>
    )
}

export default Search
