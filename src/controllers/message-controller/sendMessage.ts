import "dotenv/config";
import { Request, Response } from "express";
import { createMessageValidation } from "../../validations/message.validation";
import { storeMessage } from "../../services/message.service";
import { StoreMessageInterface } from "../../types/message.type";
import { updateLatestMessageChate } from "../../services/chat.service";

import axios from "axios";

const sendMessage = async (req: Request, res: Response) => {
  try {
    const { error, value } = createMessageValidation(req.body);
    if (error) throw new Error("Validation error");
    const ML_BASE_URL: string = process.env.ML_URL || "";
    const sentimentDataRes = await axios.post(`${ML_BASE_URL}/sentiment`, {
      text: value.content,
    });

    let newMessageData: StoreMessageInterface = {
      sender: res.locals.user._id,
      content: value.content,
      chat: value.chatId,
      sentiment: sentimentDataRes.data.label,
      accuracy: sentimentDataRes.data.score,
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
