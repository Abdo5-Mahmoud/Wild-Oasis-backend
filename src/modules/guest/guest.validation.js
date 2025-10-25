import Joi from "joi";
import { generalFieldsValidation } from "../../middleware/validation.middleware.js";

export const guestValidation = {
  getGuest: Joi.object().keys({
    guestId: generalFieldsValidation.id.required(),
  }),

  updateGuestProfile: Joi.object().keys({
    guestId: generalFieldsValidation.id.required(),
    name: generalFieldsValidation.name,
    email: generalFieldsValidation.email,
    password: generalFieldsValidation.password,
    countryFlag: generalFieldsValidation.countryFlag,
    nationalId: generalFieldsValidation.nationalId,
  }),
};
