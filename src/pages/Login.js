import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import styled from "styled-components/macro";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  let history = useHistory();
  const { loginUser, error, loading, user } = React.useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <LoginContainer>
      <div className="form mt-3 container">
        <form onSubmit={handleSubmit}>
          <h4 className="text-center">Login</h4>
          {loading && <div>Loading...</div>}
          {error && <div className="yellow-text">{error}</div>}
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
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </Form.Group>
          <button type="submit" className="secondary-btn">
            Login
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
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
    background: var(--Blue);
    color: white;
  }
`;
