import React from "react";

const LinkedInCV = ({
  name,
  email,
  phone,
  location,
  professionalTitle,
  summary,
  experience = [],
  education = [],
  skills,
  languages = [],
  certifications = [],
}) => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.body}>
        <div style={styles.header}>
          <div style={styles.name}>{name}</div>
          <div style={styles.profTitle}>{professionalTitle}</div>
          <div style={styles.contactInfo}>
            <span>{email}</span> | <span>{phone}</span> | <span>{location}</span>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Summary</h2>
          <p style={styles.paragraph}>{summary}</p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Experience</h2>
          <ul style={styles.list}>
            {experience.map((item, index) => (
              <li key={index} style={styles.entry}>
                <div style={styles.entryTitle}>{item.role}</div>
                <div style={styles.entrySub}>
                  {item.company} — {item.years}
                </div>
                <p style={styles.paragraph}>{item.description}</p>
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
                <p style={styles.paragraph}>{edu.description}</p>
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
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: "#f4f7fb",
    display: "flex",
    justifyContent: "center",
    padding: "40px 20px",
    minHeight: "100vh",
  },
  body: {
    maxWidth: "900px",
    width: "100%",
    backgroundColor: "#fff",
    padding: "40px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    fontFamily: `"Segoe UI", Tahoma, Geneva, Verdana, sans-serif`,
    color: "#333",
    lineHeight: 1.6,
  },
  header: {
    borderBottom: "2px solid #0056b3",
    paddingBottom: "16px",
    marginBottom: "30px",
    textAlign: "center",
  },
  name: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#0056b3",
  },
  profTitle: {
    fontSize: "24px",
    fontWeight: "500",
    color: "#0077cc",
    marginTop: "4px",
  },
  contactInfo: {
    fontSize: "15px",
    color: "#555",
    marginTop: "8px",
  },
  section: {
    marginBottom: "30px",
  },
  sectionTitle: {
    fontSize: "20px",
    marginBottom: "10px",
    color: "#004080",
    borderBottom: "1px solid #ccc",
    paddingBottom: "4px",
  },
  list: {
    listStyle: "none",
    paddingLeft: "0",
  },
  entry: {
    marginBottom: "16px",
  },
  entryTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#222",
  },
  entrySub: {
    fontSize: "14px",
    color: "#666",
  },
  paragraph: {
    fontSize: "14px",
    marginTop: "6px",
    color: "#444",
  },
  skills: {
    marginTop: "10px",
    fontSize: "14px",
    backgroundColor: "#eaf4ff",
    padding: "10px",
    borderRadius: "6px",
    lineHeight: 1.8,
  },
};

export default LinkedInCV;
