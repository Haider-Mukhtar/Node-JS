const express = require("express");

const userRouter = require("./routes/user");
const connectNongoDB = require("./connection");
const logReqRes = require("./middlewares/req-res-logs");

const app = express();
const PORT = 8000;

// Connection
connectNongoDB("mongodb://127.0.0.1:27017/users-data");

// Middlewares
app.use(express.urlencoded({
  extended: false
}));
app.use(logReqRes());

// Routes
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log("Server running at Port:", PORT);
});