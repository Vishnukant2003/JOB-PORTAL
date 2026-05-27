import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

// Define TypeScript Interfaces
interface Skill {
  skill: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface Project {
  title: string;
  description: string;
}

interface Experience {
  title: string;
  company: string;
  years: string;
  description: string;
}

interface ResumeData {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  summary?: string;
  skills?: Skill[];
  education?: Education[];
  projects?: Project[];
  experience?: Experience[];
}

// Props Interface
interface Template2PDFProps {
  data: ResumeData;
}

// Styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
    fontSize: 12,
  },
  sidebar: {
    width: "35%",
    backgroundColor: "#424242",
    color: "#ffffff",
    padding: 15,
  },
  mainContent: {
    width: "65%",
    padding: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    backgroundColor: "#ffbd20",
    padding: 5,
  },
  text: {
    marginBottom: 4,
  },
  listItem: {
    marginBottom: 4,
    paddingLeft: 10,
  },
});

const Template2PDF: React.FC<Template2PDFProps> = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{data.name || "John Doe"}</Text>
          <Text>{data.role || "Web Developer"}</Text>
          <Text style={{ marginVertical: 10 }}>Email: {data.email || "john.doe@example.com"}</Text>
          <Text>Phone: {data.phone || "123-456-7890"}</Text>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.text}>{data.summary || "Experienced web developer with a passion for coding."}</Text>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Summary Section */}
         

          {/* Skills Section */}
          <Text style={styles.sectionTitle}>Skills</Text>
          {data.skills && data.skills.length > 0 ? (
            data.skills.map((skill, index) => (
              <Text key={index} style={styles.listItem}>• {skill.skill}</Text>
            ))
          ) : (
            <Text>No skills added</Text>
          )}

          {/* Education Section */}
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education && data.education.length > 0 ? (
            data.education.map((edu, index) => (
              <Text key={index} style={styles.listItem}>
                • {edu.degree} - {edu.institution} ({edu.year})
              </Text>
            ))
          ) : (
            <Text>No education details added</Text>
          )}

          {/* Projects Section */}
          <Text style={styles.sectionTitle}>Projects</Text>
          {data.projects && data.projects.length > 0 ? (
            data.projects.map((proj, index) => (
              <Text key={index} style={styles.listItem}>
                • {proj.title}: {proj.description}
              </Text>
            ))
          ) : (
            <Text>No projects added</Text>
          )}

          {/* Experience Section */}
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience && data.experience.length > 0 ? (
            data.experience.map((exp, index) => (
              <Text key={index} style={styles.listItem}>
                • {exp.title} at {exp.company} ({exp.years}) - {exp.description}
              </Text>
            ))
          ) : (
            <Text>No experience added</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default Template2PDF;
