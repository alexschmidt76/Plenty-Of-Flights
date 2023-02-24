import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useRef, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './components/searchBar';
import SearchResults from './components/searchResults';
import { SearchContext } from './context/searchContext';
import { DataContext } from './context/dataContext';
import { createResource as fetchSearch} from './airportHelper';

function App() {
  let [dap,setDap] = useState(null)
  let [aap,setAap] = useState(null)
  let [airplane,setAirplane] = useState(null)

  let searchDap = useRef('')
  let searchAap = useRef('')
  let searchMfg = useRef('')
  let searchMdl = useRef('')

  const API_URL = 'https://airportdb.io/api/v1/airport/'

  const handleSearch = async (e, depart, arrive) => {
    e.preventDefault()
    setDap(fetchSearch(depart, API_URL))
    setAap(fetchSearch(arrive, API_URL))    
}

  return (
    <div className="App">
      <Router>
        <SearchContext.Provider value={{
          depart: searchDap,
          arrive: searchAap,
          manufacturer: searchMfg,
          model: searchMdl,
          handleSearch: handleSearch
        }}>
          <SearchBar/>
          </SearchContext.Provider>
          <DataContext.Provider value={{dap, aap}}>
        <Routes>
          <Route path="/search" element={<SearchResults/>} />
        </Routes> 
        </DataContext.Provider>
      </Router>
    </div>
  );
}

export default App;
