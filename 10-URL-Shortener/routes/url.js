const express = require("express");

const router = express.Router();
const { generateNewShortURL, getNewShortURL, getAnalytics } = require("../controllers/url");

router.post("/", generateNewShortURL);

router.get("/:shortID", getNewShortURL);

router.get("/analytics/:shortID", getAnalytics);

module.exports = router;