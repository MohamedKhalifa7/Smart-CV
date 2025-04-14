import { useState } from 'react';
import Personal from './Edit/Personal';
import Experience from './Edit/Experience';
import Education from './Edit/Education';
import Skills from './Edit/Skills';
import Preview from './Preview.jsx';

const Builder = () => {
  const [editMode, setEditMode] = useState(true); // الوضع الحالي: تعديل ولا عرض؟
  const [activeTab, setActiveTab] = useState('personal');

  // كل البيانات هنجمعها هنا
  const [formData, setFormData] = useState({
    personal: {},
    experience: {},
    education: {},
    skills: {},
  });

  const renderTab = () => {
    switch (activeTab) {
      case 'personal':
        return <Personal data={formData.personal} onChange={(data) => setFormData({ ...formData, personal: data })} />;
      case 'experience':
        return <Experience data={formData.experience} onChange={(data) => setFormData({ ...formData, experience: data })} />;
      case 'education':
        return <Education data={formData.education} onChange={(data) => setFormData({ ...formData, education: data })} />;
      case 'skills':
        return <Skills data={formData.skills} onChange={(data) => setFormData({ ...formData, skills: data })} />;
      default:
        return null;
    }
  };

  return (
    <div className="cv-builder">
      <div className="top-tabs">
        <button onClick={() => setEditMode(true)}>Edit</button>
        <button onClick={() => setEditMode(false)}>Preview</button>
      </div>

      {editMode ? (
        <>
          <div className="tab-buttons">
            <button onClick={() => setActiveTab('personal')}>Personal</button>
            <button onClick={() => setActiveTab('experience')}>Experience</button>
            <button onClick={() => setActiveTab('education')}>Education</button>
            <button onClick={() => setActiveTab('skills')}>Skills</button>
          </div>
          <div className="tab-content">
            {renderTab()}
          </div>
        </>
      ) : (
        <Preview data={formData} />
      )}
    </div>
  );
};

export default Builder;
