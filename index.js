const express = require("express");

const urlRoute = require("./routes/url_router");
const { connectToMongoDb } = require("./connection");
const URL = require("./models/url_model");
const PORT = 8001;

connectToMongoDb("mongodb://localhost:27017/short-url");
const app = express();

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => console.log("Server Started on PORT :", PORT));
