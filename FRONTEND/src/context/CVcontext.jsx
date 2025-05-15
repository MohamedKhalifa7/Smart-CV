import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

const API_URL = import.meta.env.MODE === "development" 
  ? import.meta.env.VITE_API_URL_LOCAL 
  : import.meta.env.VITE_API_URL_PRODUCTION;

const CVContext = createContext();

export const useCV = () => useContext(CVContext);

export const CVProvider = ({ children }) => {
  const [myCvs, setMyCvs] = useState([]);
  const [personalFormValid, setPersonalFormValid] = useState({});
const {t}=useTranslation()
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

  const updateFormData = (cvData) => {
    setFormData(cvData);
  };

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

  const validatePersonalInfo = (data) => {
    const errors = {};
    const {
      firstName,
      lastName,
      email,
      professionalTitle,
      phone,
      location
    } = data || {};
  
    const isEmpty = (value) => !value || value.trim() === '';
  
    if (isEmpty(firstName)) {
      errors.firstName = t('First Name is required');
    }
  
    if (isEmpty(lastName)) {
      errors.lastName = t('Last Name is required');
    }
  
    if (isEmpty(email)) {
      errors.email = t('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = t('Invalid email format');
    }
  
    if (isEmpty(professionalTitle)) {
      errors.professionalTitle = t('Professional Title is required');
    }
  
    if (isEmpty(phone)) {
      errors.phone = t('Phone number is required');
    } else if (!/^\+?[0-9]{7,15}$/.test(phone)) {
      errors.phone = t('Invalid phone number');
    }
  
    if (isEmpty(location)) {
      errors.location = t('Location is required');
    }
  
    setPersonalFormValid(errors);
    return Object.keys(errors).length === 0;
  };
  
  
  
  
  const fetchUserCVs = async () => {
    try {
        const response = await axios.get(`${API_URL}/cvbuilder/user`, { withCredentials: true });
        console.log('Fetched data:', response.data); 
        setMyCvs(response.data||[])
        return response.data|| []; 
    } catch (error) {
        console.error('Error fetching CVs:', error);
        return []; 
    }
};

const exportCV = async (cvId, template) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/ai/exports/${cvId}?format=pdf&template=${template}`,
      {
        withCredentials: true,
        responseType: 'blob',
      }
    );
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CV_${cvId}.pdf`;
      document.body.appendChild(a);
    a.click();
      a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting CV:', error);
  }
};


  return (
    <CVContext.Provider value={{ 
      formData, 
      setFormData,
      updateFormData,
      updateSection,
      myCvs,
      updateArraySection,
      addArrayItem,
      exportCV,
      removeArrayItem,fetchUserCVs,personalFormValid,validatePersonalInfo
    }}>
      {children}
    </CVContext.Provider>
  );
};