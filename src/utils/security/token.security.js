import jwt from "jsonwebtoken";

export const generateToken = ({
  payload = "",
  signature,
  expiresIn = "1d",
}) => {
  const token = jwt.sign(payload, signature, { expiresIn });
  return token;
};

export const verifyToken = ({ token = "", signature = "" }) => {
  const decoded = jwt.verify(token, signature);
  return decoded;
};

export const decodeToken = async ({ authorization = "", next, tokenType }) => {
  //
  try {
    if (!authorization || !authorization.startsWith("Barear ")) {
      return next(new Error("Unauthorized", { cause: 401 }));
    }
    const token = authorization.split(" ")[1];

    const decoded = verifyToken({
      token,
      signature:
        tokenType == "access"
          ? process.env.USER_ACCESS_TOKEN
          : process.env.USER_REFRESH_TOKEN,
    });
    // console.log(decoded);

    if (decoded.exp * 1000 < Date.now()) {
      return next(new Error("Token expired", { cause: 401 }));
    }
    return decoded;
  } catch (err) {
    console.log(err);
    return next(new Error("Unauthorized", { cause: 401 }));
  }
};
