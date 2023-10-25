import Joi from "joi";
import { AccessChatInterface, GroupChatInterface } from "../types/chat.type";

export const accessChatValidation = (payload: AccessChatInterface) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
  });

  return schema.validate(payload, { abortEarly: false });
};

export const createGroupChatValidation = (payload: GroupChatInterface) => {
  const schema = Joi.object({
    group_name: Joi.string().required(),
    users: Joi.string().required(),
  });

  return schema.validate(payload, { abortEarly: false });
};
