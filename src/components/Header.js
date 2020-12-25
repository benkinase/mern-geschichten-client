import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Nav, Form, Dropdown } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { StoryContext } from "../contexts/StoryContext";
import { Sidebar } from "./Sidebar";
import { Toggler } from "./Toggler";
import logo from "../logo.svg";
import styled from "styled-components";

export default function Header() {
  let location = useLocation();
  const { logoutUser, user } = useContext(AuthContext);
  const { searchStory, query } = useContext(StoryContext);

  const [isOpen, setSidebar] = React.useState(false);

  const closeSidebar = () => {
    setSidebar(false);
  };

  const toggle = () => {
    if (isOpen) {
      setSidebar(false);
    } else {
      setSidebar(true);
    }
  };

  //console.log(user);

  const authLinks = (
    <>
      <li className='link'>
        <Nav.Link href={user ? "/dashboard" : "/"} className='a'>
          {location.pathname !== "/dashboard" ? "Dashboard" : null}
        </Nav.Link>
      </li>
      <li className='link'>
        <Nav.Item>
          <Dropdown>
            {user && location.pathname !== "/profile" && (
              <>
                <Dropdown.Toggle variant='warning mr-4 ' id='dropdown-basic'>
                  {user?.username}
                </Dropdown.Toggle>
                <Dropdown.Menu className='mt-2 w-25'>
                  <Dropdown.Item
                    href='/profile'
                    className='text-success bg-white '
                  >
                    Manage profile
                  </Dropdown.Item>
                </Dropdown.Menu>
              </>
            )}
          </Dropdown>
        </Nav.Item>
      </li>
      <li className='link'>
        <Form.Control
          type='text'
          className='white-bg'
          value={query}
          onChange={searchStory}
          placeholder={user ? "Search for a story" : "Search"}
        />
      </li>
    </>
  );
  const guestLinks = (
    <>
      <li className='link'>
        <NavLink to={"/dashboard"} className='a '>
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <HeaderContainer>
      <nav className='nav' id='nav'>
        <div className='nav-center nav-content'>
          <div className='nav-header'>
            <img src={logo} alt='logo' className='logo mb-2' />
            <Toggler toggle={toggle} isOpen={isOpen} />
          </div>

          <ul className='nav-links '>
            {user ? authLinks : guestLinks}

            <li className='link'>
              <NavLink to={"/"} className='a '>
                <button
                  onClick={user ? logoutUser : null}
                  className='logout-btn'
                  id='logout'
                >
                  {user ? "logout" : "Guest"}
                </button>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Sidebar isOpen={isOpen} close={closeSidebar} />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  ul {
    list-style-type: none;
  }
  .a {
    text-decoration: none !important;
  }
  /*Mobile first*/
  .nav-links {
    display: none;
  }
  .nav {
    height: 5rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: var(--mainTransition);
  }
  .nav-center {
    width: 100%;
    max-width: 1170px;
    margin: 0 auto;
  }
  .nav-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logout-btn {
    border-radius: 1.3rem;
    padding: 0.2rem 1rem;
    font-size: 1.1rem;
    background-color: var(--clr-white-1);
    color: var(--button-color-3);
    outline: none;
    border: none;
    transition: all 0.4s linear;

    &:hover {
      background-color: var(--clr-grey-5);
      cursor: pointer;
    }
    &:focus {
      outline: none;
      border: none;
    }
  }
  @media screen and (min-width: 800px) {
    .nav {
      background: var(--nav);
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .logo {
      margin-top: -8px;
    }
    .nav-links {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .nav-links .link {
      padding: 0rem 0.5rem;
    }
    .nav-links .a {
      text-transform: uppercase;
      color: var(--clr-grey-5);
      font-weight: bold;
      letter-spacing: var(--mainSpacing);
      -webkit-transition: var(--mainTransition);
      transition: var(--mainTransition);
    }
    .nav-links li:nth-child(1) .a {
      margin-left: 2.5rem;
    }
    .nav-links .a:hover {
      color: var(--general-yellow);
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr;
      -webkit-box-align: center;
      align-items: center;
      margin-top: 0.35rem;
    }
  }
`;
