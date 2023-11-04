import User from "../Models/user.model";
import Message from "../Models/message.model";
import { StoreMessageInterface } from "../types/message.type";

export const storeMessage = async (payload: StoreMessageInterface) => {
  let message = await Message.create(payload);
  message = await message.populate("sender", "name pic");
  message = await message.populate("chat");
  message = await User.populate(message, {
    path: "chat.users",
    select: "name pic email",
  });

  return message;
};

export const fetchAllMessage = async (chatId: string) => {
  const message = await Message.find({ chat: chatId })
    .populate("sender", "name pic email")
    .populate("chat");

  return message;
};
