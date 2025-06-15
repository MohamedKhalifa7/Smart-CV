import mongoose from "mongoose";

const cvSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    // title: { type: String, required: true },
    personalInfo: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
      location: { type: String },
      professionalTitle: { type: String },
      ProfessionalSummary: { type: String },
    },
    experience: [
      {
        jobTitle: { type: String,required:true },
        company: { type: String,required:true },
        location: { type: String,required:true },
        startDate: { type: String,required:true },
        endDate: { type: String,required:true },
        description: { type: String },
      },
    ],
    education: [
      {
        institution: { type: String,required:true},
        degree: { type: String,required:true },
        location: { type: String,required:true },
        startYear: { type: String,required:true },
        endYear: { type: String,required:true },
      },
    ],
    skills: {
      skills: [String],
      languages: { type: String },
      certifications: { type: String },
    },
  },
  { timestamps: true }
);

const CV = mongoose.model("cvs", cvSchema);

export default CV;
