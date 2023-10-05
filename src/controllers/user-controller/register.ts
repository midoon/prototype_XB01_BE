import { Request, Response } from "express";
import User from "../../Models/user.model";
import { registerUserValidation } from "../../validations/user,validation";
import { registerUser } from "../../services/user.service";
import { hashPassword } from "../../utils/hash";

const register = async (req: Request, res: Response) => {
  try {
    const { error, value } = registerUserValidation(req.body);
    if (error) {
      throw new Error("Validation Error");
    }
    value.password = `${hashPassword(value.password)}`;
    const user = await registerUser(value);
    return res.status(201).send({
      status_response: true,
      data: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
      },
    });
  } catch (error: any) {
    return res.status(400).send({
      status_response: false,
      error: error.message,
    });
  }
};

export default register;
