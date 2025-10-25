import Joi from "joi";

export const generalFieldsValidation = {
  /* all the fields that might be using in validation */
  //for ** User **
  name: Joi.string().min(3).max(30).messages({
    "string.base": "Name must be a string.",
    "string.empty": "Name is required.",
    "string.min": "Name must be at least 3 characters long.",
    "string.max": "Name must not exceed 30 characters.",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 3,
      tlds: { allow: ["com", "net", "org"] },
    })
    .messages({
      "string.empty": "Email is required.",
      "string.email": "Email must be a valid address with .com, .net, or .org.",
      "any.required": "Email field is required.",
    }),

  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).{8,}$/)
    .messages({
      "string.empty": "Password is required.",
      "string.pattern.base":
        "Password must be at least 8 characters long and include uppercase, lowercase, and a number or symbol.",
      "any.required": "Password field is required.",
    }),

  role: Joi.string().valid("admin", "user").messages({
    "any.only": "Role must be either 'admin' or 'user'.",
  }),

  countryFlag: Joi.string().min(2).max(100).messages({
    "string.min": "Country flag must be at least 2 characters.",
    "string.max": "Country flag must not exceed 100 characters.",
  }),

  nationalId: Joi.string().min(6).max(20).messages({
    "string.min": "National ID must be at least 6 characters.",
    "string.max": "National ID must not exceed 20 characters.",
  }),

  otpCode: Joi.string().length(4).messages({
    "string.length": "OTP code must be exactly 4 characters.",
  }),

  // ** Cabins **
  regularPrice: Joi.number().min(0).messages({
    "number.base": "Regular price must be a number.",
    "number.min": "Regular price cannot be negative.",
  }),

  discountedPrice: Joi.number().min(0).max(Joi.ref("regularPrice")).messages({
    "number.base": "Discounted price must be a number.",
    "number.min": "Discounted price cannot be negative.",
    "number.max": "Discounted price cannot exceed regular price.",
  }),

  description: Joi.string().min(10).max(500).messages({
    "string.min": "Description must be at least 10 characters.",
    "string.max": "Description must not exceed 500 characters.",
  }),

  // ** Bookings **
  id: Joi.string().length(24).messages({
    "string.length": "ID must be a valid 24-character Mongo ObjectId.",
  }),

  date: Joi.date().messages({
    "date.base": "Date must be a valid date format.",
  }),

  capinPrice: Joi.number().min(0).messages({
    "number.min": "Cabin price cannot be negative.",
  }),

  status: Joi.string().valid("booked", "cancelled", "completed").messages({
    "any.only": "Status must be one of: booked, cancelled, or completed.",
  }),

  number: Joi.number().min(1).messages({
    "number.base": "Value must be a number.",
    "number.min": "Number must be at least 1.",
  }),

  string: Joi.string().messages({
    "string.base": "Value must be a string.",
  }),

  boolean: Joi.boolean().messages({
    "boolean.base": "Value must be true or false.",
  }),
};

export const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const inputs = { ...req.body, ...req.params, ...req.query };
    if (req.file || req.files?.length) {
      inputs.file = { ...req.files, ...req.file };
    }
    const validationError = schema.validate(inputs, {
      abortEarly: false,
    });
    if (validationError.error) {
      const error = new Error("there is error in validation");
      error.cause = 400;
      error.details = [...validationError.error.details];
      error.stack = error.stack;
      return next(error);
    }
    next();
  };
};
