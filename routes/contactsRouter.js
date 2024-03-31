import express from "express";
import controllers from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import { schemes } from "../models/contact.js";
import isValidId from "../helpers/isValidId.js";
import { authenticate } from "../helpers/authenticate.js";

const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} = controllers;

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAllContacts);

contactsRouter.get("/:id", authenticate, isValidId, getOneContact);

contactsRouter.delete("/:id", authenticate, isValidId, deleteContact);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(schemes.createContactSchema),
  createContact,
);

contactsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemes.updateContactSchema),
  updateContact,
);

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemes.updateFavoriteSchema),
  updateStatusContact,
);

export default contactsRouter;
