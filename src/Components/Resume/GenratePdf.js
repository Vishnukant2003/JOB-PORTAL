import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Template1 = ({ data }) => {
  const resumeRef = useRef(); 

  const handleDownload = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: "Resume",
  });

  return (
    <div>
      <div ref={resumeRef} className="w-full p-6 border-2 border-gray-300 bg-white">
        <h1 className="text-3xl font-bold">{data.name || "John Doe"}</h1>
        <h2 className="text-xl text-gray-600">{data.role || "Web Developer"}</h2>
        <p>{data.email || "john.doe@example.com"} | {data.phone || "123-456-7890"}</p>

        <hr className="my-3 border-gray-400" />

        <h3 className="text-lg bg-gray-200 font-bold">Summary</h3>
        <p>{data.summary || "Experienced web developer with a passion for coding."}</p>

        {/* Skills Section */}
        <h3 className="text-lg font-bold bg-gray-200 mb-2 mt-4">Skills</h3>
        <div className="grid grid-cols-3 gap-1">
          {Array.isArray(data.skills) && data.skills.length > 0 ? (
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
          {data.education.map((edu, index) => (
            <li key={index}>
              <strong>{edu.degree}</strong> - {edu.institution} ({edu.year})
            </li>
          ))}
        </ul>

        {/* Projects Section */}
        <h3 className="text-lg font-bold bg-gray-200 mt-4">Projects</h3>
        <ul className="list-disc ml-4">
          {data.projects.map((proj, index) => (
            <li key={index}>
              <strong>{proj.title}</strong>: {proj.description}
            </li>
          ))}
        </ul>

        {/* Experience Section */}
        <h3 className="text-lg font-bold  bg-gray-200 mt-4">Experience</h3>
        <div>
          {Array.isArray(data.experience) && data.experience.length > 0 ? (
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
      <button 
        onClick={handleDownload} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default Template1;