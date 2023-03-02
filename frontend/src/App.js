import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useContext, useRef, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './components/searchBar';
import SearchResults from './components/searchResults';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Error404 from './components/Error404';
import SignUpForm from './components/users/SignUpForm';
import LoginForm from './components/users/LoginForm';
import MySavedFlights from './components/MySavedFlights';
import CurrentUserProvider from './context/CurrentUser';
import { RetrieveContext } from './context/RetreiveContext';
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
  // const handleRetrieve = (e) => {
  //   e.preventDefault()
  //   setMySavedFlights(fetchRetrieve())
  // }

  // const handleRefresh = () => {
  //   setMySavedFlights(fetchRetrieve())
  // }

  return (
    <div className="App">
      
      <CurrentUserProvider>
        <Router>
          <Navigation />
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
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/sign-up" element={<SignUpForm/>} />
                <Route exact path="/login" element={<LoginForm/>} />
                <Route path="/" element={<Error404/>} />
                <Route path="/search" element={<SearchResults/>} />
                <Route path="/mysavedflights" element={<MySavedFlights/>} />
              </Routes> 
            </DataContext.Provider>
        </Router>
      </CurrentUserProvider>
    </div>
  );
}

export default App;