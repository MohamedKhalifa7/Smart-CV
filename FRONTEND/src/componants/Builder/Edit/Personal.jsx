import { useCV } from "../../../context/CVcontext";

const Personal = () => {
  const { formData, updateSection } = useCV();
  const personal = formData.personal;

  const handleChange = (e) => {
    updateSection('personal', {
      ...personal,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h3>Personal Info</h3>
      <input
        name="firstName"
        placeholder="First Name"
        value={personal.firstName || ''}
        onChange={handleChange}
      />
      <input
        name="lastName"
        placeholder="Last Name"
        value={personal.lastName || ''}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={personal.email || ''}
        onChange={handleChange}
      />
    </div>
  );
};

export default Personal;
