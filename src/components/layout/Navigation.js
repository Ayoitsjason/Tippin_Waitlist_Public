import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { AuthContext } from "../../context/WaitlistContext";

function Navigation() {
  const loggedIn = React.useContext(AuthContext);

  return (
    <Navbar className={loggedIn ? "d-none" : ""} expand="lg">
      <Navbar.Brand as={Link} to="/" className="mx-5">
        Tippin
      </Navbar.Brand>
      <Navbar.Toggle className="mx-5" aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav className="mx-5" activeKey="/home">
          <Nav.Item>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/signup">
              Signup
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
