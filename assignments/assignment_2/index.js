const http = require("http");
const fs = require("fs");
fs.writeFileSync("index.html", "<h1>Hello World</h1>");
//process.env.PORT = 4000;
http
  .createServer(function (req, res) {
    const data = fs.readFileSync("index.html");
    if (req.url == "/") {
      res.writeHead(200, { "Content-type": "text/html" });
      res.write(data.toString());
      res.end();
    }
  })
  .listen(process.env.PORT || 8080);
console.log(process.env);
