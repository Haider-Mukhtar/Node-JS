// HTTP Methods => GET, POST, PUT, PATCH, DELETE

const url = require("url");
const http = require("http");

const myServer = http.createServer(
  (req, res) => {

    console.log("Request Method:", req.method);

    const myURL = url.parse(req.url, true);

    switch (myURL.pathname) {
      case "/":
        if (req.method === "GET") {
          res.end("Home Page - Get Req")
        }
        break
      case "/signup":
        if (req.method === "GET") {
          res.end("Sign Up Page - Get Req")
        } else if (req.method === "POST") {
          res.end("Success - Post Req")
        }
        break
      default: 
        res.end("404 - Not Found")
    }
  }
);

myServer.listen(8000, () => {
  console.log("Server is running at Port 8000")
})