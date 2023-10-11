import Joi from "joi";
import UserInterface from "../types/user.type";
import TokenInterface from "../types/token.type";

export const registerUserValidation = (payload: UserInterface) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schema.validate(payload, { abortEarly: false });
};

export const loginUserValidation = (payload: UserInterface) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schema.validate(payload, { abortEarly: false });
};

export const refreshTokenValidation = (payload: TokenInterface) => {
  const schema = Joi.object({
    refresh_token: Joi.string().required(),
  });

  return schema.validate(payload, { abortEarly: false });
};
