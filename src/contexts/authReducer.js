//import jwtDecode from "jwt-decode";
import Cookie from "js-cookie";
import { actionTypes } from "./actionTypes";

export const initialState = {
  user: null,
  token: null,
  loading: false,
  error: "",
  users: [],
  message: "",
};
// get current user
const user = Cookie.getJSON("user") || null;
initialState.user = user;

export const AuthReducer = (state, action) => {
  //console.log(state, action);
  switch (action.type) {
    case actionTypes.USER_LOGIN_REQUEST:
      return { loading: true };
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        message: action.payload.message,
      };
    case actionTypes.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.USER_REGISTER_REQUEST:
      return { loading: true };
    case actionTypes.USER_REGISTER_SUCCESS:
      return {
        loading: false,
        message: action.payload.message,
      };
    case actionTypes.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case actionTypes.USER_LOGOUT:
      return { ...state, isLoggedIn: false, user: null };

    case actionTypes.USER_PROFILE_REQUEST:
      return { loading: true };
    case actionTypes.USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload.profile,
        loading: false,
        message: action.payload.message,
      };
    case actionTypes.USER_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    case actionTypes.USER_PROFILE_UPDATE_REQUEST:
      return { loading: true };
    case actionTypes.USER_PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        //message: action.payload.message,
      };
    case actionTypes.USER_PROFILE_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case actionTypes.USER_PROFILE_DELETE_REQUEST:
      return { loading: true };
    case actionTypes.USER_PROFILE_DELETE_SUCCESS:
      return {
        loading: false,
        user: null,
        token: action.payload.token,
        message: action.payload,
      };
    case actionTypes.USER_PROFILE_DELETE_FAIL:
      return { loading: false, error: action.payload };

    case actionTypes.USERS_LIST_REQUEST:
      return { loading: true };
    case actionTypes.USERS_LIST_SUCCESS:
      return { users: action.payload, loading: false };
    case actionTypes.USERS_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
