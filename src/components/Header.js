import React, { useContext, Fragment } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Nav, Form, Button } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { StoryContext } from "../contexts/StoryContext";
import logo from "../logo.svg";

export default function NavbarStories() {
  const { logoutUser, user } = useContext(AuthContext);
  const { searchStory, query } = useContext(StoryContext);

  let location = useLocation();

  const guestLinks = (
    <Fragment>
      <Nav.Item>
        <Nav.Link href="/signup" className="text-white">
          Signup
        </Nav.Link>
      </Nav.Item>
    </Fragment>
  );
  const authLinks = (
    <Fragment>
      <Nav.Item>
        <Nav.Link href="/profile" className="text-white">
          {location.pathname !== "/profile" ? user?.username : null}
        </Nav.Link>
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
            <Nav.Link href="/" className="mr-2">
              <Button onClick={logoutUser} variant="outline-danger" id="logout">
                {user ? "Logout" : "You are logged out"}
              </Button>
            </Nav.Link>
          </Nav.Item>
          <Form.Control
            type="text"
            className="white-bg"
            value={query}
            onChange={searchStory}
            placeholder="Search for a story"
          />
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
