import { Request, Response } from "express";
import { fetchAllChat } from "../../services/chat.service";

const fetchChat = async (req: Request, res: Response) => {
  try {
    const allChat: any = await fetchAllChat(res.locals.user._id);
    return res.status(200).send({
      status_response: true,
      data: allChat,
    });
  } catch (error: any) {
    return res.status(400).send({
      status_response: false,
      error: error.message,
    });
  }
};

export default fetchChat;
