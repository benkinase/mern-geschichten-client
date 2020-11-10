import React from "react";

export default function Spinner({ title }) {
  return (
    <div className="container">
      <p className="text-success">{title}</p>
      <div />
      <div className="spinner-border m-5" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
