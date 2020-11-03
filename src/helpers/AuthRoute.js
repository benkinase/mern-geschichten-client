// redirect to current page if logged in
import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookie from "js-cookie";

function AuthRoute(props) {
  const isAuth = !!Cookie.getJSON("user");
  //console.log(isAuth);

  if (isAuth) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/" />;
  }
}

export default AuthRoute;
