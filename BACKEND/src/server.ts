import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import "./config/passportConfig";
import authRouter from "./routes/authRouter";
import aiWritingRouter from "./routes/AIWritingRouter";
import cvBuilderRouter from "./routes/cvBuilderRouter";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

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
app.use("/api/ai", aiWritingRouter);
app.use("/cvbuilder", cvBuilderRouter);

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
