const express = require("express");

const urlRouter = require("./routes/url");
const connectMongoDB = require("./mongo-connection");
const logReqRes = require("./middlewares/req-res-logs");

const app = express();
const PORT = 8000;

connectMongoDB("mongodb://127.0.0.1:27017/short-urls");

app.use(express.urlencoded({
  extended: false
}));
app.use(logReqRes());

app.use("/api/url", urlRouter);

app.listen(PORT, () => {
  console.log("Server running at Port:", PORT);
});