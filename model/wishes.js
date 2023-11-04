const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  userID: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "userInfo",
  },
  wishes: {
    type: String,
    required: require,
  },
});

module.exports = mongoose.model("user", userSchema, "userList");
