const mongoose = require("mongoose");
const dotenv = require('dotenv').config()
const MONGO = process.env.MONGO
const connection = mongoose.connect(`${MONGO}`)

module.exports = {
  connection
};