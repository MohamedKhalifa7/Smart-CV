import React from "react";

const ClassicCV = ({
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
    <div style={styles.page}>
      <div style={styles.container}>
        <h1>{name}</h1>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Title:</strong> {professionalTitle}</p>

        <div style={styles.section}>
          <h2 style={styles.heading}>Professional Summary:</h2>
          <p>{summary}</p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.heading}>Experience</h2>
          <ul style={styles.ul}>
            {experience.map((exp, index) => (
              <li key={index}>
                <span style={styles.bold}>{exp.role}</span> at {exp.company} ({exp.startDate} to {exp.endDate})
                <p>{exp.location}</p>
                <p>{exp.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.heading}>Education</h2>
          <ul style={styles.ul}>
            {education.map((edu, index) => (
              <li key={index}>
                <strong>{edu.institution}</strong> — {edu.degree} ({edu.startYear} to {edu.endYear})
                <p>{edu.location}</p>
                <p>{edu.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.heading}>Skills</h2>
          <p>{skills}</p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.heading}>Languages</h2>
          <ul style={styles.ul}>
            {languages.map((lang, index) => (
              <li key={index}>{lang.name}</li>
            ))}
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.heading}>Certifications</h2>
          <ul style={styles.ul}>
            {certifications.map((cert, index) => (
              <li key={index}>{cert.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: "#f5f5f5",
    padding: "40px",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#ffffff",
    padding: "40px",
    maxWidth: "800px",
    width: "100%",
    fontFamily: "Arial, sans-serif",
    lineHeight: 1.6,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "6px",
  },
  section: {
    marginBottom: "25px",
  },
  heading: {
    color: "#333",
    borderBottom: "1px solid #ccc",
    paddingBottom: "5px",
    marginBottom: "10px",
  },
  bold: {
    fontWeight: "bold",
  },
  ul: {
    paddingLeft: "20px",
  },
};

export default ClassicCV;
