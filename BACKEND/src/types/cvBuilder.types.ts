export interface CVParams {
  title: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
  };
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
  experience?: [
    {
      company?: string;
      position?: string;
      location?: string;
      startDate?: string;
      endDate?: string;
      description?: string;
    }
  ];
  skills: string[];
}
