import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    refersh_token: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Token = mongoose.model("Token", tokenSchema);

export default Token;
