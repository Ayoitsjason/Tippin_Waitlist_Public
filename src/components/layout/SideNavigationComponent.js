import React from "react";
import { Navbar, Nav, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faTimeline } from "@fortawesome/free-solid-svg-icons";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "./SideNavigationComponent.css";
import { logout } from "../authentication/AuthenticationService";

const SideNavigationComponent = (props) => {
  const onClickLogout = () => {
    logout();
    props.updateAuth();
  };
  return (
    <Col xs={2} className="p-0">
      <Navbar
        className="justify-content-start side-navigation flex-column"
        expand="lg"
      >
        <Navbar.Brand className="m-0 mb-3" as={Link} to="/">
          Tippin
        </Navbar.Brand>
        <div>
          <Nav className="flex-column align-self-start" activeKey="/home">
            <Nav.Item>
              <Nav.Link as={Link} to="/">
                <FontAwesomeIcon icon={faHouse} size="lg" border />
                <p className="my-1 side-nav__text">Home</p>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/waitlist-history">
                <FontAwesomeIcon icon={faTimeline} size="lg" border />
                <p className="my-1 side-nav__text">History</p>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/reviews">
                <FontAwesomeIcon icon={faRankingStar} size="lg" border />
                <p className="my-1 side-nav__text">Reviews</p>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/account">
                <FontAwesomeIcon icon={faUser} size="lg" border />
                <p className="my-1 side-nav__text">Account</p>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={onClickLogout}>
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  size="lg"
                  border
                />
                <p className="my-1 side-nav__text">Logout</p>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </Navbar>
    </Col>
  );
};

export default SideNavigationComponent;
