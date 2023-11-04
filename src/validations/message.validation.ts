import Joi from "joi";
import { CreateMessageInterface } from "../types/message.type";

export const createMessageValidation = (payload: CreateMessageInterface) => {
  const schema = Joi.object({
    chatId: Joi.string().required(),
    content: Joi.string().required(),
  });

  return schema.validate(payload, { abortEarly: false });
};
