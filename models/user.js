import { Schema, model } from "mongoose";
import handleMongooseError from "../helpers/handleMongooseError.js";
import Joi from "joi";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false },
);

export const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

userSchema.post("save", handleMongooseError);

export const User = model("user", userSchema);
