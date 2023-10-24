import User from "../Models/user.model";
import Chat from "../Models/chat.model";

export const findExistChat = async (
  logedUserId: string,
  recieveUserId: string
) => {
  let isChat: any = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: logedUserId } } },
      { users: { $elemMatch: { $eq: recieveUserId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  return isChat;
};

export const createChat = async (payload: any) => {
  return await Chat.create(payload);
};

export const findOneChatById = async (chatId: string) => {
  return await Chat.findOne({ _id: chatId }).populate("users", "-password");
};
