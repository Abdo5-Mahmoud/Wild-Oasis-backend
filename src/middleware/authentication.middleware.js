import { decodeToken, verifyToken } from "../utils/security/token.security.js";
import * as dbServices from "../DB/db.service.js";
import { UserModel } from "../DB/models/user.model.js";

export const authenticationMiddleware = (tokenType = ["user", "admin"]) => {
  return async (req, res, next) => {
    const { authorization } = req.headers;
    try {
      const decoded = await decodeToken({ authorization, next });
      const user = await dbServices.findOne({
        model: UserModel,
        filter: { _id: decoded.id },
      });

      if (!tokenType.includes(user.role))
        return next(new Error("Unauthorized", { cause: 401 }));

      req.user = user;
      next();
      // res.send("ok");
    } catch (err) {
      // console.log(err);
      return next(new Error("Unauthorized", { cause: 401 }));
    }
  };
};
