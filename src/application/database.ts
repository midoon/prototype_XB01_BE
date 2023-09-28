import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI: string = process.env.MONGO_URI || "";
    const conn: any = await mongoose.connect(mongoURI);
    console.log(`CONNECTED TO MONGODB:`);
  } catch (error: any) {
    console.log(`Error: ${error.messsage}`);
    process.exit();
  }
};

export default connectDB;
