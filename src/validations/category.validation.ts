import Joi from "joi";

export const carCategoryValidationSchema = Joi.object({
    name: Joi.string().required().min(3).max(50).messages({
      "string.empty": "Category name is required.",
      "string.min": "Category name must be at least 3 characters.",
      "string.max": "Category name must not exceed 50 characters.",
    }),
    createdBy: Joi.string().required().messages({
      "string.empty": "CreatedBy field is required.",
    }),
  });
  