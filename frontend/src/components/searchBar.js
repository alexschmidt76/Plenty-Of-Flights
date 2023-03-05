import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { SearchContext } from '../context/searchContext'
import Button from 'react-bootstrap/Button'

const SearchBar = () => {

    const {depart, arrive, manufacturer, model, handleSearch} = useContext(SearchContext)

    return (
        <div>
            <form>
                <input ref={depart} type='text' placeholder='Enter Departure Airport'/>
                <input ref={arrive} type='text' placeholder='Enter Arrival Airport'/>
                <input ref={manufacturer} type='text' placeholder='Enter Aircraft Manufacturer'/>
                <input ref={model} type='text' placeholder='Enter Aircraft Model'/>
                <Button className="search-btn" variant='light' onClick={(e) => handleSearch(e, depart.current.value, arrive.current.value, manufacturer.current.value, model.current.value)}><Link to="/search">Search</Link></Button>
            </form>
        </div>
    )
}

export default SearchBar