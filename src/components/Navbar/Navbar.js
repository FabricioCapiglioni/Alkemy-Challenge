import { useContext } from 'react'
import { useHistory } from 'react-router';
import {NavLink} from 'react-router-dom'
import Context from '../../context/HeroContext'
import './Navbar.css'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { MdLogout } from "react-icons/all"


const NavBar = () => {

    const { setNotification } = useContext(Context)
    const history = useHistory();

    const logout = () => {
        setNotification("check", "See you soon", 3000)
        localStorage.clear();
        history.push('/login')
    };

    return (
        <Navbar className="navBar" variant="dark" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="navbar-nav">
                        <NavLink to='/' >Home</NavLink>
                        <NavLink to='/team/my-team' >My Team</NavLink>
                        <NavLink to='/team/good' >Good</NavLink>
                        <NavLink to='/team/bad' >Bad</NavLink>
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
