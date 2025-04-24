import React from "react";

const ClassicCV = ({
  name,
  email,
  experience = [],
  education = {},
  skills,
  languages = [],
  certifications = [],
}) => {
  return (
    <div style={styles.body}>
      <div style={styles.header}>
        <div style={styles.name}>{name}</div>
        <div style={styles.email}>{email}</div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Experience</h2>
        <ul style={styles.list}>
          {experience.map((exp, index) => (
            <li key={index} style={styles.entry}>
              <div style={styles.entryTitle}>{exp.role}</div>
              <div style={styles.entrySub}>
                {exp.company} — {exp.years}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Education</h2>
        <div style={styles.entry}>
          <div style={styles.entryTitle}>{education.university}</div>
          <div style={styles.entrySub}>{education.degree}</div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Skills</h2>
        <div style={styles.skills}>{skills}</div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Languages</h2>
        <ul style={styles.list}>
          {languages.map((lang, index) => (
            <li key={index}>
              {lang.name} — {lang.degree}
            </li>
          ))}
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Certifications</h2>
        <ul style={styles.list}>
          {certifications.map((cert, index) => (
            <li key={index}>
              {cert.name} from {cert.company} ({cert.years})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
    margin: "40px",
    color: "#333",
    lineHeight: "1.6",
  },
  header: {
    borderBottom: "2px solid #0056b3",
    marginBottom: "20px",
  },
  name: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#0056b3",
  },
  email: {
    color: "#555",
    fontSize: "15px",
    marginTop: "4px",
  },
  section: {
    marginBottom: "25px",
  },
  sectionTitle: {
    fontSize: "18px",
    marginTop: "30px",
    color: "#004080",
    borderBottom: "1px solid #ddd",
    paddingBottom: "5px",
  },
  list: {
    listStyle: "none",
    paddingLeft: "0",
  },
  entry: {
    marginBottom: "10px",
  },
  entryTitle: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  entrySub: {
    fontSize: "14px",
    color: "#666",
  },
  skills: {
    marginTop: "10px",
    fontSize: "14px",
  },
};

export default ClassicCV;
