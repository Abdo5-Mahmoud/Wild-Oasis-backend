import { asynHandler } from "../../../utils/res/error.res.js";
import * as dbServices from "../../../DB/db.service.js";
import { compareHash } from "../../../utils/security/hash.security.js";
import {
  generateToken,
  verifyToken,
} from "../../../utils/security/token.security.js";
import { successRes } from "../../../utils/res/success.res.js";
import { UserModel } from "../../../DB/models/user.model.js";
export const login = asynHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await dbServices.findOne({
    model: UserModel,
    filter: { email, isConfirmed: true },
  });

  if (!user) {
    return next(new Error("Invalid email or password", { cause: 400 }));
  }
  const isMatch = await compareHash({
    plainText: password,
    hashValue: user.password,
  });

  if (!isMatch) {
    return next(new Error("Invalid email or password", { cause: 400 }));
  }
  const accessToken = generateToken({
    payload: { id: user._id },
    signature: process.env.USER_ACCESS_TOKEN,
  });
  const refreshToken = generateToken({
    payload: { id: user._id },
    signature: process.env.USER_REFRESH_TOKEN,
  });

  return successRes({
    res,
    status: 200,
    message: "Login success",
    data: { accessToken, refreshToken },
  });
});

export const refreshAccessToken = asynHandler(async (req, res, next) => {
  const { user } = req;

  const accessToken = generateToken({
    payload: { id: user._id },
    signature: process.env.USER_ACCESS_TOKEN,
  });

  successRes({
    res,
    message: "Done",
    data: {
      accessToken,
    },
  });
});
