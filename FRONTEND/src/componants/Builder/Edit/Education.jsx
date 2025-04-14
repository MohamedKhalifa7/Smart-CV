import { useCV } from "../../../context/CVcontext";

const Education = () => {
    const {formData, updateSection} = useCV();
    const  education= formData.education;
    const handelChange=(e)=>{
        updateSection('education', {
            ...formData.education,
            [e.target.name]: e.target.value,
        });
    }
    
    return (
        <div>
          <h2>Education</h2>
          <input type="text" placeholder="University" name="university" value={education.university||""} onChange={handelChange} />
          <input type="text" placeholder="Degree" name="degree" value={education.degree||""} onChange={handelChange} />
        </div>
      );
}
  
  export default Education;
  