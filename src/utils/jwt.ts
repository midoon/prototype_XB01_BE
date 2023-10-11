import "dotenv/config";
import jwt from "jsonwebtoken";

export const signJwt = (payload: object, expiresIn: string) => {
  const token: string = jwt.sign({ payload }, process.env.JWT_SECRET || "", {
    algorithm: "HS256",
    expiresIn: expiresIn,
  });

  return token;
};

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt is expired or not eligible to use",
      decoded: null,
    };
  }
};
