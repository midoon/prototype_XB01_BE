import { Request, Response } from "express";
import { userManipulationValidation } from "../../validations/chat.validation";
import { removeUserById } from "../../services/chat.service";

const removeMemberGroup = async (req: Request, res: Response) => {
  try {
    const { error, value } = userManipulationValidation(req.body);
    if (error) throw new Error("Validation error");
    const removed: any = await removeUserById(value.chatId, value.userId);
    if (!removed) throw new Error("Chat or member not found");
    return res.status(200).send({
      status_response: true,
      data: removed,
    });
  } catch (error: any) {
    return res.status(400).send({
      status_response: false,
      error: error.message,
    });
  }
};

export default removeMemberGroup;
