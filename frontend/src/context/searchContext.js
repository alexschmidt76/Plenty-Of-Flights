import {createContext} from 'react'

export const SearchContext = createContext({
    depart: '',
    arrive: '',
    manufacturer: '',
    model: '',
    handleSearch: () => {}
})