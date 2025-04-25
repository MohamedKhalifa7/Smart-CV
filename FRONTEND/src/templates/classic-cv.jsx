import React from "react";

const ClassicCV = ({
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
    <div style={styles.body}>
      <div style={styles.header}>
        <div style={styles.name}>{name}</div>
        <div style={styles.subHeader}>{professionalTitle}</div>
        <div style={styles.email}>{email}</div>
        <div style={styles.email}>{phone}</div>
        <div style={styles.email}>{location}</div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Summary</h2>
        <p>{summary}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Experience</h2>
        <ul style={styles.list}>
          {experience.map((exp, index) => (
            <li key={index} style={styles.entry}>
              <div style={styles.entryTitle}>{exp.role}</div>
              <div style={styles.entrySub}>
                {exp.company} — {exp.startDate} to {exp.endDate}
              </div>
              <div style={styles.entrySub}>{exp.location}</div>
              <p>{exp.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Education</h2>
        <ul style={styles.list}>
          {education.map((edu, index) => (
            <li key={index} style={styles.entry}>
              <div style={styles.entryTitle}>{edu.institution}</div>
              <div style={styles.entrySub}>
                {edu.degree} ({edu.startYear} - {edu.endYear})
              </div>
              <div style={styles.entrySub}>{edu.location}</div>
              <p>{edu.description}</p>
            </li>
          ))}
        </ul>
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
              {lang.name}
            </li>
          ))}
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Certifications</h2>
        <ul style={styles.list}>
          {certifications.map((cert, index) => (
            <li key={index}>
              {cert.name} 
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
    borderBottom: "2px solid ",
    marginBottom: "20px",
  },
  name: {
    fontSize: "28px",
    fontWeight: "bold",
    // color: "#0056b3",
  },
  subHeader: {
    fontSize: "18px",
    // color: "#0077cc",
    marginTop: "4px",
  },
  email: {
    // color: "#555",
    fontSize: "15px",
    marginTop: "2px",
  },
  section: {
    marginBottom: "25px",
  },
  sectionTitle: {
    fontSize: "18px",
    marginTop: "30px",
    // color: "#004080",
    borderBottom: "1px solid #ddd",
    paddingBottom: "5px",
  },
  list: {
    listStyle: "none",
    paddingLeft: "0",
  },
  entry: {
    marginBottom: "15px",
  },
  entryTitle: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  entrySub: {
    fontSize: "14px",
    // color: "#666",
  },
  skills: {
    marginTop: "10px",
    fontSize: "14px",
  },
};

export default ClassicCV;
