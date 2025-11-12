const mongoose = require("mongoose");

// Connection
// "mongodb://127.0.0.1:27017/users-data"
async function connectNongoDB(url) {
  return mongoose.connect(url)
    .then(() => console.log("Mongo DB Connected.."))
    .catch((err) => console.log("Mongo DB Error:", err))
};

module.exports = connectNongoDB;