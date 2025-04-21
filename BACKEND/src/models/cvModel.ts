import mongoose, { Schema, Document } from "mongoose";

interface IExperience {
  role: string;
  company: string;
  years: Date;
}

interface IEducation {
  university: string;
  degree: string;
}

interface ILanguage {
  name: string;
  degree: string;
}

interface ICertification {
  name: string;
  company: string;
  years: Date;
}

export interface ICV {
  userId: mongoose.Types.ObjectId | string;
  name: string;
  email: string;
  experience: IExperience[];
  education: IEducation;
  skills: string[];
  languages: ILanguage[];
  certifications: ICertification[];
  createdAt: Date;
}

const CVSchema =new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  email: { type: String, required: true },
  experience: [
    {
      role: String,
      company: String,
      years: Date,
    },
  ],
  education: {
    university: String,
    degree: String,
  },
  skills: [String],
  languages: [
    {
      name: String,
      degree: String,
    },
  ],
  certifications: [
    {
      name: String,
      company: String,
      years: Date,
    },
  ],
  extractedText: String,
  improvedText: String,   
  improvementExplanation: String,
  isImprovedAccepted: Boolean,
  createdAt: { type: Date, default: Date.now },
});

const CVModel = mongoose.model<ICV>("cv", CVSchema);
export default CVModel;
