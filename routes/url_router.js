const express = require("express");

const {
  generateShortUrl,
  totalClicksOnLinkAnalytics,
} = require("../controllers/url_controller");
const router = express.Router();

router.post("/", generateShortUrl);
router.get("/analytics/:shortId", totalClicksOnLinkAnalytics);

module.exports = router;
