import Joi from "joi";
import { generalFieldsValidation } from "../../middleware/validation.middleware.js";

export const authValidation = {
  // signup validation schema
  signup: Joi.object().keys({
    name: generalFieldsValidation.name.required(),
    email: generalFieldsValidation.email.required(),
    password: generalFieldsValidation.password.required(),
    countryFlag: generalFieldsValidation.countryFlag.required(),
    nationalId: generalFieldsValidation.nationalId.required(),
  }),

  // confirm email validation schema
  confirmEmail: Joi.object().keys({
    email: generalFieldsValidation.email.required(),
    otp: generalFieldsValidation.otpCode.required(),
  }),

  // resend OTP validation schema
  resendOtp: Joi.object().keys({
    email: generalFieldsValidation.email.required(),
  }),

  //   login validation schema
  login: Joi.object().keys({
    email: generalFieldsValidation.email.required(),
    password: generalFieldsValidation.password.required(),
  }),
};
