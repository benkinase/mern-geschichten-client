import React from "react";
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
    <div className="container mt-5 content-page">
      <button
        onClick={() => {
          history.push("/dashboard");
          window.location.reload(false);
        }}
        className="btn back btn-outline-dark"
      >
        Back
      </button>
      <div className="story-details">
        <div className="details-left">
          <div className=" story shadow  py-5 px-5">
            <p className="title">
              <strong>Title: </strong>
              {story?.title}
            </p>
            <p className="justify-body">
              <strong>Content: </strong> {story?.content}
            </p>

            <p className="date">
              <strong>Date: </strong>
              {story?.createdAt}
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
                    window.location.reload(false);
                  }}
                ></i>
              ) : (
                <i
                  className="fas fa-thumbs-up"
                  onClick={() => {
                    likeStory(story?._id);
                    window.location.reload(false);
                  }}
                ></i>
              )}
              <h4 className="red-text">{story?.likes?.length} likes</h4>
            </div>
          </div>
          <div className="comments mt-4">
            <h4>Comments</h4>
            {story?.comments?.map((comment) => {
              return (
                <>
                  <h6 key={comment._id}>
                    <span style={{ fontWeight: "500" }}>
                      {comment?.username} <br />
                    </span>
                    {comment?.text}
                    <i className="fas fa-thrash-alt"></i>
                  </h6>
                </>
              );
            })}
          </div>
        </div>
        <div className="comment-form">
          <form onSubmit={handleSubmit}>
            <textarea
              type="text"
              placeholder="Add a comment"
              onChange={(e) => setValue(e.target?.value)}
              required
            ></textarea>
            <br />
            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}
