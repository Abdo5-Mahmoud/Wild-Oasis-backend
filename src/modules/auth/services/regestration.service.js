import { emailEvent } from "../../../utils/events/email.events.js";
import { asynHandler } from "../../../utils/res/error.res.js";
import * as dbService from "../../../DB/db.service.js";
4;
import { UserModel } from "../../../DB/models/user.model.js";
import { compareHash } from "../../../utils/security/hash.security.js";
import { successRes } from "../../../utils/res/success.res.js";

export const signup = asynHandler(async (req, res, next) => {
  const userData = req.body;
  const isUserFound = await dbService.findOne({
    model: UserModel,
    filter: { email: userData.email },
  });

  if (isUserFound) {
    return next(new Error("Email already exists", { cause: 409 }));
  }

  await dbService.create({ model: UserModel, data: userData });

  emailEvent.emit("sendConfimrmEmailOtp", {
    email: userData.email,
  });

  return successRes({
    res,
    statusCode: 201,
    message: "User created successfully",
    data: { user: { name: userData.name, email: userData.email } },
  });
});

export const confirmEmail = asynHandler(async (req, res, next) => {
  const { email, otp } = req.body;
  const user = await dbService.findOne({
    model: UserModel,
    filter: { email },
  });

  if (!user) return next(new Error("user not found", { cause: 404 }));

  if (user.isConfirmed) {
    return next(new Error("already Confirmed", { cause: 409 }));
  }

  const isOtpValid = compareHash({
    plaintText: otp,
    hashValue: user.confirmEmailOtp,
  });

  if (!isOtpValid) {
    return next(new Error("Invalid OTP", { cause: 400 }));
  }

  if (user.otpExp < Date.now()) {
    return next(new Error("OTP expired", { cause: 400 }));
  }
  await dbService.findByIdAndUpdate({
    model: UserModel,
    id: user._id,
    data: { isConfirmed: true, confirmEmailOtp: null, otpExp: null },
  });

  return successRes({
    res,
    message: "Email confirmed successfully",
    statusCode: 200,
  });
});

export const resendOtp = asynHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await dbService.findOne({
    model: UserModel,
    filter: { email },
  });
  if (!user) return next(new Error("user not found", { cause: 404 }));
  if (user.isConfirmed) {
    return next(new Error("already Confirmed", { cause: 409 }));
  }

  emailEvent.emit("sendConfimrmEmailOtp", {
    email: user.email,
  });

  return successRes({
    res,
    message: "OTP resent successfully",
    statusCode: 200,
  });
});
