import React from "react";
import moment from "moment";
import { Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { StoryContext } from "../contexts/StoryContext";
import { AuthContext } from "../contexts/AuthContext";

export default function Story(props) {
  let history = useHistory();
  const {
    likeStory,
    getStory,
    story,
    unlikeStory,
    makeComment,
  } = React.useContext(StoryContext);
  const { user } = React.useContext(AuthContext);
  const [value, setValue] = React.useState({ text: "" });

  //console.log(user._id, storyId);
  //const [story, setStory] = React.useState({});

  React.useEffect(() => {
    getStory(props.match.params.id);
    return () => {};
  }, [props.match.params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    makeComment(story._id, { text: value });
    window.location.reload(false);
    setValue({ text: "" });
  };

  return (
    <div className="container mt-5">
      <div className="row mx-auto">
        <div className="single-p col-sm-12 col-lg-6 shadow p-5 mb-4">
          <p className="title">
            <strong>Title: </strong>
            {story?.title}
          </p>
          <p className="justify-body">
            <strong>Content: </strong> {story?.content}
          </p>

          <p className="date">
            <strong>Date: </strong>
            {moment(story?.createdAt).fromNow(true)} ago
          </p>
          <p className="date">
            <strong>Story from: </strong>
            {story?.user?.username}
          </p>
          <div className="likes">
            {story?.likes?.includes(user?._id) ? (
              <i
                className="fas fa-thumbs-down mr-3"
                onClick={() => {
                  unlikeStory(story?._id);
                  setTimeout(function () {
                    window.location.reload(false);
                  }, 200);
                }}
              ></i>
            ) : (
              <i
                className="fas fa-thumbs-up"
                onClick={() => {
                  likeStory(story?._id);
                  setTimeout(function () {
                    window.location.reload(false);
                  }, 200);
                }}
              ></i>
            )}
            <h4 className="red-text">{story?.likes?.length} likes</h4>
          </div>
        </div>

        <div className="comment-form col-sm-12 col-lg-5">
          <form onSubmit={handleSubmit}>
            <textarea
              maxlength="213"
              type="text"
              placeholder="Comment..."
              onChange={(e) => setValue(e.target?.value)}
              required
            ></textarea>
            <br />
            <button>{"Post comment"}</button>
          </form>
        </div>
        <div className="col-sm-12 mt-3  ">
          {story?.comments?.map((comment) => {
            return (
              <div className="comments">
                <h4>Comments</h4>
                <h6 key={comment._id} className=" p-2 w-50 mb-3">
                  <span>
                    <span className="blue-txt">user:</span> {comment?.username}{" "}
                    <br />
                  </span>
                  <span className="blue-txt">comment:</span> {comment?.text}
                  <i className="fas fa-thrash-alt"></i>
                </h6>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
