import { Router } from "express";
import * as regestrationServ from "./services/regestration.service.js";
import { validationMiddleware } from "../../middleware/validation.middleware.js";
import { authValidation } from "./auth.validation.js";
import { login, refreshAccessToken } from "./services/login.service.js";
import { authenticationMiddleware } from "../../middleware/authentication.middleware.js";
export const authRouter = Router();

authRouter.post(
  "/signup",
  validationMiddleware(authValidation.signup),
  regestrationServ.signup
);

authRouter.patch(
  "/confirmEmail",
  validationMiddleware(authValidation.confirmEmail),
  regestrationServ.confirmEmail
);
authRouter.patch(
  "/resendOtp",
  validationMiddleware(authValidation.resendOtp),
  regestrationServ.resendOtp
);

authRouter.post("/login", validationMiddleware(authValidation.login), login);
authRouter.post(
  "/refreshAccessToken",
  authenticationMiddleware(["admin", "user"], "refresh"),
  refreshAccessToken
);
