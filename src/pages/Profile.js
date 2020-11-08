import React from "react";
import moment from "moment";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Container, Row, Col } from "react-bootstrap";
import Title from "../components/Title";
import CreateStory from "./CreateStory";
import { StoryContext } from "../contexts/StoryContext";
const avatar = "http://www.nretnil.com/avatar/LawrenceEzekielAmos.png";

export default function Profile() {
  const { user, deleteUser, logoutUser } = React.useContext(AuthContext);
  const { removeStory, privateStories, getPrivateStories } = React.useContext(
    StoryContext
  );

  //console.log(privateStories);
  React.useEffect(() => {
    getPrivateStories(user._id);
    return () => {};
  }, [user._id]);

  return (
    <Container className="mt-5 profile-page">
      <Title name="Dashboard" title={user?.username} className="title" />
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
                  <p>Joined: {user?.date.substring(0, 10)}</p>
                </div>
              </div>
              <button
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
                  });
                }}
              >
                delete account
              </button>
            </div>
          </Col>
          <Col>
            <div className=" profile-right shadow mb-5 ">
              <div className="profile-create">
                <button className=" btn btn-warning h-25 mt-1  ">
                  <CreateStory className="modal" />
                </button>

                <span className="profile-search">
                  <div className="btn btn-outline-secondary">
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
                                title: "Are you sure?",
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
    </Container>
  );
}
