import Joi from 'joi';

export const signupSchema = Joi.object({
  username: Joi.string().required().min(3).max(50).messages({
    'string.empty': 'Username is required.',
    'string.min': 'Username should have at least 3 characters.',
    'string.max': 'Username should not exceed 50 characters.',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Please provide a valid email.',
  })
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required.",
      "string.email": "Please provide a valid email address.",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required.",
}),
});