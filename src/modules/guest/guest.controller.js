import { Router } from "express";
import { authenticationMiddleware } from "../../middleware/authentication.middleware.js";
import {
  deleteGuest,
  getGuests,
  updateGuestProfile,
} from "./services/guest.service..js";
import { validationMiddleware } from "../../middleware/validation.middleware.js";
import { guestValidation } from "./guest.validation.js";

export const guestRouter = Router();

guestRouter.get(
  "/:guestId",
  authenticationMiddleware(["admin"]),
  validationMiddleware(guestValidation.getGuest),
  getGuests
);
guestRouter.put(
  "/:guestId",
  authenticationMiddleware(["admin"]),
  validationMiddleware(guestValidation.updateGuestProfile),
  updateGuestProfile
);
guestRouter.delete(
  "/:guestId",
  authenticationMiddleware(["admin"]),
  validationMiddleware(guestValidation.getGuest),
  deleteGuest
);
