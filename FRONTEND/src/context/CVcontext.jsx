import axios from 'axios';
import { createContext, useContext, useState } from 'react';

const CVContext = createContext();

export const useCV = () => useContext(CVContext);

export const CVProvider = ({ children }) => {
  const [myCvs, setMyCvs] = useState([]);
  const [personalFormValid, setPersonalFormValid] = useState({});

  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      professionalTitle: '',
      ProfessionalSummary: ''
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
  const validatePersonalInfo = () => {
    const errors = {};
    const { firstName, lastName, email ,professionalTitle} = formData.personalInfo || {};
  
    if (!firstName) errors.firstName = 'First Name is required';
    if (!lastName) errors.lastName = 'Last Name is required';
    if (!email) errors.email = 'Email is required';
    if (!professionalTitle) errors.professionalTitle = 'Professional Title is required';
  
    setPersonalFormValid(errors);
    return Object.keys(errors).length === 0;
  };
  
  
  
  const fetchUserCVs = async () => {
    try {
        const response = await axios.get('http://localhost:3001/cvbuilder/user', { withCredentials: true });
        console.log('Fetched data:', response.data); 
        return response.data.cvs || [];
    } catch (error) {
        console.error('Error fetching CVs:', error);
        return []; 
    }
};


  return (
    <CVContext.Provider value={{ 
      formData, 
      updateSection,
      updateArraySection,
      addArrayItem,
      removeArrayItem,fetchUserCVs,personalFormValid,validatePersonalInfo
    }}>
      {children}
    </CVContext.Provider>
  );
};