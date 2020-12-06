import React, { createContext, useEffect, useReducer } from "react";
import axios from "../axios";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthContext";
import { actionTypes } from "./actionTypes";
import { storyReducer, initialState } from "./storyReducer";

const StoryContext = createContext(initialState);

const StoryProvider = (props) => {
  const [state, dispatch] = useReducer(storyReducer, initialState);
  const { user } = React.useContext(AuthContext);
  const [isMounted, setIsMounted] = React.useState(false);

  // load stories when component is mounted
  useEffect(() => {
    setIsMounted(true);
    isMounted && user && getPublicStories();
    return () => {
      setIsMounted(false);
    };
  }, [user, isMounted]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    background: "white",
  });

  // load stories function
  async function getPublicStories() {
    try {
      dispatch({ type: actionTypes.STORY_LIST_REQUEST });
      const { data } = await axios.get("/api/stories");
      dispatch({ type: actionTypes.STORY_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.STORY_LIST_FAIL,
        payload: error.response?.data.message,
      });
    }
  }
  // load stories function
  async function getPrivateStories(userId) {
    try {
      dispatch({ type: actionTypes.STORY_PRIVATE_REQUEST, payload: userId });
      const { data } = await axios.get("/api/stories/user/" + userId);
      dispatch({ type: actionTypes.STORY_PRIVATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.STORY_PRIVATE_FAIL,
        payload: error.response.data.message,
      });
    }
  }

  // get a single story
  async function getStory(id) {
    try {
      dispatch({ type: actionTypes.STORY_DETAILS_REQUEST, payload: id });
      const { data } = await axios.get("/api/stories/" + id);
      dispatch({ type: actionTypes.STORY_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.STORY_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  }

  // remove a story
  async function removeStory(story) {
    dispatch({ type: actionTypes.STORY_DELETE_REQUEST, payload: story });
    try {
      dispatch({ type: actionTypes.STORY_DELETE_SUCCESS, payload: story });
      await axios.delete("/api/stories/remove/" + story._id);
    } catch (error) {
      dispatch({
        type: actionTypes.STORY_DELETE_FAIL,
        payload: error.response.data.message,
      });
    }
  }

  // create or update a newstory
  async function saveStory(story) {
    try {
      dispatch({ type: actionTypes.STORY_SAVE_REQUEST, payload: story });
      if (!story._id) {
        const { data } = await axios.post("/api/stories/new", story);
        dispatch({ type: actionTypes.STORY_SAVE_SUCCESS, payload: data });
        Toast.fire({
          type: "success",
          title: "Item successfully added",
        });
      } else {
        const { data } = await axios.put(
          "/api/stories/update/" + story._id,
          story
        );
        dispatch({ type: actionTypes.STORY_SAVE_SUCCESS, payload: data });
        Toast.fire({
          type: "success",
          title: "Story successfully updated",
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.STORY_SAVE_FAIL,
        payload: error.response.data.message,
      });
    }
  }

  // like a story
  async function likeStory(storyId) {
    dispatch({ type: actionTypes.STORY_LIKE_REQUEST, payload: storyId });
    try {
      const { data } = await axios.put("/api/stories/like/" + storyId);
      dispatch({ type: actionTypes.STORY_LIKE_SUCCESS, payload: data });
      getPublicStories();
    } catch (error) {
      dispatch({
        type: actionTypes.STORY_LIKE_FAIL,
        payload: error.response.data.message,
      });
    }
  }
  // unlike a story
  async function unlikeStory(storyId) {
    dispatch({ type: actionTypes.STORY_LIKE_REQUEST, payload: storyId });
    try {
      const { data } = await axios.put("/api/stories/unlike/" + storyId);
      dispatch({ type: actionTypes.STORY_LIKE_SUCCESS, payload: data });
      getPublicStories();
    } catch (error) {
      dispatch({
        type: actionTypes.STORY_LIKE_FAIL,
        payload: error.response.data.message,
      });
    }
  }
  //comment on a story
  async function makeComment(storyId, text) {
    dispatch({
      type: actionTypes.STORY_COMMENT_REQUEST,
      payload: storyId,
      text,
    });
    try {
      const { data } = await axios.put("/api/stories/comment/" + storyId, text);
      dispatch({ type: actionTypes.STORY_COMMENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.STORY_COMMENT_FAIL,
        payload: error.response.data.message,
      });
    }
  }

  //filter stories
  const [query, setQuery] = React.useState("");
  function onSearch({ currentTarget }) {
    setQuery(currentTarget.value);
  }

  const filteredStories = query
    ? state.stories?.filter((story) =>
        story.title.toLowerCase().includes(query.toLowerCase())
      )
    : state.stories;

  return (
    <StoryContext.Provider
      value={{
        stories: filteredStories,
        privateStories: state.userStories,
        story: state.story,
        loading: state.loading,
        message: state.message,
        error: state.error,
        removeStory,
        saveStory,
        getStory,
        getPrivateStories,
        getPublicStories,
        likeStory,
        unlikeStory,
        makeComment,
        searchStory: onSearch,
        query: query,
      }}
    >
      {props.children}
    </StoryContext.Provider>
  );
};
const StoryConsumer = StoryContext.Consumer;

export { StoryContext, StoryProvider, StoryConsumer };
