import React from "react";
import { Route, Routes, Outlet, Link } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { renderToString } from "react-dom/server";
import Home from "./Home"
import About from "./About"

const Nav = (props) => {
  return <div>
    <Link style={{ margin: "0px 10px" }} to="/home">home</Link>
    <Link style={{ margin: "0px 10px" }} to="/about">about</Link>
    <Outlet />
  </div>
}

const App = () => {
  return <div>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<Nav />} >
          <Route index path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<div>无页面</div>} />
        </Route>
        {/* <Route index path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<div>无页面</div>} /> */}
      </Routes>
    </React.StrictMode>
  </div >;
}

const render = (props = {}) => {
  const html = renderToString(
    <StaticRouter location={props.url.path}>
      <App {...props} />
    </StaticRouter>
  );
  return {
    html,
  };
};

export { render }