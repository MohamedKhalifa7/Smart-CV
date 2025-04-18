import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import "./config/passportConfig";
import authRouter from "./routes/authRouter";
import aiWritingRouter from "./routes/AIWritingRouter";
import cors from "cors";


dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use(express.json());
// Session middleware
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRouter);
app.use("/api/ai", aiWritingRouter);


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

