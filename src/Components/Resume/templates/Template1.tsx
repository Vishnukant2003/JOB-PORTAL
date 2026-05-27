import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "./PDFRender"; // Ensure this is correctly set up

// Define TypeScript Interface for Resume Data
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

// Define Props Interface
interface Template1Props {
  data: ResumeData;
}

const Template1: React.FC<Template1Props> = ({ data }) => {
  return (
    <div>
      <div className="w-full p-6 border-2 border-gray-300 bg-white">
        <h1 className="text-3xl font-bold">{data.name || "John Doe"}</h1>
        <h2 className="text-xl text-gray-600">{data.role || "Web Developer"}</h2>
        <p>{data.email || "john.doe@example.com"} | {data.phone || "123-456-7890"}</p>

        <hr className="my-3 border-gray-400" />

        {/* Summary Section */}
        <h3 className="text-lg bg-gray-200 font-bold">Summary</h3>
        <p>{data.summary || "Experienced web developer with a passion for coding."}</p>

        {/* Skills Section */}
        <h3 className="text-lg font-bold bg-gray-200 mb-2 mt-4">Skills</h3>
        <div className="grid grid-cols-3 gap-1">
          {data.skills && data.skills.length > 0 ? (
            data.skills.map((skill, index) => (
              <div key={index} className="px-2 py-1 text-left">
                {skill.skill}
              </div>
            ))
          ) : (
            <p>No skills added</p>
          )}
        </div>

        {/* Education Section */}
        <h3 className="text-lg font-bold bg-gray-200 mt-4">Education</h3>
        <ul className="list-disc ml-4">
          {data.education?.map((edu, index) => (
            <li key={index}>
              <strong>{edu.degree}</strong> - {edu.institution} ({edu.year})
            </li>
          )) || <p>No education details added</p>}
        </ul>

        {/* Projects Section */}
        <h3 className="text-lg font-bold bg-gray-200 mt-4">Projects</h3>
        <ul className="list-disc ml-4">
          {data.projects?.map((proj, index) => (
            <li key={index}>
              <strong>{proj.title}</strong>: {proj.description}
            </li>
          )) || <p>No projects added</p>}
        </ul>

        {/* Experience Section */}
        <h3 className="text-lg font-bold bg-gray-200 mt-4">Experience</h3>
        <div>
          {data.experience && data.experience.length > 0 ? (
            data.experience.map((exp, index) => (
              <div key={index} className="border p-3 mb-2 rounded-md shadow-md">
                <h4 className="font-semibold">{exp.title} at {exp.company}</h4>
                <p className="text-sm text-gray-600">{exp.years}</p>
                <p>{exp.description}</p>
              </div>
            ))
          ) : (
            <p>No experience added</p>
          )}
        </div>
      </div>

      {/* Download PDF Button */}
      <div className="p-5">
        <PDFDownloadLink document={<ResumePDF data={data} />} fileName="Resume.pdf">
          {({ loading }) => (
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              {loading ? "Generating PDF..." : "Download PDF"}
            </button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default Template1;
