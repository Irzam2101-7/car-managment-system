import Joi from "joi";

export const carValidationSchema = Joi.object({
  registrationNumber: Joi.string()
    .required()
    .min(3)
    .max(15)
    .messages({
      'string.empty': 'Registration number is required.',
      'string.min': 'Registration number must be at least 3 characters.',
      'string.max': 'Registration number must not exceed 15 characters.',
    }),
  make: Joi.string()
    .required()
    .min(2)
    .max(50)
    .messages({
      'string.empty': 'Car make is required.',
      'string.min': 'Car make must be at least 2 characters.',
      'string.max': 'Car make must not exceed 50 characters.',
    }),
  model: Joi.string()
    .required()
    .min(2)
    .max(50)
    .messages({
      'string.empty': 'Car model is required.',
      'string.min': 'Car model must be at least 2 characters.',
      'string.max': 'Car model must not exceed 50 characters.',
    }),
  color: Joi.string()
    .required()
    .min(3)
    .max(20)
    .messages({
      'string.empty': 'Car color is required.',
      'string.min': 'Car color must be at least 3 characters.',
      'string.max': 'Car color must not exceed 20 characters.',
    }),
  category: Joi.string()
    .required()
    .min(3)
    .max(20)
    .messages({
      'string.empty': 'Car category is required.',
      'string.min': 'Car category must be at least 3 characters.',
      'string.max': 'Car category must not exceed 20 characters.',
    }),
});
