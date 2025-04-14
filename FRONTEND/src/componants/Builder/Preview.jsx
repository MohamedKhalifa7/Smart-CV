import { useCV } from "../../context/CVcontext";

const Preview = () => {
    const { formData } = useCV(); 
  
    return (
      <div>
        <h2>Preview Mode</h2>
        <h3>👤 Personal</h3>
        <p>Name: {formData.personal.firstName} {formData.personal.lastName}</p>
        <p>Email: {formData.personal.email}</p>
  
        <h3>💼 Experience</h3>
        <p>Company: {formData.experience.company}</p>
        <p>Role: {formData.experience.role}</p>
        <h3>🎓 Education</h3>
        <p>University: {formData.education.university}with degree {formData.education.degree}</p>
  
        <p><strong>Skills:</strong> {formData.skills.skills?.join(', ')}</p>
        <p><strong>Languages:</strong> {formData.skills.languages}</p>
        <p><strong>Certifications:</strong> {formData.skills.certifications}</p>
      </div>
    );
  };
  export default Preview;