import React from "react";
import { StoryContext } from "../contexts/StoryContext";
import Story from "./Story";
import Spinner from "./Spinner";

export default function Stories() {
  const { stories, loading } = React.useContext(StoryContext);

  return (
    <div className="container">
      {loading ? (
        <Spinner />
      ) : (
        <div className="stories">
          {stories?.map((story) => (
            <Story story={story} key={story._id} />
          ))}
        </div>
      )}
    </div>
  );
}
