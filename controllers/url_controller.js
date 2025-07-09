const { nanoid } = require("nanoid");
const URL = require("../models/url_model");

async function generateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "Url is Required" });
  const shortID = nanoid(15);
  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    vistHistory: [],
    createdBy: req.user._id,
  });
  return res.json({ id: shortID });
}

async function totalClicksOnLinkAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClick: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { generateShortUrl, totalClicksOnLinkAnalytics };
