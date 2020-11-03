import React, { createContext, useEffect, useReducer } from "react";
import axios from "../axios";
import { AuthContext } from "./AuthContext";
import { actionTypes } from "./actionTypes";
import { storyReducer, initialState } from "./storyReducer";

const StoryContext = createContext(initialState);

const StoryProvider = (props) => {
  const [state, dispatch] = useReducer(storyReducer, initialState);
  const { user } = React.useContext(AuthContext);

  // load stories when component is mounted
  useEffect(() => {
    getPublicStories();
  }, [user]);

  // load stories function
  async function getPublicStories() {
    try {
      dispatch({ type: actionTypes.STORY_LIST_REQUEST });
      const { data } = await axios.get("/api/stories");
      dispatch({ type: actionTypes.STORY_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.STORY_LIST_FAIL,
        payload: error.response.data.message,
      });
    }
  }
  // load stories function
  async function getPrivateStories(userId) {
    try {
      dispatch({ type: actionTypes.STORY_PRIVATE_REQUEST });
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
  async function removeStory(id) {
    dispatch({ type: actionTypes.STORY_DELETE_REQUEST, payload: id });
    try {
      const { data } = axios.delete("/api/stories/remove/" + id);
      dispatch({ type: actionTypes.STORY_DELETE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.STORY_DELETE_FAIL,
        payload: error.response.data.message,
      });
    }
  }

  // create a newstory
  async function createStory(story) {
    dispatch({ type: actionTypes.STORY_ADD_REQUEST, payload: story });
    try {
      const { data } = await axios.post("/api/stories/new", story);
      dispatch({ type: actionTypes.STORY_ADD_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.STORY_ADD_FAIL,
        payload: error.response.data.message,
      });
    }
  }
  // update a story
  async function updateStory(id, updstory) {
    dispatch({ type: actionTypes.STORY_UPDATE_REQUEST, payload: id, updstory });
    try {
      const { data } = await axios.put("/api/stories/update/" + id, updstory);
      dispatch({ type: actionTypes.STORY_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.STORY_UPDATE_FAIL,
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

  const newStories = query
    ? state.stories?.filter((story) =>
        story.title.toLowerCase().includes(query.toLowerCase())
      )
    : state.stories;

  // handle mModal
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <StoryContext.Provider
      value={{
        stories: newStories,
        myStories: state.userStories,
        story: state.story,
        loading: state.loading,
        message: state.message,
        error: state.error,
        createStory,
        removeStory,
        updateStory,
        getStory,
        getPrivateStories,
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
