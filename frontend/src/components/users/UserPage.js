import { useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router";
import { CurrentUser } from "../../context/CurrentUser";

let UserPage = () => {

    const navigate = useNavigate()
    const { currentUser, setCurrentUser } = useContext(CurrentUser)

    const handleLogout = async (e) => {
        e.preventDefault()
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/authentication/log-out`, {
			method: 'POST',
            credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
            body: {
                userId: currentUser.user_id
            }
		})
        setCurrentUser(null)
		navigate(`/`)
	}

    return (
        <Button variant="primary" onClick={(e) => handleLogout(e)}>Log Out</Button>
    )
}

export default UserPage