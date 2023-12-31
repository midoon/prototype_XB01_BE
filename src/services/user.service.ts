import TokenInterface from "../types/token.type";
import User from "../Models/user.model";
import UserInterface from "../types/user.type";
import Token from "../Models/token.model";

export const registerUser = async (payload: UserInterface) => {
  return await User.create(payload);
};

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email: email });
};

export const storeToken = async (payload: TokenInterface) => {
  return await Token.create(payload);
};

export const countToken = async (userId: string) => {
  return await Token.count({ user: userId });
};

export const updateToken = async (userId: string, payload: TokenInterface) => {
  return await Token.updateOne({ user: userId }, payload);
};

export const deleteToken = async (userId: string) => {
  return await Token.deleteOne({ user: userId });
};

export const findAllUser = async (keyword: object, logedUid: string) => {
  return await User.find(keyword)
    .find({ _id: { $ne: logedUid } })
    .select("-password");
};
