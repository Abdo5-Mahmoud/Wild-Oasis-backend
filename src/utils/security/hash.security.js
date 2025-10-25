import bcrypt from "bcrypt";
export const generateHash = async ({ plainText = "", salt = 10 }) => {
  const hash = await bcrypt.hash(plainText, parseInt(salt));
  return hash;
};

export const compareHash = async ({ plainText = "", hashValue = "" }) => {
  const match = await bcrypt.compare(plainText, hashValue);
  return match;
};
