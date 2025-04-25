import { useCV } from "../../context/CVcontext";
import { useTemplate } from "../../context/choosenTempContext";
import ClassicCV from "../../templates/classic-cv";
import LinkedInCV from "../../templates/linkedin-cv";
import ModernCV from "../../templates/modern-cv";

import React, { useEffect } from "react";

const Preview = () => {
  const { formData } = useCV(); 
  const { choosenTemp } = useTemplate();

  useEffect(() => {
    console.log("Form Data:", formData);
  }, []);

  // Personal Info
  const personalInfo = formData.personalInfo || {};
  const name = `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`;
  const email = personalInfo.email || '';
  const phone = personalInfo.phone || '';
  const location = personalInfo.location || '';
  const professionalTitle = personalInfo.professionalTitle || '';
  const summary = personalInfo.ProfessionalSummary || '';

  // Skills
  const skills = (formData.skills.skills || []).join(', ');
  const languages = formData.skills.languages
    ? formData.skills.languages.split(',').map((l) => ({ name: l.trim() }))
    : [];
  const certifications = formData.skills.certifications
    ? formData.skills.certifications.split(',').map((c) => ({ name: c.trim() }))
    : [];

  // Experience
  const experience = (formData.experience || []).map((exp) => ({
    role: exp.jobTitle || '',
    company: exp.company || '',
    startDate: exp.startDate || '',
    endDate: exp.endDate || '',
    years: `${exp.startDate || ''} - ${exp.endDate || ''}`,
    location: exp.location || '',
    description: exp.description || '',
  }));

  // Education
  const education = (formData.education || []).map((edu) => ({
    institution: edu.institution || '',
    degree: edu.degree || '',
    startYear: edu.startYear || '',
    endYear: edu.endYear || '',
    location: edu.location || '',
    description: edu.description || '',
  }));

  const commonProps = {
    name,
    email,
    phone,
    location,
    professionalTitle,
    summary,
    skills,
    languages,
    certifications,
    experience,
    education,
  };

  useEffect(()=>{
    console.log("education Props:", education);
  })
  return (
    <>
      {choosenTemp === "classic" && <ClassicCV {...commonProps} />}
      {choosenTemp === "linkedin" && <LinkedInCV {...commonProps} />}
      {choosenTemp === "modern" && <ModernCV {...commonProps} />}
    </>
  );
};

export default Preview;
