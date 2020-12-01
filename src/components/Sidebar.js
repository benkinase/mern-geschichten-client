import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components/macro";
import { Nav } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { StoryContext } from "../contexts/StoryContext";
import SearchBar from "./SearchBar";

export function Sidebar({ isOpen, close }) {
  let location = useLocation();
  const { logoutUser, user } = useContext(AuthContext);
  const { searchStory, query } = useContext(StoryContext);
  let drawClass = "sidebar";

  if (isOpen) {
    drawClass = "sidebar show-sidebar";
  }

  const authLinks = (
    <>
      <li className="link ml-n3">
        <Nav.Link href={user ? "/dashboard" : "/"} className="a">
          {location.pathname !== "/dashboard" ? "Dashboard" : null}
        </Nav.Link>
      </li>
      <li className="link ml-n3 mt-n3">
        <Nav.Link href={"/profile"} className="a">
          {user?.username}
        </Nav.Link>
      </li>

      <li className="link">
        <SearchBar query={query} searching={searchStory} />
      </li>
    </>
  );
  const guestLinks = <></>;

  return (
    <SidebarContainer>
      <aside className={drawClass}>
        <div>
          <button className="close-btn" id="close-btn" onClick={close}>
            <i className="fas fa-times"></i>
          </button>
          <hr />
          <ul className="sidebar-links">
            {user ? authLinks : guestLinks}

            <li className="link">
              <NavLink to={"/"} className="a">
                <button
                  onClick={user ? logoutUser : null}
                  className="logout-btn"
                  id="logout"
                >
                  {user ? "logout" : "Guest"}
                </button>
              </NavLink>
            </li>
          </ul>

          <ul className="social-icons hero-social">
            <li>
              <a
                href="https://www.github.com/benkinase"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <i className="fab fa-github"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/benjamin-gbenimako-81b014a5/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  /* Sidebar */
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    max-width: 50%;
    height: 100%;
    background: var(--nav);
    z-index: 10;
    display: flex;
    flex-direction: column;
    -webkit-transition: var(--mainTransition);
    transition: var(--mainTransition);
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }

  /* toggle sidebar */
  .show-sidebar {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }

  hr {
    background-color: var(--clr-primary-4);
    padding: 0.2rem;
    margin-top: 5rem;
  }
  .sidebar-links {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 2.5rem 0rem auto auto;
  }
  .sidebar-links .link {
    margin-bottom: 1rem;
  }
  .sidebar-links .a {
    font-size: 1.7rem;
    text-transform: capitalize;
    -webkit-transition: var(--mainTransition);
    transition: var(--mainTransition);
    color: var(--clr-white-1);
    letter-spacing: var(--mainSspacing);
  }
  .sidebar-links .a:hover {
    color: var(--hover-color-1) !important;
    padding-left: 0.5rem;
  }

  .search-bar {
    max-width: 200px;
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
  .social-icons {
    display: flex;
    margin-top: 3rem;
    width: 20rem;
  }

  .social-icon {
    font-size: 1.5rem;
    color: var(--clr-grey-4);
    -webkit-transition: var(--mainTransition);
    transition: var(--mainTransition);
    margin-right: 20px;
  }
  .social-icon:hover {
    color: var(--hover-color-1);
  }

  .close-btn {
    display: none;
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2.5rem;
    background: transparent;
    border: transparent;
    -webkit-transition: var(--mainTransition);
    transition: var(--mainTransition);
    color: #221c1c;
    cursor: pointer;
    outline: none;
  }
  &:hover {
    color: var(--button-color-2);
  }

  /** Display close button just auto close */
  @media screen and (min-width: 768px) {
    .close-btn {
      display: inline-block;
    }
  }
  /* auto close: remove sidebar as navbar appears*/
  @media screen and (min-width: 800px) {
    .sidebar {
      display: none;
    }
  }
`;
