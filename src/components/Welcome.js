import React from "react";
import { Nav } from "react-bootstrap";

export default function Welcome() {
  return (
    <div className="welcome container">
      <div className="col-10 mx-auto text-title text-center">
        <div>
          <h3 className="bold-text">Welcome back to die Geschichten!</h3>
          <div className="mt-2">
            <p>Please log in to share your stories!</p>
            <p>& Enjoy your time on here</p>
          </div>
          <Nav.Link href="/login" className="primary-btn mt-5">
            login
          </Nav.Link>
        </div>
      </div>
    </div>
  );
}
