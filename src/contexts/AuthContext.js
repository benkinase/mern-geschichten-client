import React, { useReducer, createContext } from "react";
import Cookie from "js-cookie";
import axios from "../axios";
import { actionTypes } from "./actionTypes";
import { AuthReducer, initialState } from "./authReducer";

const AuthContext = createContext(initialState);

function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // React.useEffect(() => {
  //   getUsers();
  // }, [isAuth]);

  // login existing user
  async function loginUser(loginDetails) {
    dispatch({ type: actionTypes.USER_LOGIN_REQUEST, payload: loginDetails });
    try {
      const { data } = await axios.post("/api/user/login", loginDetails);
      dispatch({ type: actionTypes.USER_LOGIN_SUCCESS, payload: data });
      Cookie.set("user", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: actionTypes.USER_LOGIN_FAIL,
        payload: error.response.data.message,
      });
    }
  }

  // register newUser
  async function register(newUser) {
    dispatch({ type: actionTypes.USER_REGISTER_REQUEST, payload: newUser });
    try {
      const { data } = await axios.post("/api/user/signup", newUser);
      dispatch({ type: actionTypes.USER_REGISTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.USER_REGISTER_FAIL,
        payload: error.response.data.message,
      });
    }
  }

  // get user
  async function getUser(id) {
    dispatch({ type: actionTypes.USER_PROFILE_REQUEST, payload: id });
    try {
      const { data } = await axios.get("/api/user/profile/" + id);
      dispatch({ type: actionTypes.USER_PROFILE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.USER_PROFILE_FAIL,
        payload: error.response.data.message,
      });
    }
  }

  // remove user
  async function deleteUser(id) {
    dispatch({ type: actionTypes.USER_PROFILE_DELETE_REQUEST, payload: id });
    try {
      const { data } = axios.delete("/api/user/profile/" + id);
      dispatch({
        type: actionTypes.USER_PROFILE_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.USER_PROFILE_DELETE_FAIL,
        payload: error.response.data.message,
      });
    }
  }
  // get users
  async function getUsers() {
    dispatch({ type: actionTypes.USER_LIST_REQUEST });
    try {
      const { data } = axios.get("/api/user/all");
      dispatch({ type: actionTypes.USER_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.USER_LIST_FAIL,
        payload: error.response.data.message,
      });
    }
  }

  // logout user
  function logoutUser() {
    Cookie.remove("user");
    dispatch({ type: actionTypes.USER_LOGOUT });
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        error: state.error,
        msg: state.message,
        loading: state.loading,
        loginUser,
        logoutUser,
        register,
        getUser,
        deleteUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const AuthConsumer = AuthContext.Consumer;

export { AuthContextProvider, AuthConsumer, AuthContext };
