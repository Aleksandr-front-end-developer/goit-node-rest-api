import express from "express";
import constrollers from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import { sсhemes } from "../models/contact.js";
import isValidId from "../helpers/isValidId.js";

const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} = constrollers;

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post(
  "/",
  validateBody(sсhemes.createContactSchema),
  createContact,
);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(sсhemes.updateContactSchema),
  updateContact,
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(sсhemes.updateFavoriteSchema),
  updateStatusContact,
);

export default contactsRouter;
