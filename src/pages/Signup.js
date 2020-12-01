import React, { useState } from "react";
import $ from "jquery";
import { useLocation } from "react-router-dom";
import { Form } from "react-bootstrap";
import styled from "styled-components/macro";
import { AuthContext } from "../contexts/AuthContext";
import StyledLink from "../helpers/StyledLink";

export default function Login(props) {
  let location = useLocation();
  const { register, loading, error, user, msg } = React.useContext(AuthContext);
  const [err, setErr] = useState();
  const [newUser, setNewUser] = React.useState({
    email: "",
    username: "",
    password: "",
  });
  const [image, setImage] = React.useState("");
  const [url, setUrl] = React.useState("");

  React.useEffect(() => {
    if (url) {
      collectFields();
    }
  }, [url]);

  React.useEffect(() => {
    if (user || msg) {
      props.history.push("/dashboard");
    }
    return () => {
      //cleanup
    };
  }, [user, msg, props.history]);

  const types = ["image/png", "image/jpeg", "image/jpg"];

  // upload image and retrieve url from cloud
  const imageUpload = (event) => {
    const data = new FormData();
    let seletected = image;
    if (seletected && types.includes(seletected.type)) {
      data.append("file", image);
      data.append("upload_preset", "geschichten");
      data.append("cloud_name", "imagecoding");
      fetch("https://api.cloudinary.com/v1_1/imagecoding/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUrl(data.url);
          setErr("");
        })
        .catch((err) => {
          setErr(err);
        });
    } else {
      return setErr("invalid image type");
    }
  };

  // trigger imageUpload // collectFields
  async function handleSubmit(e) {
    e.preventDefault();
    if (image) {
      imageUpload();
    } else {
      collectFields();
    }
  }

  // collects all fielsd, after url is available
  const collectFields = () => {
    const newUserData = {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      image: url,
    };
    //console.log(newUserData);
    try {
      // send data to server
      register(newUserData);
      // Swall mesage
    } catch (err) {
      setErr(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  $(document).ready(function () {
    if (location.pathname === "/signup") {
      $(".signup").html("Login");
    }
  });

  return (
    <SignupContainer>
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          {err && <span className="red-text">{err}</span>}
          <h5 className="switch">
            <StyledLink
              to={location.pathname === "/signup" ? "/login" : ""}
              className="text-center signup"
            >
              Login
            </StyledLink>
          </h5>
          {loading && <div>Loading...</div>}
          {error && <div className="red-text">{error}</div>}
          <Form.Group controlId="email" bssize="large">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="email" bssize="large">
            <Form.Label>Username*</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              name="username"
              value={newUser.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password" bssize="large">
            <Form.Label>Password*</Form.Label>
            <Form.Control
              value={newUser.password}
              onChange={handleChange}
              type="password"
              name="password"
            />
          </Form.Group>
          <Form.Group controlId="email" bssize="large">
            <Form.Label>Photo</Form.Label>
            <Form.Control
              autoFocus
              className="file"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>

          <button type="submit" className="secondary-btn">
            {loading ? "Registering..." : "Register"}
          </button>
        </Form>
      </div>
    </SignupContainer>
  );
}

const SignupContainer = styled.div`
  form {
    width: 360px;
    margin: 2rem auto;
    padding: 30px;
    box-shadow: inset 5px 5px 15px 5px rgba(0, 0, 0, 0.64);
    background: var(--clr-primary-2);
    color: white;
  }
  .switch {
    text-align: center;
  }
  .file:focus{
    outline:none;
  }
    
  }
`;
