import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../utils/jwt";
import { countToken } from "../services/user.service";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.headers.authorization?.replace(/^Bearer\s/, "");
    if (!accessToken) throw new Error();
    const tokenVerified: any = verifyJwt(accessToken);
    if (tokenVerified.expired) throw new Error();
    if (!tokenVerified.valid) throw new Error();
    res.locals.user = tokenVerified.decoded.payload;
    const countUserToken: number = await countToken(
      tokenVerified.decoded.payload._id
    );
    if (countUserToken !== 1) throw new Error();
    return next();
  } catch (error) {
    return res.status(403).send({
      status_response: false,
      message: "Forbidden",
    });
  }
};
