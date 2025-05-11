import path from "path";
import fs from "fs";
import multer, { FileFilterCallback } from "multer";
import { Request } from "express";


const upload_dir =
  process.env.NODE_ENV === "production"
    ? "/tmp"
    : path.join(__dirname, "../uploads");

if (!fs.existsSync(upload_dir)) {
  fs.mkdirSync(upload_dir, { recursive: true }); 
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, upload_dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only PDF and Word documents are allowed.")
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}); 

export default upload;
