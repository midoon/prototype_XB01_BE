import { Request, Response } from "express";
import { countToken, deleteToken } from "../../services/user.service";

const logout = async (req: Request, res: Response) => {
  try {
    const user: any = res.locals.user;
    const countTokenUser = await countToken(user._id);
    if (countTokenUser !== 1) throw new Error("Not authorized");
    await deleteToken(user._id);
    return res.status(200).send({
      status_response: true,
    });
  } catch (error: any) {
    return res.status(400).send({
      status_response: false,
      error: error.message,
    });
  }
};

export default logout;
