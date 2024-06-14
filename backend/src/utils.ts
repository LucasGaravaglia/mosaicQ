import crypto from "crypto";
import jwt from "jsonwebtoken";

export function hashPassword(password: string): string {
  return crypto.createHash("md5").update(password).digest("hex");
}

const privateKey = "mosaicqJwt";
const options = {
  expiresIn: "1h",
};

interface dataJwt {
  username: string;
  userId: string;
}

export const generateToken = (username: string, userId: string) =>
  jwt.sign({ username, userId }, privateKey, options);

export const verifyToken = (token: string | undefined): dataJwt => {
  if (!token) throw "Token inexistente";
  try {
    const decoded = jwt.verify(token, privateKey);
    return decoded as dataJwt;
  } catch (error) {
    console.error("Token inválido:", error);
    throw "Token inválido:" + error;
  }
};
