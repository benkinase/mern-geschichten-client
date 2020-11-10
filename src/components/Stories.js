import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components/macro";
import { StoryContext } from "../contexts/StoryContext";
import Story from "./Story";
import Spinner from "./Spinner";

export default function Stories() {
  const { stories, loading } = React.useContext(StoryContext);

  return (
    <Container>
      <StoriesContainer>
        {loading ? (
          <Spinner title="Stories loading..." />
        ) : (
          <div className="stories">
            {stories?.map((story) => (
              <Story story={story} key={story._id} />
            ))}
          </div>
        )}
      </StoriesContainer>
    </Container>
  );
}

const StoriesContainer = styled.div`
  .stories {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    margin-bottom: 1rem;
  }
  @media screen and (max-width: 1000px) {
    .stories {
      display: grid;
      grid-template-columns: repeat(2, 2fr);
      place-items: center;
    }
  }
  @media screen and (max-width: 765px) {
  .stories {
    display: grid;
    grid-template-columns: 1fr;
    place-items: center;
  }
`;
