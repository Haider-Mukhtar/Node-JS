// npm install
const fs = require("fs");
const http = require("http");
const url = require("url");

const myServer = http.createServer(
  (req, res) => {

    const myurl = url.parse(req.url, true);
    console.log(myurl);

    // http://localhost:8000/about
    // Url {
    //   protocol: null,
    //   slashes: null,
    //   auth: null,
    //   host: null,
    //   port: null,
    //   hostname: null,
    //   hash: null,
    //   search: null,
    //   query: null,
    //   pathname: '/about',
    //   path: '/about',
    //   href: '/about'
    // }

    // http://localhost:8000/about?name=Haider
    // Parsing URL =>
    // search: '?name=Haider',
    // query: 'name=Haider',
    // pathname: '/about',
    // path: '/about?name=Haider',
    // href: '/about?name=Haider'

    switch (myurl.pathname) {
      case "/":
        res.end("Home")
        break
      case "/about":
        const username = myurl.query.myname
        res.end(`hii, ${username === undefined ? "there" : username}`)
        break
      default:
        res.end("404 - Not Found")
    }
  }
);

myServer.listen(8000, () => {
  console.log("Server Start at PORT: 8000");
});