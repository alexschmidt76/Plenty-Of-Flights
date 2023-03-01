import {createContext} from 'react'

export const RetrieveContext = createContext({
    data: [],
    handleRetrieve: () => {},
    handleRefresh: () => {}
})