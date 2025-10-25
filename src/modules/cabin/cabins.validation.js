import Joi from "joi";
import { generalFieldsValidation } from "../../middleware/validation.middleware.js";

export const cabinValidation = {
  createCabin: Joi.object().keys({
    name: generalFieldsValidation.name.required(),
    maxCapacity: generalFieldsValidation.number.required(),
    regularPrice: generalFieldsValidation.regularPrice.required(),
    discountedPrice: generalFieldsValidation.discountedPrice.required(),
    description: generalFieldsValidation.description.required(),
  }),
  deleteCabinById: Joi.object().keys({
    cabinId: generalFieldsValidation.id.required(),
  }),
  updateCabinById: Joi.object().keys({
    cabinId: generalFieldsValidation.id.required(),
  }),
};
