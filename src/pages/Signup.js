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
  const [err, setSignUpErr] = useState();
  const [newUser, setNewUser] = React.useState({
    email: "",
    username: "",
    password: "",
  });
  const [image, setImage] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [icon, setIcon] = useState("fa fa-lock");

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
          setUrl(data.url);
          setSignUpErr("");
          collectFields(); // collect other  user inputs
        })
        .catch((err) => {
          setSignUpErr(err);
        });
    } else {
      return setSignUpErr("invalid image type");
    }
  };

  // trigger imageUpload || collectFields
  function handleSubmit(e) {
    e.preventDefault();
    if (image) {
      imageUpload();
    } else {
      collectFields();
    }
  }

  // collects all field, after url is available
  const collectFields = React.useCallback(() => {
    //destructure newUser
    const { username, email, password } = newUser;
    if (!email || !password || !username) {
      setSignUpErr("Please fill in all the fields");
      return false;
    } else if (password.length < 6) {
      setSignUpErr("Password must be atleast 6 characters");
      return false;
    }
    const newUserData = { username, email, password, image: url };
    try {
      register(newUserData);
    } catch (err) {
      setSignUpErr(err);
    }
  }, [url, register, newUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  $(document).ready(function () {
    if (location.pathname === "/signup") {
      $(".signup").html("Login");
    }
  });

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

  return (
    <SignupContainer>
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          <h5 className="switch">
            <StyledLink
              to={location.pathname === "/signup" ? "/login" : ""}
              className="text-center signup"
            ></StyledLink>
          </h5>
          {loading && <div>Loading...</div>}
          {error && <div className="red-text">{error}</div>}
          {err && <span className="red-text">{err}</span>}
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
          <Form.Group controlId="username" bssize="large">
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

            <div className="passContainer">
              <Form.Control
                className="form-control pass"
                value={newUser.password}
                onChange={handleChange}
                type="password"
                name="password"
              />
              <i className={icon} onClick={togglePass} aria-hidden="true"></i>
            </div>
          </Form.Group>
          <Form.Group controlId="photo" bssize="large">
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

// scoped styling
const SignupContainer = styled.div`
  form {
    width: 360px;
    margin: 2rem auto;
    padding: 25px 30px;
    ${"" /* box-shadow: inset 5px 5px 15px 5px rgba(0, 0, 0, 0.64); */}
    background: var(--clr-primary-2);
    color: white;
  }
  .switch {
    text-align: center;
  }
  .file:focus {
    outline: none;
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
    right: 10px;
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
