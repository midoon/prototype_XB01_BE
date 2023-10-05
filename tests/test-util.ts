import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

export const connectMongoServerTest = async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
};

export const disconnectMongoServerTest = async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
};
