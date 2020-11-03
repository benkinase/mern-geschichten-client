import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { StoryContext } from "../contexts/StoryContext";
import { AuthContext } from "../contexts/AuthContext";

export default function Story({ story }) {
  const { user } = React.useContext(AuthContext);
  const { likeStory, unlikeStory } = React.useContext(StoryContext);
  return (
    <Card style={{ width: "20rem" }} key={story._id}>
      <Card.Body>
        <Card.Title>{story.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          PostedBy: {story.user?.username}
        </Card.Subtitle>
        <Card.Text> Date: {story.createdAt.substring(0, 10)}</Card.Text>
        <hr />
        <Card.Link href={`/stories/${story._id}`}>Read</Card.Link>
        <Card.Link>
          {story?.likes?.includes(user?._id) ? (
            <i
              className="fas fa-heart text-danger mr-2"
              onClick={() => {
                unlikeStory(story?._id);
                window.location.reload(false);
              }}
            ></i>
          ) : (
            <i
              className="fas fa-heart"
              onClick={() => {
                likeStory(story?._id);
                window.location.reload(false);
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
