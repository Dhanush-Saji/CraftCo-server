const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    mobile:{
        type:Number,
        required:true,
        trim:true,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    isAdmin:{
      type:Boolean,
      default:false
    },
    email: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
    },
    district: {
      type: String,
    },
    state: {
      type: String,
      trim: true,
    },
    pincode: {
      type: Number,
      trim: true,
    },
  },
  { timestamps: true }
);

const Usermodal = mongoose.model("UserCollection", userSchema);

module.exports = {
  Usermodal,
};
