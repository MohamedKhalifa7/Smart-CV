import { useCV } from "../../context/CVcontext";

const Preview = () => {
    const { formData } = useCV(); 

    return (
      <div>
        <h2>Preview Mode</h2>
        
        <h3>👤 Personal</h3>
        <p>Name: {formData.personalInfo.firstName} {formData.personalInfo.lastName}</p>
        <p>Email: {formData.personalInfo.email}</p>

        {/* Displaying Experience */}
        <h3>💼 Experience</h3>
        {formData.experience.length > 0 ? (
          formData.experience.map((exp, index) => (
            <div key={index}>
              <p>Company: {exp.company}</p>
              <p>Role: {exp.role}</p>
              <p>Location: {exp.location}</p>
              <p>From: {exp.startDate} To: {exp.endDate}</p>
              <p>Description: {exp.description}</p>
              <hr />
            </div>
          ))
        ) : (
          <p>No experience listed</p>
        )}
        
        {/* Displaying Education */}
        <h3>🎓 Education</h3>
        {formData.education.length > 0 ? (
          formData.education.map((edu, index) => (
            <div key={index}>
              <p>University: {edu.institution}</p>
              <p>Degree: {edu.degree}</p>
              <p>Location: {edu.location}</p>
              <p>From: {edu.startYear} To: {edu.endYear}</p>
              <p>Description: {edu.description}</p>
              <hr />
            </div>
          ))
        ) : (
          <p>No education listed</p>
        )}

        {/* Displaying Skills */}
        <p><strong>Skills:</strong> {formData.skills.skills?.join(', ')}</p>
        <p><strong>Languages:</strong> {formData.skills.languages}</p>
        <p><strong>Certifications:</strong> {formData.skills.certifications}</p>
      </div>
    );
};

export default Preview;
