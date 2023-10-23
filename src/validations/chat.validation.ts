import Joi from "joi";
import { AccessChatInterface } from "../types/chat.type";

export const accessChatValidation = (payload: AccessChatInterface) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
  });

  return schema.validate(payload, { abortEarly: false });
};
