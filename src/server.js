import React from "react";
import { StaticRouter } from "react-router-dom/server";
import { renderToString } from "react-dom/server";
import App from "./App"
// import App from "./ssr"

const render = (props = {}) => {
  const html = renderToString(
    <StaticRouter location={props.url}>
      <App {...props} />
    </StaticRouter>
  );
  return html;
};
export default render