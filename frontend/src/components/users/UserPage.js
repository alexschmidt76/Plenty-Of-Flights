import { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router";
import Form from 'react-bootstrap/Form';
import { CurrentUser } from "../../context/CurrentUser";

let UserPage = () => {

    const navigate = useNavigate()
    const { currentUser, setCurrentUser } = useContext(CurrentUser)
    const [ deleteFormOn, setDeleteFormOn ] = useState(false)
    const [ password, setPassword ] = useState('')
    const [ errorMessage, setErrorMessage ] = useState(null)

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

    const handleDelete = async (e) => {
        e.preventDefault()
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/authentication/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password,
                email: currentUser.email
            })
        })
        const data = response.json()
        if (response.status === 200) {
            setErrorMessage(null)
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${currentUser.user_id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setCurrentUser(null)
            navigate('/')
        } else {
            setErrorMessage(data.message)
        }
    }

    const deleteForm = () => {
        return (
            <div style={{ width: 700, padding: 30, margin:'auto' }}>
                {
                    errorMessage !== null
                    ? (
                        <div>
                            {errorMessage}
                        </div>
                     )
                    : null
                }
                <Form onSubmit={handleDelete}>
                    <Form.Group>
                        <Form.Label>Enter your Password to Delete your Account:</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            id="password"
                            name="password"
                        />
                    </Form.Group>
                    <Button variant="danger" type="submit">Delete Account</Button>
                </Form>
            </div>
        )
    }

    return (
        <div>
            <Button variant="primary" onClick={(e) => handleLogout(e)}>Log Out</Button>
            {
                deleteFormOn
                ? deleteForm()
                : <Button variant="danger" onClick={(e) => setDeleteFormOn(true)}>Delete Accout</Button>
            }
        </div>
    )
}

export default UserPage