import React from "react";

const ModernCV = ({
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
}) => {
  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h1 style={styles.name}>{name}</h1>
        <h1 style={styles.name}>{professionalTitle}</h1>

        <p style={styles.small}>{email}</p>
        <p style={styles.small}>{phone}</p>
        <p style={styles.small}>{location}</p>

        <div style={styles.sidebarSection}>
          <div style={styles.label}>Skills</div>
          <p style={styles.small}>{skills}</p>
        </div>

        <div style={styles.sidebarSection}>
          <div style={styles.label}>Languages</div>
          <ul style={styles.list}>
            {languages.map((lang, index) => (
              <li key={index} style={styles.small}>
                {lang.name} 
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.sidebarSection}>
          <div style={styles.label}>Certifications</div>
          <ul style={styles.list}>
            {certifications.map((cert, index) => (
              <li key={index} style={styles.small}>
                {cert.name} 
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.main}>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Summary</h2>
          <pre style={styles.small}>{summary}</pre>

        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Experience</h2>
          <ul style={styles.list}>
            {experience.map((exp, index) => (
              <li key={index}>
                <strong>{exp.role}</strong> at {exp.company} {exp.startDate} - {exp.endDate}
                <p>{exp.location}</p>
                <p>{exp.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Education</h2>
          <ul style={styles.list}>
            {
              education.map((edu, index) => (
                <li key={index}>
                  <strong>{edu.institution}</strong> — {edu.degree} ({edu.startYear} - {edu.endYear})
                  <p>{edu.location}</p>
                  <p>{edu.description}</p>
                </li>
              ))
            }
          </ul>

        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
    margin: 0,
    color: "#333",
  },
  sidebar: {
    backgroundColor: "#1e293b",
    color: "#fff",
    width: "30%",
    padding: "40px 25px",
  },
  main: {
    width: "70%",
    padding: "40px",
  },
  name: {
    fontSize: "28px",
    marginBottom: "5px",
  },
  small: {
    fontSize: "14px",
  },
  section: {
    marginBottom: "20px",
  },
  sidebarSection: {
    marginBottom: "25px",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "6px",
    display: "inline-block",
  },
  sectionTitle: {
    fontSize: "18px",
    color: "#1e293b",
    borderBottom: "1px solid #e0e0e0",
    marginBottom: "10px",
    paddingBottom: "5px",
  },
  list: {
    listStyle: "none",
    paddingLeft: 0,
  },
};

export default ModernCV;
