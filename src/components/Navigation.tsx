import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from 'react-bootstrap/NavDropdown';

const Navigation = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand className="h1" as={Link} to={"/"}>Star Wars</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Categories" id="dropdown-navbar">
                            <NavDropdown.Item className="m-1" as={Link} to="/films">Films</NavDropdown.Item>
                            <NavDropdown.Item className="m-1" as={Link} to="/people">People</NavDropdown.Item>
                            <NavDropdown.Item className="m-1" as={Link} to="/planets">Planets</NavDropdown.Item>
                            <NavDropdown.Item className="m-1" as={Link} to="/species">Species</NavDropdown.Item>
                            <NavDropdown.Item className="m-1" as={Link} to="/starships">Starships</NavDropdown.Item>
                            <NavDropdown.Item className="m-1" as={Link} to="/vehicles">Vehicles</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default Navigation;