import React from "react";
import moment from "moment";
import { Card } from "react-bootstrap";
import { StoryContext } from "../contexts/StoryContext";
import { AuthContext } from "../contexts/AuthContext";

export default function Story({ story }) {
  const { user } = React.useContext(AuthContext);
  const { likeStory, unlikeStory } = React.useContext(StoryContext);
  return (
    <Card style={{ width: "20rem" }} key={story._id}>
      <Card.Body>
        <Card.Title>{story.title.substring(0, 15)}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          PostedBy: {story.user?.username}
        </Card.Subtitle>
        <Card.Text> {moment(story.createdAt).fromNow(true)} ago</Card.Text>
        <hr />
        <Card.Link href={`/stories/${story._id}`}>Read</Card.Link>
        <Card.Link>
          {story?.likes?.includes(user?._id) ? (
            <i
              className="fas fa-heart text-danger mr-2"
              onClick={() => {
                unlikeStory(story?._id);
                setTimeout(() => {
                  window.location.reload(false);
                }, 100);
              }}
            ></i>
          ) : (
            <i
              className="fas fa-heart"
              onClick={() => {
                likeStory(story?._id);
                setTimeout(function () {
                  window.location.reload(false);
                }, 100);
              }}
            ></i>
          )}
          <span> {story?.likes?.length} likes</span>
          <span> {story?.comments?.length} comments</span>
        </Card.Link>
      </Card.Body>
    </Card>
  );
}
