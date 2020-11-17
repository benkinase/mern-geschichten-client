import React, { useContext, Fragment } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Nav, Form, Button, Dropdown } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { StoryContext } from "../contexts/StoryContext";
import logo from "../logo.svg";

export default function NavbarStories() {
  let location = useLocation();
  const { logoutUser, user } = useContext(AuthContext);
  const { searchStory, query } = useContext(StoryContext);
  //console.log(user);
  const guestLinks = (
    <Fragment>
      <Nav.Item>
        <Nav.Link href={"/"} className="text-white"></Nav.Link>
      </Nav.Item>
    </Fragment>
  );
  const authLinks = (
    <Fragment>
      <Nav.Item>
        <Dropdown>
          {user && location.pathname !== "/profile" && (
            <>
              <Dropdown.Toggle variant="warning mr-4" id="dropdown-basic">
                {user?.username}
              </Dropdown.Toggle>
              <Dropdown.Menu className="mt-3">
                <Dropdown.Item href="/profile" className="text-info bg-light">
                  Profile
                </Dropdown.Item>
              </Dropdown.Menu>
            </>
          )}
        </Dropdown>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link href={user ? "/dashboard" : "/"} className="text-white">
          {location.pathname !== "/dashboard" ? "Dashboard" : null}
        </Nav.Link>
      </Nav.Item>
    </Fragment>
  );

  return (
    <Navbar className="bg-navbar" expand="lg">
      <Navbar.Brand href={user ? "/dashboard" : "/"}>
        <img src={logo} alt="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto nav-text">{user ? authLinks : guestLinks}</Nav>
        <Form inline>
          <Nav.Item>
            <Nav.Link href="/" className="ml-n3">
              <Button onClick={logoutUser} variant="outline-dark" id="logout">
                {user ? "Logout" : "You are logged out"}
              </Button>
            </Nav.Link>
          </Nav.Item>
          <Form.Control
            type="text"
            className="white-bg"
            value={query}
            onChange={searchStory}
            placeholder={user ? "Search for a story" : "Search"}
          />
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
