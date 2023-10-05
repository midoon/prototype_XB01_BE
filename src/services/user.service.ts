import User from "../Models/user.model";
import UserInterface from "../types/user.type";

export const registerUser = async (payload: UserInterface) => {
  return await User.create(payload);
};
