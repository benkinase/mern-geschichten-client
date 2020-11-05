import { actionTypes } from "./actionTypes";
export const initialState = {
  stories: [],
  error: "",
  loading: false,
  history: [],
  story: {},
  userStories: [],
  message: "",
};

export const storyReducer = (state, action) => {
  //console.log(action.payload);
  switch (action.type) {
    case actionTypes.STORY_LIST_REQUEST:
      return { loading: true };
    case actionTypes.STORY_LIST_SUCCESS:
      return {
        ...state,
        stories: action.payload,
        loading: false,
      };
    case actionTypes.STORY_LIST_FAIL:
      return { loading: false, error: action.payload };

    case actionTypes.STORY_PRIVATE_REQUEST:
      return { loading: true };
    case actionTypes.STORY_PRIVATE_SUCCESS:
      return {
        ...state,
        userStories: action.payload,
        loading: false,
      };
    case actionTypes.STORY_PRIVATE_FAIL:
      return { loading: false, error: action.payload };

    case actionTypes.STORY_DETAILS_REQUEST:
      return { loading: true };
    case actionTypes.STORY_DETAILS_SUCCESS:
      return {
        ...state,
        story: action.payload,
        loading: false,
      };
    case actionTypes.STORY_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case actionTypes.STORY_ADD_REQUEST:
      return { loading: true };

    case actionTypes.STORY_ADD_SUCCESS:
      return {
        ...state,
        stories: [action.payload],
        message: action.payload.message,
        loading: false,
      };

    case actionTypes.STORY_ADD_FAIL:
      return { loading: false, error: action.payload };

    case actionTypes.STORY_UPDATE_REQUEST:
      return { loading: true };

    case actionTypes.STORY_UPDATE_SUCCESS:
      return {
        ...state,
        stories: state.stories?.map((story) =>
          story.id === action.payload.id ? action.payload : story
        ),
        message: action.payload.message,
        loading: false,
      };
    case actionTypes.STORY_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case actionTypes.STORY_DELETE_REQUEST:
      return { loading: true };

    case actionTypes.STORY_DELETE_SUCCESS:
      return {
        ...state,
        stories: state.stories?.filter(
          (story) => story?._id !== action.payload
        ),
        message: action.payload,
        loading: false,
      };

    case actionTypes.STORY_DELETE_FAIL:
      return { loading: false, error: action.payload };

    case actionTypes.STORY_LIKE_REQUEST:
      return { loading: true };
    case actionTypes.STORY_LIKE_SUCCESS:
      return { story: action.payload, loading: false };
    case actionTypes.STORY_LIKE_FAIL:
      return { loading: false, error: action.payload };

    case actionTypes.STORY_UNLIKE_REQUEST:
      return { loading: true };
    case actionTypes.STORY_UNLIKE_SUCCESS:
      return { loading: false, story: action.payload };
    case actionTypes.STORY_UNLIKE_FAIL:
      return { loading: false, error: action.payload };

    case actionTypes.STORY_COMMENT_REQUEST:
      return { loading: true };
    case actionTypes.STORY_COMMENT_SUCCESS:
      return { loading: false, story: action.payload };
    case actionTypes.STORY_COMMENT_FAIL:
      return { loading: false, error: action.payload };

    // case actionTypes.UNDO_DELETE:
    //   const isEmpty = !state.history.length;
    //   if (isEmpty) return state;
    //   return { ...state.history[state.history.length - 1] };

    default:
      return state;
  }
};
