import React from "react";
import { Nav } from "react-bootstrap";
import styled from "styled-components/macro";

export default function Welcome() {
  return (
    <WelcomeContainer>
      <div className="welcome container">
        <div className="col-10 mx-auto text-title text-center">
          <div className="">
            <h3 className="bold-text text-popins text-shadow">
              Welcome back to Geschichten!
            </h3>
            <div className="mt-2">
              <p>Please log in to share your stories</p>
              <p>& Enjoy your time on here</p>
            </div>
            <p className="d-flex justify-content-center mt-5">
              <Nav.Link href="/signup" className="primary-btn mr-1">
                signup
              </Nav.Link>
              <Nav.Link href="/login" className="primary-btn">
                login
              </Nav.Link>
            </p>
          </div>
        </div>
      </div>
    </WelcomeContainer>
  );
}

const WelcomeContainer = styled.div`
  .welcome {
    margin-top: 5rem;
    box-shadow: var(--darkShadow);
    padding-bottom: 2rem;
  }
  .welcome .text-shadow {
    text-shadow: 2px 8px 6px #00000033, 0px -5px 35px #ffffff4d;
  }

  /*buttons*/
  .primary-btn {
    text-decoration: none;
    width: 8rem;
    letter-spacing: var(--mainSpacing);
    color: var(--mainYellow);
    background: var(--Blue);
    padding: 0.4rem 0.9rem;
    border: 3px solid var(--mainDark);
    transition: var(--mainTransition);
    text-transform: uppercase;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
  }
  .primary-btn:hover {
    background: transparent;
    color: var(--Blue);
  }

  @media screen and (max-width: 1000px) {
    .welcome {
      max-width: 500px;
    }
  }
`;
