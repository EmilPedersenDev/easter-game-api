const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.DB_URL;
db.users = require("./users")(mongoose);

module.exports = db;
