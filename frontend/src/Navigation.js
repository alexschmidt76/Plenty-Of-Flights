import { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router";
import { CurrentUser } from './contexts/CurrentUser';

function Navigation() {

    const history = useHistory()

    const { currentUser } = useContext(CurrentUser)

    let loginActions = (
        <>
            <li>
                <a href="#" onClick={() => history.push("/sign-up")}>
                    Sign Up
                </a>
            </li>
            <li>
                <a href="#" onClick={() => history.push("/login")}>
                    Login
                </a>
            </li>
        </>
    )

    if (currentUser) {
        loginActions = (
            <li>
                Logged in as {currentUser.name}
            </li>
        )
    }

    return (
        <nav>
            <ul>
                <li>
                    <a href="#" onClick={() => history.push("/")}>
                        Home
                    </a>
                </li>
                {loginActions}
            </ul>
        </nav>
    )
}

export default Navigation;