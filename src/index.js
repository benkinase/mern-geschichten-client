import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextProvider } from "./contexts/AuthContext";
import { StoryProvider } from "./contexts/StoryContext";

ReactDOM.render(
  <AuthContextProvider>
    <StoryProvider>
      <App />
    </StoryProvider>
  </AuthContextProvider>,

  document.getElementById("root")
);
