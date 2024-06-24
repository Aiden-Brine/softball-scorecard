import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";

const domNode = document.getElementById("root");
if (domNode === null) {
  throw new Error("Rooot container is missing in index.html");
}

const root = ReactDOM.createRoot(domNode);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
