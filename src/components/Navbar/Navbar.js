import './Navbar.css'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import React from 'react'
import { MdLogout } from "react-icons/all"


const NavBar = ({setUser}) => {

  const logout = () => {
    localStorage.clear();
    setUser(false);
  };
    return (
        <Navbar variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="#home">My Team</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className="logOut" onClick={logout} >
            <label>Log Out</label>
            <MdLogout />
          </div>
        </Container>
      </Navbar>
    )
}

export default NavBar
