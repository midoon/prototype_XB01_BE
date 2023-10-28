import Joi from "joi";
import {
  AccessChatInterface,
  GroupChatInterface,
  RenameGroupInterface,
  UserManipulationInterface,
} from "../types/chat.type";

export const accessChatValidation = (payload: AccessChatInterface) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
  });

  return schema.validate(payload, { abortEarly: false });
};

export const createGroupChatValidation = (payload: GroupChatInterface) => {
  const schema = Joi.object({
    groupName: Joi.string().required(),
    users: Joi.string().required(),
  });

  return schema.validate(payload, { abortEarly: false });
};

export const renameGroupValidation = (payload: RenameGroupInterface) => {
  const schema = Joi.object({
    groupName: Joi.string().required(),
    chatId: Joi.string().required(),
  });

  return schema.validate(payload, { abortEarly: false });
};

export const userManipulationValidation = (
  payload: UserManipulationInterface
) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    chatId: Joi.string().required(),
  });

  return schema.validate(payload, { abortEarly: false });
};
