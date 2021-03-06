const express = require("express");
const fs = require("fs")
const app = express();
const path = require("path")
const render = require("../build/ssr.js").default;

const htmlTemp = fs.readFileSync(path.join(__dirname, "./../build/index.html"), "utf-8")

app.use("/public", express.static(path.join(__dirname, "./../build")))

app.all("*", (req, res) => {
  let urls = req.url
  if (urls === "/") {
    urls = "/home"
  }
  const html = render({ url: urls })
  const neeHtmls = htmlTemp.replace("__APP__", html)
  res.send(neeHtmls)
})

app.listen(8081, () => console.log("监听端口: 8081，地址：http://localhost:8081"))