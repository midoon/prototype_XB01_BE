import "dotenv/config";
import app from "./application/web";
import connectDB from "./application/database";

connectDB();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;
app.listen(port, (): void => {
  console.info(`Listening application in port ${port}`);
});
