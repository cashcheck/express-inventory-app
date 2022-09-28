const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shoeinstanceSchema = new Schema({
  shoe: { type: Schema.Types.ObjectId, ref: "shoe", required: true },
  price: { type: Number, required: true },
  colorway: { type: String, required: true },
  size: { type: Number, required: true },
  condition: {
    type: String,
    enum: ["new", "open-box", "used"],
    required: true,
  },
});

shoeinstanceSchema.virtual("url").get(function () {
  return `/catalog/${this._id}`;
});

module.exports = mongoose.model("shoeinstance", shoeinstanceSchema);
