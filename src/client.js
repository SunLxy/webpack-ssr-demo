import React from "react";
import ReactDom from "react-dom";
// import App from "./App"
import App from "./ssr"

ReactDom.hydrate(<App />, document.getElementById("root"))