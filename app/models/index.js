const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);
db.topic = require("./topic.model.js");
db.question = require("./question.model.js");
db.answer = require("./answer.model.js");

module.exports = db;
