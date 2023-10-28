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

export const fetchAllChat = async (logedUserId: string) => {
  let allChat: any = await Chat.find({
    users: { $elemMatch: { $eq: logedUserId } },
  })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });
  allChat = await User.populate(allChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  return allChat;
};

export const findOneGroupChat = async (groupChatId: string) => {
  return await Chat.findOne({ _id: groupChatId })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
};

export const renameGroupById = async (groupName: string, chatId: string) => {
  return await Chat.findByIdAndUpdate(
    chatId,
    { chatName: groupName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
};
