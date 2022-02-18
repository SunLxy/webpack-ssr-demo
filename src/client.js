import React from "react";
import ReactDom from "react-dom";
import App from "./ssr/routes"

ReactDom.hydrate(<App />, document.getElementById("root"))