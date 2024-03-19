import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^\+?\(?[0-9+]+\)?\ ?[0-9+]+\ ?\-?[0-9+]+$/)
    .required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().regex(/^\+?\(?[0-9+]+\)?\ ?[0-9+]+\ ?\-?[0-9+]+$/),
});
