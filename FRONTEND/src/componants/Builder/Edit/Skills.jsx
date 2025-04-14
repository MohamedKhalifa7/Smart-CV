import { useState } from 'react';
import { useCV } from '../../../context/CVcontext';
const Skills = () => {
  const { formData, updateSection } = useCV();
  const [input, setInput] = useState('');
  const skills = formData.skills.skills || [];

  const addSkill = () => {
    if (input.trim() && !skills.includes(input.trim())) {
      updateSection('skills', {
        ...formData.skills,
        skills: [...skills, input.trim()],
      });
      setInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    updateSection('skills', {
      ...formData.skills,
      skills: skills.filter((s) => s !== skillToRemove),
    });
  };

  return (
    <div>
      <h3>Skills</h3>

      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder="e.g. Project Management"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addSkill()}
        />
        <button onClick={addSkill}>Add</button>
      </div>

      <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {skills.map((skill, index) => (
          <span
            key={index}
            style={{
              background: '#E9D5FF',
              padding: '6px 10px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              style={{
                border: 'none',
                background: 'transparent',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              
            </button>
          </span>
        ))}
      </div>

      <br />

      <label>Languages (Optional)</label>
      <textarea
        placeholder="e.g.: English (Native), Spanish (Intermediate)"
        value={formData.skills.languages || ''}
        onChange={(e) =>
          updateSection('skills', {
            ...formData.skills,
            languages: e.target.value,
          })
        }
      />

      <label>Certifications (Optional)</label>
      <textarea
        placeholder="e.g.: Google Analytics Certification (2022)"
        value={formData.skills.certifications || ''}
        onChange={(e) =>
          updateSection('skills', {
            ...formData.skills,
            certifications: e.target.value,
          })
        }
      />
    </div>
  );
};

export default Skills;
