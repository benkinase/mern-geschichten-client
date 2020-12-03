import React, { useState } from "react";
import $ from "jquery";
import { useHistory, useLocation } from "react-router-dom";
import { Form } from "react-bootstrap";
import styled from "styled-components/macro";
import { AuthContext } from "../contexts/AuthContext";
import StyledLink from "../helpers/StyledLink";

export default function Login() {
  let history = useHistory();
  let location = useLocation();
  const { loginUser, error, loading, user } = React.useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [icon, setIcon] = useState("fa fa-lock");

  React.useEffect(() => {
    if (user) {
      history.push("/dashboard");
    }
    return () => {
      //cleanup
    };
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginDetails = { email, password };
    loginUser(loginDetails);
  };

  function togglePass() {
    let pass = document.querySelector(".pass");
    if (pass.type === "password") {
      pass.type = "text";
      setIcon("fa fa-unlock");
    } else {
      pass.type = "password";
      setIcon("fa fa-lock");
    }
  }

  $(document).ready(function () {
    if (location.pathname === "/login") {
      $(".login").html("Signup");
    }
  });

  return (
    <LoginContainer>
      <div className="form mt-3 container">
        <form onSubmit={handleSubmit}>
          <h5 className="switch">
            <StyledLink
              to={location.pathname === "/login" ? "/signup" : ""}
              className="text-center login"
            >
              Login
            </StyledLink>
          </h5>
          {loading && <div>Loading...</div>}
          {error && <div className="red-text">{error}</div>}
          <Form.Group controlId="email" bssize="large">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password" bssize="large">
            <Form.Label>Password</Form.Label>
            <div className="passContainer">
              <Form.Control
                className="form-control pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <i className={icon} onClick={togglePass} aria-hidden="true"></i>
            </div>
          </Form.Group>
          <button type="submit" className="secondary-btn">
            {loading ? "signing..." : "Login"}
          </button>
        </form>
      </div>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  form {
    width: 360px;
    margin: 4rem auto;
    padding: 30px;
    box-shadow: inset 5px 5px 15px 5px rgba(0, 0, 0, 0.64);
    background: var(--clr-primary-2);
    color: white;
  }

  .switch {
    text-align: center;
  }

  .form-control:focus {
    background: var(--clr-grey-6);
    outline: none;
  }
  .passContainer {
    position: relative;
    display: flex;
  }
  .fa-lock,
  .fa-unlock {
    position: absolute;
    right: 8px;
    top: 12px;
    color: var(--button-color-5);
  }
  .fa-lock:hover,
  .fa-unlock:hover {
    cursor: pointer;
  }
`;
