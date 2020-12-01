import React from "react";
import styled from "styled-components/macro";
import moment from "moment";
import { Card } from "react-bootstrap";
import { StoryContext } from "../contexts/StoryContext";
import { AuthContext } from "../contexts/AuthContext";

export default function Story({ story }) {
  const { user } = React.useContext(AuthContext);
  const { likeStory, unlikeStory } = React.useContext(StoryContext);

  return (
    <StoryContainer>
      <Card className="story shadow" key={story._id}>
        <Card.Body>
          <Card.Title>{story.title.substring(0, 15)}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            PostedBy: {story.user?.username}
          </Card.Subtitle>
          <Card.Text> {moment(story.createdAt).fromNow()}</Card.Text>
          <hr className="bg-info" />
          <Card.Link href={`/stories/${story._id}`}>
            <i className="fas fa-eye"></i>
          </Card.Link>
          <Card.Link>
            {story?.likes?.includes(user?._id) ? (
              <i
                className="fas fa-heart red-text mr-2"
                onClick={() => unlikeStory(story?._id)}
              ></i>
            ) : (
              <i
                className="fas fa-heart"
                onClick={() => likeStory(story?._id)}
              ></i>
            )}
            <span> {story?.likes?.length} likes</span>
            <span> {story?.comments?.length} comments</span>
          </Card.Link>
        </Card.Body>
      </Card>
    </StoryContainer>
  );
}

const StoryContainer = styled.div`
  .story {
    background-color: var(--clr-white-1) !important;
    border: none !important;
    color: var(--clr-grey-1);
    width: 20rem;
    text-align: center;
  }

  span {
    color: var(--clr-grey-4) !important;
    margin-left: 0.2rem;
  }
`;
