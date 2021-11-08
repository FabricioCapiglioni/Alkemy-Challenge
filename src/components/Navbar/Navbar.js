import {useContext, useEffect} from 'react'
import Context from '../../context/HeroContext'
import './Navbar.css'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { MdLogout } from "react-icons/all"


const NavBar = () => {

  const {user, logout} = useContext(Context)

  useEffect(() => {    
  }, [user])
  
    return (
        <Navbar variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="#home">My Team</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {user ?
            <div className="logOut" onClick={logout} >
              <label>Log Out</label>
              <MdLogout />
            </div>
            : null
          }
        </Container>
      </Navbar>
    )
}

export default NavBar
