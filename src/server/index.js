const express = require("express");
const fs = require("fs")
const app = express();
const path = require("path")
const { render } = require("./../../dist/ssr.js");
app.use("/public", express.static(path.join(__dirname, "./../../dist")))

app.all("*", (req, res) => {
  let urls = req.url
  if (urls === "/") {
    urls = "/home"
  }
  const { html } = render({ url: { path: urls } })

  res.send(`
  <!doctype html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    
    <title>Document</title>
  </head>

  <body>
    <div id="root">
    ${html}
    </div>
  </body>

  </html>
  `)
})

app.listen(8081, () => console.log("监听端口：8080"))