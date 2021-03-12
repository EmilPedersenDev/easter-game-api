const db = require("../models");

const connectDb = () => {
  db.mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to db!");
    })
    .catch((err) => {
      console.error("Cannot connect to db", err);
      process.exit();
    });
};

module.exports = connectDb;
