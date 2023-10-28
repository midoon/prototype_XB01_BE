import { Request, Response } from "express";
import { userManipulationValidation } from "../../validations/chat.validation";
import { addUserById } from "../../services/chat.service";

const addMemberGroup = async (req: Request, res: Response) => {
  try {
    const { error, value } = userManipulationValidation(req.body);
    if (error) throw new Error("Validation error");
    const addUser: any = await addUserById(value.chatId, value.userId);
    if (!addUser) throw new Error("Chat or member not found");
    return res.status(200).send({
      status_response: true,
      data: addUser,
    });
  } catch (error: any) {
    return res.status(400).send({
      status_response: false,
      error: error.message,
    });
  }
};

export default addMemberGroup;
