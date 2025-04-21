export interface CVParams {
  // title: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    professionalTitle: string;  
    ProfessionalSummary: string;
  };
 
  experience?: [
    {
      jobTitle?: string;
      company?: string;
      location?: string;
      startDate?: string;
      endDate?: string;
      description?: string;
    }
  ];
  education: [
    {
      institution: string;
      degree: string;
      location: string;
      startYear: string;
      endYear: string;
      description: string;
    }
  ];
  skills:{
    skills: string[];
    languages?: string;
    certifications?: string;
  };
}
