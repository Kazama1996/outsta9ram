const mongoose = require("mongoose");

const metadataSchema = new mongoose.Schema({
  path: String,
  originalname: String,
});

const MetaData = mongoose.model("MetaData", metadataSchema);

module.exports = MetaData;
