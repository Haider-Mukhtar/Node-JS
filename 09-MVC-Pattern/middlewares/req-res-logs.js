const fs = require("fs");

function logReqRes() {
  return (req, res, next) => {
    fs.appendFile(
      "logs",
      `\n${Date.now()}:${req.id} ${req.methode}: ${req.path}\n`,
      (err, data) => {
        next();
      }
    );
  }
};

module.exports = logReqRes;