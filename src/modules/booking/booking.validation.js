import Joi from "joi";
import { generalFieldsValidation } from "../../middleware/validation.middleware.js";

export const bookingValidation = {
  getAll: Joi.object().keys({
    userId: generalFieldsValidation.id,
    cabinId: generalFieldsValidation.id,
    status: generalFieldsValidation.string.valid(
      "pending",
      "confirmed",
      "cancelled"
    ),
    isPaid: generalFieldsValidation.boolean,
    numGuests: generalFieldsValidation.number,
    startDate: generalFieldsValidation.date,
    endDate: generalFieldsValidation.date,
  }),
  getUserBooking: Joi.object().keys({
    cabinId: generalFieldsValidation.id.required(),
  }),
  createBooking: Joi.object().keys({
    cabinId: generalFieldsValidation.id.required(),
    startDate: generalFieldsValidation.date.required(),
    endDate: generalFieldsValidation.date.required(),
    numNights: generalFieldsValidation.number.required(),
    numGuests: generalFieldsValidation.number.required(),
    cabinPrice: generalFieldsValidation.number.required(),
    extrasPrice: generalFieldsValidation.number.required(),
    totalPrice: generalFieldsValidation.number.required(),
    isPaid: generalFieldsValidation.boolean.required(),
    hasBreakfast: generalFieldsValidation.boolean,
    status: generalFieldsValidation.string.valid(
      "pending",
      "confirmed",
      "cancelled"
    ),
    observations: generalFieldsValidation.string,
  }),
  updateBoking: Joi.object().keys({
    bookingId: generalFieldsValidation.id.required(),
    startDate: generalFieldsValidation.date,
    endDate: generalFieldsValidation.date,
    numNights: generalFieldsValidation.number,
    numGuests: generalFieldsValidation.number,
    cabinPrice: generalFieldsValidation.number,
    extrasPrice: generalFieldsValidation.number,
    totalPrice: generalFieldsValidation.number,
    isPaid: generalFieldsValidation.boolean,
    hasBreakfast: generalFieldsValidation.boolean,
    status: generalFieldsValidation.string.valid(
      "pending",
      "confirmed",
      "cancelled"
    ),
    observations: generalFieldsValidation.string,
  }),
  delteBooking: Joi.object().keys({
    bookingId: generalFieldsValidation.id.required(),
  }),
};
