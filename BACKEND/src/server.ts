import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// routers
import authRouter from "./routes/authRouter";


const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use("/auth", authRouter);


const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("MONGO_URI is not found");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("mongo Atlas connected!"))
  .catch(() => console.log("failed to connect!"));
app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});

