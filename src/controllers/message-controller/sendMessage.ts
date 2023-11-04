import { Request, Response } from "express";
import { createMessageValidation } from "../../validations/message.validation";
import { storeMessage } from "../../services/message.service";
import { StoreMessageInterface } from "../../types/message.type";
import { updateLatestMessageChate } from "../../services/chat.service";

const sendMessage = async (req: Request, res: Response) => {
  try {
    const { error, value } = createMessageValidation(req.body);
    if (error) throw new Error("Validation error");
    let newMessageData: StoreMessageInterface = {
      sender: res.locals.user._id,
      content: value.content,
      chat: value.chatId,
    };

    const message = await storeMessage(newMessageData);
    await updateLatestMessageChate(value.chatId, message);
    return res.status(200).send({
      status_response: true,
      data: message,
    });
  } catch (error: any) {
    return res.status(400).send({
      status_response: false,
      error: error.message,
    });
  }
};

export default sendMessage;
