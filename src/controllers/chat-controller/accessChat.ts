import { Request, Response } from "express";
import { accessChatValidation } from "../../validations/chat.validation";
import Chat from "../../Models/chat.model";
import User from "../../Models/user.model";
import { ChatDataInterface } from "../../types/chat.type";
//@description     Create or fetch One to One Chat

const accessChat = async (req: Request, res: Response) => {
  try {
    const { error, value } = accessChatValidation(req.body);
    if (error) {
      throw new Error("Validation error");
    }
    const logedUser: any = res.locals.user;
    let isChat: any = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: logedUser._id } } },
        { users: { $elemMatch: { $eq: value.user_id } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");
    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
    if (isChat.length > 0) {
      return res.status(200).send({
        status_response: true,
        data: isChat[0],
      });
    }
    const chatData: ChatDataInterface = {
      chatName: "sender",
      isGroupChat: false,
      users: [logedUser._id, value.user_id],
    };
    const createdChat: any = await Chat.create(chatData);
    const FullChat: any = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );
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
