import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CurrentUser } from "../../context/CurrentUser";

function SignUpForm() {
	const navigate = useNavigate()
	const { setCurrentUser } = useContext(CurrentUser)
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: ''
	})

	async function handleSubmit(e) {
		e.preventDefault()
		await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		})
		setCurrentUser(user)
		navigate(`/`)
	}

	return (
		<div style={{ width: 700, padding: 30 }}>
			<h1>Sign Up</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
          			<Form.Label>Name:</Form.Label>
          			<Form.Control
						required
						type="text"
						placeholder="Enter your name" 
						value={user.name}
						onChange={e => setUser({ ...user, name: e.target.value })}
						id="name"
						name="name"	
					/>
        		</Form.Group>
				<Form.Group>
          			<Form.Label>Email Address:</Form.Label>
          			<Form.Control
						required
						type="email"
						placeholder="Enter your email address"
						value={user.email}
						onChange={e => setUser({ ...user, email: e.target.value })}
						id="email"
						name="email"	
					/>
        		</Form.Group>
				<Form.Group>
          			<Form.Label>Password:</Form.Label>
          			<Form.Control
						required
						type="password"
						placeholder="Create your own password"
						value={user.password}
						onChange={e => setUser({ ...user, password: e.target.value })}
						id="password"
						name="password"	
					/>
        		</Form.Group>
				<Button variant="primary" type="submit">Sign Up and Log In</Button>
			</Form>
		</div>
	)
}

export default SignUpForm