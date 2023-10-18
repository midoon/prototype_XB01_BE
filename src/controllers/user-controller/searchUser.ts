import { Request, Response } from "express";
import { findAllUser } from "../../services/user.service";

const searchUser = async (req: Request, res: Response) => {
  try {
    const keyword: object = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await findAllUser(keyword, res.locals.user._id);
    return res.status(200).send({
      status_response: true,
      data: users,
    });
  } catch (error: any) {
    return res.status(400).send({
      status_response: false,
      error: error.message,
    });
  }
};

export default searchUser;
