import express from "express";
import controllers from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import { authSchema } from "../models/user.js";
import { authenticate } from "../helpers/authenticate.js";

const { register, login, logout, current } = controllers;

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(authSchema), register);
usersRouter.post("/login", validateBody(authSchema), login);
usersRouter.post("/logout", authenticate, logout);
usersRouter.get("/current", authenticate, current);

export default usersRouter;