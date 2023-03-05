import { useContext } from 'react'
import { CurrentUser } from '../context/CurrentUser';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router"

function Navigation() {
    const { currentUser } = useContext(CurrentUser)
    const navigate = useNavigate()

    let loginActions = (
      <>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" sticky="top">
          <Container>
            <Navbar.Brand href="/"><h1>P O F</h1></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/sign-up">Sign Up</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    )

    if (currentUser) {
      loginActions = (
      <>
        <li>
          <h2>Logged in as {currentUser.name}</h2>
        </li>
        <li>
          <Button onClick={() => navigate("/mysavedflights")}>Go to My Saved Flights</Button>
          <Button onClick={() => navigate("/profilepage")}>My Profile</Button>
        </li>
      </>
      )
    }

    return (
        <nav>
            <ul style={{ listStyle: 'none' }}>         
                {loginActions}
            </ul>
        </nav>
    )
}

export default Navigation;