import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    default: [],
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  photo: {
    type: String,
  },
}, { timestamps: true });

const userModel = mongoose.model("Member", memberSchema);
export default userModel;
