import { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { CurrentUser } from './contexts/CurrentUser';
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';

function Navigation() {
    const navigate = useNavigate()
    const { currentUser } = useContext(CurrentUser)

    let loginActions = (
        <>
        {/* <Button  variant = 'light' className='navi-btn' ><Link to="/">Home</Link></Button>
        <Button  variant = 'light' className='navi-btn' ><Link to="/sign-up">Sign-Up</Link></Button>
        <Button  variant = 'light' className='navi-btn' ><Link to="/login">Login</Link></Button> */}
         <Navbar bg="light" variant="light" sticky="top">
        <Container>
          <Navbar.Brand href="/"><h1>P O F</h1></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/sign-up">Sign Up</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success"><Link to="/search">Search</Link></Button>
          </Form>
        </Container>
      </Navbar>
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