import { Router } from "express";
import { validationMiddleware } from "../../middleware/validation.middleware.js";
import { authenticationMiddleware } from "../../middleware/authentication.middleware.js";
import {
  createBooking,
  deleteBookingById,
  getAll,
  updateBookingById,
} from "./services/bookings.service.js";
import { bookingValidation } from "./booking.validation.js";

export const bookingsRouter = Router();

bookingsRouter.get(
  "/",
  authenticationMiddleware(["admin"]),
  validationMiddleware(bookingValidation.getAll),
  getAll
);
bookingsRouter.get(
  "/user/:bookingId",
  authenticationMiddleware(["admin"]),
  validationMiddleware(bookingValidation.getUserBooking),
  getAll
);
bookingsRouter.post(
  "/createBooking",
  authenticationMiddleware(),
  validationMiddleware(bookingValidation.createBooking),
  createBooking
);
bookingsRouter.put(
  "/:bookingId",
  authenticationMiddleware(),
  validationMiddleware(bookingValidation.updateBoking),
  updateBookingById
);
bookingsRouter.delete(
  "/:bookingId",
  authenticationMiddleware(),
  validationMiddleware(bookingValidation.delteBooking),
  deleteBookingById
);
