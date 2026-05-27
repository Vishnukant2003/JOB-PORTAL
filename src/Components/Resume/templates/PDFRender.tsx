import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

// Define TypeScript interfaces
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

interface ResumePDFProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12, backgroundColor: "#fff" },
  section: {
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: "1px solid #ddd",
  },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 5 },
  subHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
    backgroundColor: "#eee",
    padding: 3,
  },
  text: { marginBottom: 3 },
});

const ResumePDF: React.FC<ResumePDFProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>{data.name || "John Doe"}</Text>
        <Text>{data.role || "Web Developer"}</Text>
        <Text>
          {data.email || "john.doe@example.com"} | {data.phone || "123-456-7890"}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Summary</Text>
        <Text>{data.summary || "Experienced web developer with a passion for coding."}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Skills</Text>
        {data.skills?.length ? (
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
            {data.skills.map((skill, index) => (
              <View key={index} style={{ width: "30%", marginBottom: 5 }}>
                <Text>{skill.skill}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text>No skills added</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Education</Text>
        {data.education?.map((edu, index) => (
          <Text key={index} style={styles.text}>
            <Text style={{ fontWeight: "bold" }}>{edu.degree}</Text> - {edu.institution} ({edu.year})
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Projects</Text>
        {data.projects?.map((proj, index) => (
          <Text key={index} style={styles.text}>
            <Text style={{ fontWeight: "bold" }}>{proj.title}:</Text> {proj.description}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Experience</Text>
        {data.experience?.length ? (
          data.experience.map((exp, index) => (
            <View key={index} style={{ marginBottom: 5 }}>
              <Text style={{ fontWeight: "bold" }}>
                {exp.title} at {exp.company}
              </Text>
              <Text style={{ fontSize: 10, color: "gray" }}>{exp.years}</Text>
              <Text>{exp.description}</Text>
            </View>
          ))
        ) : (
          <Text>No experience added</Text>
        )}
      </View>
    </Page>
  </Document>
);

export default ResumePDF;
