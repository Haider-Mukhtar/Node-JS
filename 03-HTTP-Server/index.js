const http = require("http");
const fs = require("fs");

// Create HTTP Server
const myServer = http.createServer(
  // Handler - Process incoming requestes
  (req, res) => {
    // console.log("New Req Received");
    // console.log(req);
    // console.log(req.headers);

    // log
    const log = `
      Date: ${Date.now()}, 
      New Request =>
        Req Location: ${req.headers.location},
        Req Host: ${req.headers.host}
        Req URL: ${req.url}
      ===============================================
    `
    fs.appendFile("log.txt", log, (err, data) => {
      // res.end("Log Saved...");

      switch (req.url) {
        case "/":
          res.end("Home")
          break
        case "/about":
          res.end("Abput")
          break
        default:
          res.end("404 - Not Found")
      }
    })

    // res.end("Hi There, this is your server at port 8000");
  }
);

// Need a PORT No to run the Server
myServer.listen(8000, () => {
  console.log("Server Start at PORT: 8000");
});
