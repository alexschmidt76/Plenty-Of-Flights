import { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router"

function SignUpForm() {

	const history = useHistory()

	const [user, setUser] = useState({
		name: '',
        email: '',
		password: ''
	})

	async function handleSubmit(e) {
		e.preventDefault()

		await fetch(`https://plenty-of-flights-backend.vercel.app/users/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		})

		history.push(`/`)
	}

	return (
		<main>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<div>
						<label htmlFor="name">Name</label>
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
						<label htmlFor="email">Email</label>
						<input
							type="email"
							required
							value={user.email}
							onChange={e => setUser({ ...user, email: e.target.value })}
							id="email"
							name="email"
						/>
					</div>
				</div>
				<input type="submit" value="Sign Up" />
			</form>
		</main>
	)
}

export default SignUpForm