import React from "react";

function NotFound(props) {
  console.log(props, "from notfound");
  return (
    <div className="h-100 bg-light container">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
