import { useState } from "react"
import { useNavigate } from "react-router"

function SignUpForm() {
	const navigate = useNavigate()
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: ''
	})

	async function handleSubmit(e) {
		e.preventDefault()
		await fetch(`http://localhost:3001/users/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		})
		navigate(`/`)
	}

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<div>
						<label htmlFor="name">Create Your Name</label>
						<input
							required
							value={user.name}
							onChange={e => setUser({ ...user, name: e.target.value })}
							id="name"
							name="name"
						/>
					</div>
				</div>
				<div>
					<div>
						<label htmlFor="email">Enter Your Email Address</label>
						<input
							type="email"
							required
							value={user.email}
							onChange={e => setUser({ ...user, email: e.target.value })}
							id="email"
							name="email"
						/>
					</div>
					<div>
						<label htmlFor="password">Create Your Password</label>
						<input
							type="password"
							required
							value={user.password}
							onChange={e => setUser({ ...user, password: e.target.value })}
							id="password"
							name="password"
						/>
					</div>
				</div>
				<input type="submit" value="Sign Up" />
			</form>
		</>
	)
}

export default SignUpForm