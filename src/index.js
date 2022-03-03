import React from "react";
import ReactDom from "react-dom";
import App from "./App"
// import "./index.css"

ReactDom.hydrate(<App />, document.getElementById("root"))

if (module.hot) {
  module.hot.accept();
}
