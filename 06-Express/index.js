// Express - FrameWork
const express = require("express");
const http = require("http");

// Initialize an App - a handler function
const app = express();

app.get("/", (req, res) => {
  res.send("Hello,  Home Page")
});

app.get("/about", (req, res) => {
  res.send("About page." + "Hello, " + req.query.name)
})

app.get("signup", (req, res) => {
  res.send("Sign Up Page")
})

// const myServer = http.createServer(app);

// myServer.listen(8000, () => {
//   console.log("Server running at Port: 8000");
// });
  
app.listen(8000, () => {
  console.log("Server running at Port: 8000");
});