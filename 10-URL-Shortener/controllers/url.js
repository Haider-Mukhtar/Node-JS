const { nanoid } = require('nanoid');
const URL = require("../models/url");

const generateNewShortURL = async (req, res) => {
  const body = req.body;
  if (!body || !body.url) {
    return res.status(400).json({
      success: false,
      message: "url is required.",
      statusCode: res.statusCode
    })
  }
  const shortID = nanoid(8);
  if (!shortID) {
    return res.status(500).json({
      success: false,
      message: "failed to generate short id.",
      statusCode: res.statusCode
    })
  }
  const result = await URL.create({
    shortID: shortID,
    redirectURL: body.url,
    visitHistory: []
  })
  return res.status(200).json({
    success: true,
    message: "short url generated successfully.",
    statusCode: res.statusCode,
    data: result
  })
};

const getNewShortURL = async (req, res) => {
  const shortID = req.params.shortID;
  const result = await URL.findOneAndUpdate({
    shortID,
  }, {
    $push: {
      visitHistory: {
        timestamp: Date.now(),
      }
    }
  })
  res.redirect(result.redirectURL);
};

const getAnalytics = async (req, res) => {
  const shortID = req.params.shortID;
  const result = await URL.findOne({ shortID });
  return res.status(200).json({
    success: true,
    message: "successfully get the analytics.",
    statusCode: res.statusCode,
    data: {
      totalVisits: result.visitHistory.length,
      analytics: result.visitHistory
    }
  })
};

module.exports = {
  generateNewShortURL,
  getNewShortURL,
  getAnalytics,
};