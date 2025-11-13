const mongoose = require("mongoose");

async function connectMongoDB(url) {
  return mongoose.connect(url)
    .then(() => console.log("Mongo DB Connected.."))
    .catch((err) => console.log("Mongo DB Error:", err))
};

module.exports = connectMongoDB;