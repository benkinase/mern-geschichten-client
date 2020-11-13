import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function NotFound(props) {
  //console.log(props, "from notfound");
  const { user } = React.useContext(AuthContext);
  return (
    <div className="h-50 bg-light container">
      <div className="container mt-5 py-5 ">
        <div className="row">
          <div className=" col-10 mx-auto text-title text-center">
            <h2>404 error</h2>
            <h2>Page not found!</h2>
            <h3>
              the requested URL{" "}
              <span className="text-danger">{props.location.pathname} </span>
              was not found
            </h3>
            <Link
              to={user ? "/dashboard" : "/"}
              className="btn btn-outline-info mt-4"
            >
              back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
