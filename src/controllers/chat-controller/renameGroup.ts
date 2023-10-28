import { Request, Response } from "express";
import { renameGroupValidation } from "../../validations/chat.validation";
import { renameGroupById } from "../../services/chat.service";

const renameGroup = async (req: Request, res: Response) => {
  try {
    const { error, value } = renameGroupValidation(req.body);
    if (error) throw new Error("Validation error");
    const updateGroup: any = await renameGroupById(
      value.groupName,
      value.chatId
    );
    if (!updateGroup) throw new Error("Chat not found");
    return res.status(200).send({
      status_response: true,
      data: updateGroup,
    });
  } catch (error: any) {
    return res.status(400).send({
      status_response: false,
      error: error.message,
    });
  }
};

export default renameGroup;
