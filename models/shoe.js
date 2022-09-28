const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shoeSchema = new Schema({
  brand: { type: Schema.Types.ObjectId, ref: "brand", required: true },
  model: { type: String, required: true, maxLength: 100 },
});

shoeSchema.virtual("url").get(function () {
  return `/brands/${this._id}`;
});

module.exports = mongoose.model("shoe", shoeSchema);
