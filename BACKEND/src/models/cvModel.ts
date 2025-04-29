import mongoose, { Schema, Document } from "mongoose";

interface IPersonalInfo {
  firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    professionalTitle: string;  
    ProfessionalSummary: string;
}

interface IExperience {
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface IEducation {
  institution: string;
  degree: string;
  location: string;
  startYear: string;
  endYear: string;
  description: string;
}


interface ISkills{
  skills:string[];
  languages:string;
  certifications:string;
}

export interface ICV extends Document {
  userId: mongoose.Types.ObjectId | string;
  personalInfo: IPersonalInfo;
  experience: IExperience[];
  education: IEducation[];
  skills:ISkills;
  createdAt: Date;
}

const CVSchema = new Schema<ICV>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

  personalInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    professionalTitle: { type: String, required: true },
    professionalSummary: { type: String, required: true },
  },

  experience: [
    {
      jobTitle: { type: String, required: true },
      company: { type: String, required: true },
      location: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      description: { type: String, required: true },
    },
  ],

  education: [
    {
      institution: { type: String, required: true },
      degree: { type: String, required: true },
      location: { type: String, required: true },
      startYear: { type: String, required: true },
      endYear: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],

  skills: {
    skills: [{ type: String, required: true }],
    languages: { type: String },
    certifications: { type: String },
  },


  createdAt: { type: Date, default: Date.now },
});

const CVModel = mongoose.model<ICV>("cv", CVSchema);
export default CVModel;
