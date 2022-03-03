const express = require("express");
// const fs = require("fs")
const app = express();
const render = require("./server").default;

const Path = require("path")
const FS = require('fs');

const appDirectory = FS.realpathSync(process.cwd());
const resolveApp = relativePath => Path.resolve(appDirectory, relativePath);

const msa = new Function(`return ${FS.readFileSync(Asset_Manifest_Path, "utf-8")}`)()

const assetManifest = { js: undefined, css: undefined }
if (msa) {
  Object.values(msa.entrypoints || {}).forEach((item) => {
    if (/js$/.test(item)) {
      assetManifest.js = item
    }
    if (/css$/.test(item)) {
      assetManifest.css = item
    }
  })
}

app.use(express.static(resolveApp("build")))

app.all("*", (req, res) => {
  let urls = req.url
  if (urls === "/") {
    urls = "/home"
  }
  const html = render({ url: urls })
  res.send(`
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
    ${assetManifest.css ? `<link rel="stylesheet" href="${assetManifest.css}">` : ''}
</head>

<body>
  <div id="root">${html}</div>
  ${assetManifest.js ? `<script src="${assetManifest.js}" defer crossorigin></script>` : ""}
</body>
</html>
  `)
})

app.listen(8081, () => console.log("监听端口: 8081，地址：http://localhost:8081"))