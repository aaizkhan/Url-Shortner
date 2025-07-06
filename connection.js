const mongoose = require("mongoose");

async function connectToMongoDb(url) {
  return mongoose.connect(url).then(() => console.log("MongoDb Connected"));
}

module.exports = {
  connectToMongoDb,
};
