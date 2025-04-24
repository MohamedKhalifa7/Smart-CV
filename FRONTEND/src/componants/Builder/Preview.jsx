import { useCV } from "../../context/CVcontext";
import { useTemplate } from "../../context/choosenTempContext";
import ClassicCV from "../../templates/classic-cv";
import LinkedInCV from "../../templates/linkedin-cv";
import ModernCV from "../../templates/modern-cv";

import React from "react";
import ReactDOM from "react-dom";
const Preview = () => {
  const { formData } = useCV(); 
  const { choosenTemp } = useTemplate();

  const name = `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`;
  const email = formData.personalInfo.email;
  const skills = formData.skills.skills.join(', ');
  const languages = formData.skills.languages
    .split(',')
    .map((l) => ({ name: l.trim(), })); 
  const certifications = formData.skills.certifications
    .split(',')
    .map((c) => ({ name: c.trim(),  }));

  const experience = formData.experience.map((exp) => ({
    role: exp.jobTitle,
    company: exp.company,
    years: `${exp.startDate} - ${exp.endDate}`,
  }));

  const education = {
    university: formData.education[0]?.institution || '',
    degree: formData.education[0]?.degree || '',
  };

  return (
    <>
      {choosenTemp === "classic" && <ClassicCV
        name={name}
        email={email}
        skills={skills}
        languages={languages}
        certifications={certifications}
        experience={experience}
        education={education}
         />}

      {choosenTemp === "linkedin" && <LinkedInCV 
        name={name}
        email={email}
        skills={skills}
        languages={languages}
        certifications={certifications}
        experience={experience}
        education={education}
         />}
         
      {choosenTemp === "modern" && (
        <ModernCV
          name={name}
          email={email}
          skills={skills}
          languages={languages}
          certifications={certifications}
          experience={experience}
          education={education}
        />
      )}
    </>
  );
};


export default Preview;
