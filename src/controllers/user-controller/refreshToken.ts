import { Request, Response } from "express";
import { refreshTokenValidation } from "../../validations/user.validation";
import { signJwt, verifyJwt } from "../../utils/jwt";
import { countToken } from "../../services/user.service";

const refreshToken = async (req: Request, res: Response) => {
  try {
    const { error, value } = refreshTokenValidation(req.body);
    if (error) {
      throw new Error("Validation Error");
    }
    const refreshTokenVerified: any = verifyJwt(value.refresh_token);
    if (!refreshTokenVerified.decoded.payload) throw new Error();
    const countUserToken: any = await countToken(
      refreshTokenVerified.decoded.payload._id
    );
    if (countUserToken !== 1) throw new Error();
    const dataToken = {
      _id: refreshTokenVerified.decoded.payload._id,
      email: refreshTokenVerified.decoded.payload.email,
      username: refreshTokenVerified.decoded.payload.username,
    };
    const accessToken: string = signJwt(dataToken, "3d");
    return res.status(200).send({
      status_response: true,
      data: {
        access_token: accessToken,
      },
    });
  } catch (error: any) {
    return res.status(400).send({
      status_response: false,
      error: error.message,
    });
  }
};

export default refreshToken;
