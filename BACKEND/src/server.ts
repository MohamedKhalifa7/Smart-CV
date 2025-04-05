import express from "express";
import mongoose from "mongoose";

// routers
import authRouter from "./routes/authRouter";

const app = express();
const port = 3001;

app.use(express.json());
app.use("/auth", authRouter);

mongoose
  .connect("mongodb://localhost:27017/ecosolar")
  .then(() => console.log("mongo connected!"))
  .catch(() => console.log("failed to connect!"));
app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});
