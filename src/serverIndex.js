const express = require("express");
const fs = require("fs")
const app = express();
const path = require("path")
const render = require("./server").default;
const htmlTemp = fs.readFileSync(path.join(process.cwd(), "./build/index.html"), "utf-8")

app.use("assets", express.static(path.join(process.cwd(), "./build")))

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