import { createContext, useContext, useState } from 'react';

const CVContext = createContext();

export const useCV = () => useContext(CVContext);

export const CVProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      professionalTitle: '',
      summary: ''
    },
    experience: [
      {
        jobTitle: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        institution: "",
        degree: "",
        location: "",
        startYear: "",
        endYear: "",
        description: ""
      }
    ],
    skills: {
      skills: [], // array of strings
      languages: '',
      certifications: ''
    }
  });

  // Enhanced update function that handles arrays properly
  const updateSection = (section, data) => {
    setFormData(prev => {
      // Special handling for array sections
      if (section === 'experience' || section === 'education') {
        // Ensure we're always working with an array
        const currentArray = Array.isArray(prev[section]) ? prev[section] : [];
        
        // If data is an array, replace completely
        if (Array.isArray(data)) {
          return {
            ...prev,
            [section]: data
          };
        }
        
        // If data is an object, assume we're updating the first item
        // (This might need adjustment based on your specific use cases)
        return {
          ...prev,
          [section]: currentArray.length > 0 ? 
            [{ ...currentArray[0], ...data }] : 
            [data]
        };
      }
      
      // For non-array sections, merge the data
      return {
        ...prev,
        [section]: {
          ...prev[section],
          ...data
        }
      };
    });
  };

  // New function to handle array items specifically
  const updateArraySection = (section, index, data) => {
    setFormData(prev => {
      const currentArray = Array.isArray(prev[section]) ? [...prev[section]] : [];
      
      if (index >= 0 && index < currentArray.length) {
        currentArray[index] = {
          ...currentArray[index],
          ...data
        };
      } else if (index === currentArray.length) {
        // Add new item
        currentArray.push(data);
      }
      
      return {
        ...prev,
        [section]: currentArray
      };
    });
  };

  // Function to add new empty item to an array section
  const addArrayItem = (section, template) => {
    setFormData(prev => ({
      ...prev,
      [section]: [
        ...(Array.isArray(prev[section]) ? prev[section] : []),
        template || {}
      ]
    }));
  };

  // Function to remove item from array section
  const removeArrayItem = (section, index) => {
    setFormData(prev => {
      const currentArray = Array.isArray(prev[section]) ? [...prev[section]] : [];
      if (index >= 0 && index < currentArray.length) {
        currentArray.splice(index, 1);
      }
      return {
        ...prev,
        [section]: currentArray.length > 0 ? currentArray : [{}]
      };
    });
  };

  return (
    <CVContext.Provider value={{ 
      formData, 
      updateSection,
      updateArraySection,
      addArrayItem,
      removeArrayItem
    }}>
      {children}
    </CVContext.Provider>
  );
};