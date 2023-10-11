import { Request, Response } from "express";
import {
  countToken,
  findUserByEmail,
  storeToken,
  updateToken,
} from "../../services/user.service";
import { loginUserValidation } from "../../validations/user.validation";
import { checkPassword } from "../../utils/hash";
import { signJwt } from "../../utils/jwt";

const login = async (req: Request, res: Response) => {
  try {
    const { error, value } = loginUserValidation(req.body);
    if (error) throw new Error("Validation error");
    const user: any = await findUserByEmail(value.email);
    if (!user) {
      return res.status(404).send({
        status_response: false,
        message: "Email or password wrong",
      });
    }

    const isPasswordValid: boolean = checkPassword(
      value.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(404).send({
        status_response: false,
        message: "Email or password wrong",
      });
    }

    const dataToken: object = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    const refreshToken: string = signJwt(dataToken, "9d");
    const accessToken: string = signJwt(dataToken, "3d");

    const dataStoreRefreshToken = {
      refresh_token: refreshToken,
      user: user._id,
    };
    const counToken: number = await countToken(user._id);
    if (counToken === 1) {
      await updateToken(user._id, dataStoreRefreshToken);
    } else {
      await storeToken(dataStoreRefreshToken);
    }

    return res.status(200).send({
      status_response: true,
      data: {
        user_id: user._id,
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    });
  } catch (error: any) {
    return res.status(400).send({
      status_response: false,
      error: error.message,
    });
  }
};

export default login;
