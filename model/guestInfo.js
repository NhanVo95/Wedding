const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  code: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: true,
  },
  guestOf: {
    type: String,
    require: true,
    default: "NhanVo",
  },
});

module.exports = mongoose.model("guestInfo", userInfoSchema, "guestInfoList");
