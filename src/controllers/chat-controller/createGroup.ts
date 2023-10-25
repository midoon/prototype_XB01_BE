import { Request, Response } from "express";
import { createGroupChatValidation } from "../../validations/chat.validation";
import { createChat, findOneGroupChat } from "../../services/chat.service";

const createGroup = async (req: Request, res: Response) => {
  try {
    const { error, value } = createGroupChatValidation(req.body);
    if (error) throw new Error("Validation errror");
    // req body users dari client bertipe json.stringify
    let users: any = JSON.parse(value.users);
    console.log(users);
    if (users.length < 2) throw new Error("More than 2 users are required");
    users.push(res.locals.user);

    const groupChatData: object = {
      chatName: value.group_name,
      users: users,
      isGroupChat: true,
      groupAdmin: res.locals.user,
    };

    const groupChat: any = await createChat(groupChatData);
    const fullGroupChat: any = await findOneGroupChat(groupChat._id);
    return res.status(200).send({
      status_response: true,
      data: fullGroupChat,
    });
  } catch (error: any) {
    return res.status(400).send({
      status_response: false,
      error: error.message,
    });
  }
};

export default createGroup;
