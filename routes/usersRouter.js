import express from "express";
import controllers from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import { authSchema, subscriptionSchema } from "../models/user.js";
import { authenticate } from "../helpers/authenticate.js";
import { upload } from "../helpers/upload.js";

const { register, login, logout, current, subscription, updateAvatar } =
  controllers;

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(authSchema), register);
usersRouter.post("/login", validateBody(authSchema), login);
usersRouter.post("/logout", authenticate, logout);
usersRouter.get("/current", authenticate, current);
usersRouter.patch(
  "/",
  authenticate,
  validateBody(subscriptionSchema),
  subscription,
);
usersRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar,
);

export default usersRouter;
