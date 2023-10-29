import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import User from "../src/Models/user.model";
import { hashPassword } from "../src/utils/hash";

export const connectMongoServerTest = async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
};

export const disconnectMongoServerTest = async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
};

export const createUser = async () => {
  await User.create({
    email: "test1@gmail.com",
    username: "tets1",
    password: `${hashPassword("12345678")}`,
  });

  await User.create({
    email: "test2@gmail.com",
    username: "tets2",
    password: `${hashPassword("12345678")}`,
  });

  await User.create({
    email: "test3@gmail.com",
    username: "tets3",
    password: `${hashPassword("12345678")}`,
  });

  await User.create({
    email: "test4@gmail.com",
    username: "tets4",
    password: `${hashPassword("12345678")}`,
  });
};

export const getAllUserId = async () => {
  const user1: any = await User.findOne({ email: "test1@gmail.com" });
  const user2: any = await User.findOne({ email: "test2@gmail.com" });
  const user3: any = await User.findOne({ email: "test3@gmail.com" });
  const user4: any = await User.findOne({ email: "test4@gmail.com" });
  return {
    id1: user1._id,
    id2: user2._id,
    id3: user3._id,
    id4: user4._id,
  };
};
