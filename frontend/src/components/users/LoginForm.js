import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { CurrentUser } from "../../context/CurrentUser"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function LoginForm() {
    const navigate = useNavigate()
    const { setCurrentUser } = useContext(CurrentUser)
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault()
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/authentication/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        const data = await response.json()

        if (response.status === 200) {
            setCurrentUser(data.user)
            navigate(`/`)
        } else {
            setErrorMessage(data.message)
        }
    }

    return (
        <div style={{ display: 'block', width: 700, padding: 30, margin: 'auto' }}>
            <h1>Login</h1>
            {errorMessage !== null
                ? (
                    <div>
                        {errorMessage}
                    </div>
                )
                : null
            }
            <Form onSubmit={handleSubmit}>
			<Form.Group>
          		<Form.Label>Email Address:</Form.Label>
          		<Form.Control
					required
					type="email"
					placeholder="Enter your email address"
					value={credentials.email}
					onChange={e => setCredentials({ ...credentials, email: e.target.value })}
					id="email"
					name="email"	
				/>
        	</Form.Group>
			<Form.Group>
          		<Form.Label>Password:</Form.Label>
          		<Form.Control
					required
					type="password"
					placeholder="Enter your own password"
					value={credentials.password}
					onChange={e => setCredentials({ ...credentials, password: e.target.value })}
					id="password"
					name="password"	
				/>
        	</Form.Group>
            <Button variant="primary" type="submit">Login</Button>
                {/* <div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            required
                            value={credentials.email}
                            onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                            id="email"
                            name="email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            required
                            value={credentials.password}
                            onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                            id="password"
                            name="password"
                        />
                    </div>
                </div>
                <input type="submit" value="Login" /> */}
            </Form>
        </div>
    )
}

export default LoginForm