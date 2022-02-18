import React from "react";
import { Route, Routes, Outlet, Link } from "react-router-dom";
import Home from "./Home"
import About from "./About"

const Nav = () => {
  return <div>
    <Link style={{ margin: "0px 10px" }} to="/home">home</Link>
    <Link style={{ margin: "0px 10px" }} to="/about">about</Link>
    <Outlet />
  </div>
}

export default () => {
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

