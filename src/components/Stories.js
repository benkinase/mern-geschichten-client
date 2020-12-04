import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components/macro";
import { StoryContext } from "../contexts/StoryContext";
import Story from "./Story";
import Spinner from "./Spinner";

const NoStories = () => (
  <div className="h-50 bg-light container">
    <div className="container mt-5 py-5 ">
      <div className="row">
        <div className=" col-10 mx-auto text-title text-center">
          <h4>Story search error</h4>
          <h2>No match found!</h2>
        </div>
      </div>
    </div>
  </div>
);

export default function Stories() {
  const { stories, loading } = React.useContext(StoryContext);
  //console.log(stories);

  return loading ? (
    <Spinner title="Stories loading..." />
  ) : stories?.length === 0 ? (
    <div>{<NoStories />}</div>
  ) : (
    <Container>
      <StoriesContainer>
        <div className="stories">
          {stories?.map((story) => (
            <Story story={story} key={story._id} />
          ))}
        </div>
      </StoriesContainer>
    </Container>
  );
}

const StoriesContainer = styled.div`
  .stories {
    margin-top: 1.5rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
  }
  @media screen and (max-width: 1060px) {
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
    padding-bottom:2rem;
  }
`;
