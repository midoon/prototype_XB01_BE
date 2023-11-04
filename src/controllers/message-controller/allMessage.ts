import { Request, Response } from "express";
import { fetchAllMessage } from "../../services/message.service";

const allMessage = async (req: Request, res: Response) => {
  try {
    const message = await fetchAllMessage(req.params.chatId);
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

export default allMessage;
