import { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { CurrentUser } from './contexts/CurrentUser';

function Navigation() {
    const navigate = useNavigate()
    const { currentUser } = useContext(CurrentUser)

    let loginActions = (
        <>
        <li>
            <a href="./Home" onClick={() => navigate("/")}>Home</a>
        </li>
        <li>
            <a href="../signUpForm" onClick={() => navigate("/sign-up")}>Sign Up</a>
        </li>
        <li>
            <a href="../LoginForm" onClick={() => navigate("/login")}>Login</a>
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
                {loginActions}
            </ul>
        </nav>
    )
}

export default Navigation;