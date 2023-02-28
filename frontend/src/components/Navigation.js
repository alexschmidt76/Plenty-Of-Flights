import { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { CurrentUser } from './contexts/CurrentUser';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'

function Navigation() {
    const navigate = useNavigate()
    const { currentUser } = useContext(CurrentUser)

    let loginActions = (
        <>
        {/* <li>
            <a onClick={() => navigate("/")}>Home</a>
        </li>
        <li>
            <a onClick={() => navigate("/sign-up")}>Sign Up</a>
        </li>
        <li>
            <a onClick={() => navigate("/login")}>Login</a>
        </li> */}
        <Button  variant = 'light' className='navi-btn' ><Link to="/">Home</Link></Button>
        <Button  variant = 'light' className='navi-btn' ><Link to="/sign-up">Sign-Up</Link></Button>
        <Button  variant = 'light' className='navi-btn' ><Link to="/login">Login</Link></Button>
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