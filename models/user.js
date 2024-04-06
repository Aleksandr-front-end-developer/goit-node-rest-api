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
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
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
export const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});
export const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

userSchema.post("save", handleMongooseError);

export const User = model("user", userSchema);
