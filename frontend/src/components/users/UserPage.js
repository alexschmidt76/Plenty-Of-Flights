import { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router";
import Form from 'react-bootstrap/Form';
import { CurrentUser } from "../../context/CurrentUser";

let UserPage = () => {

    const navigate = useNavigate()
    const { currentUser, setCurrentUser } = useContext(CurrentUser)
    const [ deleteFormOn, setDeleteFormOn ] = useState(false)
    const [ updateFormOn, setUpdateFormOn ] = useState(false)
    const [ password, setPassword ] = useState('')
    const [ errorMessage, setErrorMessage ] = useState(null)
    const [ user, setUser ] = useState({
        name: '',
        email: '',
        password: ''
    })

    const verifyPassword = async (credentials) => {
        console.log(currentUser)
        return await fetch(`${process.env.REACT_APP_BACKEND_URL}/authentication/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        // verify the current password
        const response = await verifyPassword({
            password: password,
            email: currentUser.email
        })
        const data = response.json()
        if (response.status === 200) {
            setErrorMessage(null)
            // update the user with the new info
            let newUser = {
                name: user.name === '' ? currentUser.name : user.name,
                email: user.email === '' ? currentUser.email : user.email,
                password: user.password === '' ? password : user.password
            }
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${currentUser.user_id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            setCurrentUser(newUser)
            setUpdateFormOn(false)
        } else {
            setErrorMessage(data.message)
        }
    }

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
        const response = await verifyPassword({
            password: password,
            email: currentUser.email
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

    const toggleUpdateForm = (e) => {
        e.preventDefault()
        setUpdateFormOn(true)
        setDeleteFormOn(false)
    }

    const updateForm = () => {
        return (
            <div style={{ width: 700, padding: 30, margin:'auto' }}>
                <Form onSubmit={handleUpdate}>
                    <Form.Group>
                        <Form.Label>New Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter a New Name"
                            onChange={e => setUser({ ...user, name: e.target.value })}
                            id="name"
                            name="name"	
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>New Email Address:</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter a New Email Address"
                            onChange={e => setUser({ ...user, email: e.target.value })}
                            id="email"
                            name="email"	
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>New Password:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Create a New Password"
                            onChange={e => setUser({ ...user, password: e.target.value })}
                            id="newPassword"
                            name="newPassword"	
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm Current Password to Update:</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Enter Password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">Update Account</Button>
                </Form>
            </div>
        )
    }

    const toggleDeleteForm = (e) =>{
        e.preventDefault()
        setDeleteFormOn(true)
        setUpdateFormOn(false)
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
            {
                updateFormOn
                ? updateForm()
                : <Button variant="primary" onClick={(e) => toggleUpdateForm(e)}>Update Account</Button>
            }
            <Button variant="primary" onClick={(e) => handleLogout(e)}>Log Out</Button>
            {
                deleteFormOn
                ? deleteForm()
                : <Button variant="danger" onClick={(e) => toggleDeleteForm(e)}>Delete Accout</Button>
            }
        </div>
    )
}

export default UserPage