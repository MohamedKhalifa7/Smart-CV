import { useCV } from "../../../context/CVcontext";

const Experience = () => {
    const {formData, updateSection} = useCV();
   const  experience= formData.experience;
    const handelChange = (e) => {
        updateSection('experience', {
            ...formData.experience,
            [e.target.name]: e.target.value,
        });
    }
    return (
        <div>
          <h2>Experience</h2>
          <input type="text" placeholder="Company" name="company" value={experience.company||""} onChange={handelChange} />
          <input type="text" placeholder="Role" name="role" value={experience.role||""} onChange={handelChange}/>
        </div>
      );
}
  
  export default Experience;
  