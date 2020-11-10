import React from "react";
import styled from "styled-components/macro";
import moment from "moment";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Row, Col, Modal, Button, Form } from "react-bootstrap";
import CreateStory from "./CreateStory";
import { StoryContext } from "../contexts/StoryContext";
const avatar = "http://www.nretnil.com/avatar/LawrenceEzekielAmos.png";

export default function Profile() {
  const { user, deleteUser, error, logoutUser, updateUser } = React.useContext(
    AuthContext
  );
  const { removeStory, privateStories, getPrivateStories } = React.useContext(
    StoryContext
  );

  const [username, setUsername] = React.useState("");
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);

  //console.log(privateStories);
  // React.useEffect(() => {
  //   getPrivateStories(user?._id);
  //   return () => {};
  // }, [user]);

  React.useEffect(() => {
    if (user) {
      getPrivateStories(user?._id);
      setUsername(user.username);
    }

    return () => {};
  }, [user]);

  const submitHandler = (e) => {
    e.preventDefault();
    updateUser(user?._id, { username });
    handleClose();
    setTimeout(function () {
      window.location.reload(false);
    }, 500);
  };

  return (
    <ProfileContainer className="mt-5 profile-page container">
      <div className="mt-2 profile ">
        <Row>
          <Col>
            <div className="shadow profile-left">
              <div className="login-details">
                <div>
                  <img
                    src={user?.image ? user?.image : avatar}
                    alt="userImage"
                    className="profile-image"
                  />
                </div>
                <div className="user">
                  <p>Username: {user?.username}</p>
                  <p>Email: {user?.email}</p>
                  <p>Joined: {user?.date?.substring(0, 10)}</p>
                </div>
              </div>
              <span
                className="btn btn-danger mt-5"
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#38778e",
                    cancelButtonColor: "#f10e8f",
                    confirmButtonText: "Yes, delete it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteUser(user._id);
                      logoutUser();
                      Swal.fire(
                        "Deleted!",
                        "Your account has been deleted.",
                        "success"
                      );
                    }
                    setTimeout(function () {
                      window.location.reload(false);
                    }, 300);
                  });
                }}
              >
                <i className="fas fa-trash"></i>
              </span>
              <span
                className="btn btn-success ml-2 mt-5"
                disabled
                //onClick={handleShow}
              >
                <i className="fas fa-pen"></i>
              </span>
              <Modal show={show} onHide={handleClose} animation={true}>
                <Modal.Header closeButton>
                  <Modal.Title>{user?.username}</Modal.Title>
                  {error && <span className="text-danger">{error}</span>}
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="email" bssize="large">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        autoFocus
                        required
                        type="text"
                        name="title"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="info ml-2"
                    type="submit"
                    onClick={submitHandler}
                    className="text-blue"
                  >
                    Update
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </Col>
          <Col>
            <div className=" profile-right shadow mb-5 ">
              <div className="profile-create">
                <button className=" btn btn-warning h-25 mt-1  ">
                  <CreateStory className="modal" />
                </button>

                <span className="profile-search">
                  <div className="btn btn-outline-secondary mt-1">
                    Soon...more search
                  </div>
                </span>
              </div>
              {privateStories?.length === 0 ? (
                <p>You have no stories!</p>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Status</th>
                      <th>CreatedAt</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {privateStories?.map((story) => (
                      <tr key={story._id}>
                        <td>
                          <Link
                            to={"/stories/" + story._id}
                            className="blue-text"
                          >
                            {story.title}
                          </Link>
                        </td>
                        <td>{story.status}</td>
                        <td>{moment(story.createdAt).fromNow()}</td>
                        <td>
                          <Link to={`/story/edit/${story._id}`}>
                            <i className="fas fa-pen mr-3"></i>
                          </Link>

                          <i
                            className="fas fa-trash-alt"
                            onClick={() => {
                              Swal.fire({
                                height: 100,
                                title: `Sure to delete ${story?.title}?`,
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#38778e",
                                cancelButtonColor: "#f10e8f",
                                confirmButtonText: "Yes, delete it!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  removeStory(story._id);
                                  Swal.fire(
                                    "Deleted!",
                                    "The story has been deleted.",
                                    "success"
                                  );
                                }
                                setTimeout(function () {
                                  window.location.reload(false);
                                }, 200);
                              });
                            }}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  /**profile*/
  .profile-page {
    background-color: white;
  }
  .profile-right {
    min-height: 50vh;
    padding: 1rem;
    background-color: var(--profileBg);
  }
  .profile-left {
    background-color: var(--profileBg);
    padding: 1rem;
    max-height: 50vh;
    max-width: 400px;
    color: var(--mainDark);
  }

  .login-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    place-items: center;
  }
  .profile-image {
    width: 120px;
    height: 130px;
    border-radius: 80px;
  }
  .profile-image:hover {
    opacity: 0.8;
  }

  .profile-create {
    display: flex;
    justify-content: space-between;
  }
  .table {
    margin-top: 1rem;
  }

  @media screen and (max-width: 1000px) {
    .profile-left {
      margin-bottom: 1rem;
      max-width: 500px;
    }
    .profile-create .modal {
      width: 400px;
    }
  }
`;
