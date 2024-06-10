import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
