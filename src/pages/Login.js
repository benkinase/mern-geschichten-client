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
  const [loginErr, setLoginErr] = useState("");
  const [icon, setIcon] = useState("fa fa-lock");

  React.useEffect(() => {
    if (user) {
      history.push("/dashboard");
      window.location.reload(false);
    }
    return () => {
      //cleanup
    };
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginErr("Please fill in all the fields");
      return false;
    } else if (!email.includes("@")) {
      setLoginErr("Please enter a valid email");
      return false;
    }
    const loginDetails = { email, password };
    loginUser(loginDetails);
    setLoginErr("");
  };

  // toggle password visibility
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
  // handle login/signup switch
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
            ></StyledLink>
          </h5>
          {loading && <div>Loading...</div>}
          {error && <div className="red-text">{error}</div>}
          {loginErr && <div className="red-text">{loginErr}</div>}
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

// scoped styling
const LoginContainer = styled.div`
  form {
    width: 360px;
    margin: 4rem auto;
    padding: 30px;
    ${"" /* box-shadow: inset 5px 5px 15px 5px rgba(0, 0, 0, 0.64); */}
    background: var(--clr-primary-2);
    color: white;
  }

  .switch {
    text-align: center;
  }

  .form-control:focus {
    background: #dcdad1;
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
    color: var(--button-color-0);
    transition: var(--mainTransition);
  }
  .fa-lock:hover,
  .fa-unlock:hover {
    cursor: pointer;
    color: var(--button-color-1);
  }
`;
