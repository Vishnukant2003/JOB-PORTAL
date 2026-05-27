import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFRender2 from "./PDFRender2"; // Ensure this is correctly set up

const Template2 = ({ data }) => {
  return (
    <>
    <div className="w-full border-2 border-gray-300 bg-white flex">
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-800 text-white p-6">
        <h1 className="text-2xl font-bold">{data.name || "John Doe"}</h1>
        <p className="text-lg">{data.role || "Web Developer"}</p>
        <hr className="my-2 border-gray-500" />
        <p>Email: {data.email || "john.doe@example.com"}</p>
        <p>Phone: {data.phone || "123-456-7890"}</p>
        <hr className="my-2 border-gray-500" />
           {/* Summary Section */}
        <h3 className="text-lg  font-bold ">Summary</h3>
        
        <p className="mb-4">{data.summary || "Experienced web developer..."}</p>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-6">
      

        {/* Skills Section */}
        <h3 className="text-lg font-bold bg-gray-200 p-2">Skills</h3>
        <div className="grid grid-cols-3 gap-2 my-2">
          {data.skills?.length > 0 ? (
            data.skills.map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 rounded">
                {skill.skill}
              </span>
            ))
          ) : (
            <p>No skills added</p>
          )}
        </div>

        {/* Education Section */}
        <h3 className="text-lg font-bold bg-gray-200 p-2">Education</h3>
        <ul className="list-disc ml-4">
          {data.education?.length > 0 ? (
            data.education.map((edu, index) => (
              <li key={index}>
                <strong>{edu.degree}</strong> - {edu.institution} ({edu.year})
              </li>
            ))
          ) : (
            <p>No education details added</p>
          )}
        </ul>

        {/* Projects Section */}
        <h3 className="text-lg font-bold bg-gray-200 p-2 mt-4">Projects</h3>
        <ul className="list-disc ml-4">
          {data.projects?.length > 0 ? (
            data.projects.map((proj, index) => (
              <li key={index}>
                <strong>{proj.title}</strong>: {proj.description}
              </li>
            ))
          ) : (
            <p>No projects added</p>
          )}
        </ul>

        {/* Experience Section */}
        <h3 className="text-lg font-bold bg-gray-200 p-2 mt-4">Experience</h3>
        <div>
          {data.experience?.length > 0 ? (
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
    </div>

    
    <div className="p-5">
      <PDFDownloadLink document={<PDFRender2 data={data} />} fileName="Resume_Template2.pdf">
        {({ loading }) => (
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            {loading ? "Generating PDF..." : "Download PDF"}
          </button>
        )}
      </PDFDownloadLink>
    </div>
    </>
  );
};

export default Template2;
