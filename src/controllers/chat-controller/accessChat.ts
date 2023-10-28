import { Request, Response } from "express";
import { accessChatValidation } from "../../validations/chat.validation";
import { ChatDataInterface } from "../../types/chat.type";
import {
  createChat,
  findExistChat,
  findOneChatById,
} from "../../services/chat.service";
//@description     Create or fetch One to One Chat

const accessChat = async (req: Request, res: Response) => {
  try {
    const { error, value } = accessChatValidation(req.body);
    if (error) {
      throw new Error("Validation error");
    }
    const logedUser: any = res.locals.user;
    let isChat: any = await findExistChat(logedUser._id, value.userId);
    if (isChat.length > 0) {
      return res.status(200).send({
        status_response: true,
        data: isChat[0],
      });
    }
    const chatData: ChatDataInterface = {
      chatName: "sender",
      isGroupChat: false,
      users: [logedUser._id, value.userId],
    };
    const createdChat: any = await createChat(chatData);
    const FullChat: any = await findOneChatById(createdChat._id);
    return res.status(200).send({
      status_response: true,
      data: FullChat,
    });
  } catch (error: any) {
    return res.status(400).send({
      status_response: false,
      error: error.message,
    });
  }
};

export default accessChat;
