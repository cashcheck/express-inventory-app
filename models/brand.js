const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  name: { type: String, required: true },
});

brandSchema.virtual("url").get(function () {
  return `/brands/${this._id}`;
});

module.exports = mongoose.model("brand", brandSchema);
