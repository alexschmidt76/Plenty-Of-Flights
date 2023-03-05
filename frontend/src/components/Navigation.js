import { useContext } from 'react'
import { CurrentUser } from '../context/CurrentUser';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
    const { currentUser } = useContext(CurrentUser)

    let loginActions = (
      <>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" sticky="top">
          <Container>
            <Navbar.Brand href="/"><h1>P O F</h1></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                {
                  currentUser
                  ? <Nav.Link href='/mysavedflights'>My Saved Flights</Nav.Link>
                  : <Nav.Link href="/sign-up">Sign Up</Nav.Link>
                }
                {
                  currentUser
                  ? <Nav.Link href='/profilepage'>My Profile</Nav.Link>
                  : <Nav.Link href="/login">Login</Nav.Link>
                }
              </Nav>
            </Navbar.Collapse>
            {
              currentUser
              ? (
                <Navbar.Collapse className='justify-content-end'>
                  <Navbar.Text>
                    Signed in as <b>{currentUser.name}</b>
                  </Navbar.Text>
                </Navbar.Collapse>
              )
              : null
            }
          </Container>
        </Navbar>
      </>
    )

    return (
        <nav>
            <ul style={{ listStyle: 'none' }}>         
                {loginActions}
            </ul>
        </nav>
    )
}

export default Navigation;