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
        jobTitle: { type: String },
        company: { type: String },
        location: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        description: { type: String },
      },
    ],
    education: [
      {
        institution: { type: String },
        degree: { type: String },
        location: { type: String },
        startYear: { type: String },
        endYear: { type: String },
        description: { type: String },
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
