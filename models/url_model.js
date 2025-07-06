const mongoose = require("mongoose");

const urlSchema = mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timeStamp: { type: Number },
      },
    ],
  },
  { timeStamp: true }
);

const UrlModel = mongoose.model("url", urlSchema);

module.exports = UrlModel;
