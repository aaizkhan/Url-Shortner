const express = require("express");
const { connectToMongoDb } = require("./connection");

const URL = require("./models/url_model");

const cookieParser = require("cookie-parser");
const urlRoute = require("./routes/url_router");
const userRoute = require("./routes/user_route");

const {
  checkAuthentication,
  restrictTo,
} = require("./middlewares/auth_middleware");

const PORT = 8001;

connectToMongoDb("mongodb://localhost:27017/short-url");
const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(checkAuthentication);
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use("/url", restrictTo(["NORMAL"]), urlRoute);
app.use("/user", userRoute);
app.use("/login", userRoute);

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
