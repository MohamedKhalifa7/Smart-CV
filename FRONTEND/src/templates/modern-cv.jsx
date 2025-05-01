import React from "react";

const ModernCV = ({
  name,
  email,
  phone,
  location,
  professionalTitle,
  summary,
  skills,
  languages = [],
  certifications = [],
  experience = [],
  education = [],
}) => {
  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h1 style={styles.sidebarHeader}>{name}</h1>
        <p><strong>Title:</strong> {professionalTitle}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Location:</strong> {location}</p>

        <h2 style={styles.sidebarSection}>Skills</h2>
        <p>{skills}</p>

        <h2 style={styles.sidebarSection}>Languages</h2>
        <p>{languages.map(lang => lang.name).join(", ")}</p>

        <h2 style={styles.sidebarSection}>Certifications</h2>
        <p>{certifications.map(cert => cert.name).join(", ")}</p>
      </div>

      <div style={styles.main}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Professional Summary</h2>
          <p>{summary}</p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} style={styles.entry}>
              <h3 style={styles.entryTitle}>{exp.role} at {exp.company}</h3>
              <p><strong>Location:</strong> {exp.location}</p>
              <p><strong>From:</strong> {exp.startDate} <strong>To:</strong> {exp.endDate}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Education</h2>
          {education.map((edu, index) => (
            <div key={index} style={styles.entry}>
              <h3 style={styles.entryTitle}>{edu.degree} - {edu.institution}</h3>
              <p><strong>Location:</strong> {edu.location}</p>
              <p><strong>Years:</strong> {edu.startYear} - {edu.endYear}</p>
              <p>{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  cvWrapper: {
    backgroundColor: '#e5e7eb', // Light gray for PDF-like background
    padding: '50px 20px',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  container: {
    display: 'flex',
    width: '900px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    minHeight: '1122px', // A4 height at 96dpi
  },
  
  sidebar: {
    width: '30%',
    backgroundColor: '#1e293b',
    color: '#ffffff',
    padding: '40px 25px',
  },
  sidebarHeader: {
    fontSize: '22px',
    marginBottom: '20px',
  },
  sidebarSection: {
    fontSize: '18px',
    marginTop: '30px',
    marginBottom: '10px',
    borderBottom: '1px solid #ffffff',
    paddingBottom: '5px',
  },
  sidebarList: {
    paddingLeft: '20px',
    fontSize: '14px',
    marginTop: '5px',
  },
  main: {
    width: '70%',
    padding: '40px',
    color: '#333',
    fontFamily: `"Segoe UI", sans-serif`,
    backgroundColor: '#ffffff',
  },
  section: {
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '22px',
    borderBottom: '2px solid #1e293b',
    paddingBottom: '5px',
    marginBottom: '10px',
  },
  list: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  entry: {
    marginBottom: '20px',
  },
  entryTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  entrySub: {
    fontSize: '14px',
    marginBottom: '5px',
  },
};


export default ModernCV;
