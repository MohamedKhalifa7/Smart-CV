import { createContext, useContext, useState } from 'react';

const CVContext = createContext();

export const useCV = () => useContext(CVContext);

export const CVProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    personal: {},
    experience: {},
    education: {},
    skills: {
      skills: [], // array of strings
      languages: '',
      certifications: ''
    }
  }
  );

  const updateSection = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  return (
    <CVContext.Provider value={{ formData, updateSection }}>
      {children}
    </CVContext.Provider>
  );
};
