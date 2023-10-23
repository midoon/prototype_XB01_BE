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
};
