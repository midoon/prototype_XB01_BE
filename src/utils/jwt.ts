import jwt from "jsonwebtoken";

export const signJwt = (payload: object, expiresIn: string) => {
  const token: string = jwt.sign({ payload }, process.env.JWT_SECRET || "", {
    algorithm: "HS256",
    expiresIn: expiresIn,
  });

  return token;
};
