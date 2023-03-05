import { createContext, useState, useEffect } from "react";

export const CurrentUser = createContext()

function CurrentUserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/authentication/profile`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(resData => setCurrentUser(resData))
    }, [])

    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    )
}

export default CurrentUserProvider