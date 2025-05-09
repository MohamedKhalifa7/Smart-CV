import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import "./config/passportConfig";
import authRouter from "./routes/authRouter";
import cvRouter from "./routes/cvRouter";
import cvBuilderRouter from "./routes/cvBuilderRouter";
import cookieParser from "cookie-parser";
import chatBotRouter from "./routes/chatBotRouter";
import paymentRouter from "./routes/paymentRouter";
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
//to get cookies from the frontend
app.use(cookieParser());

app.use(express.json());
// Session middleware
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRouter);
app.use("/api/ai", cvRouter);
app.use("/cvbuilder", cvBuilderRouter);
app.use("/api/chatbot", chatBotRouter);
app.use("/payment",paymentRouter);

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
