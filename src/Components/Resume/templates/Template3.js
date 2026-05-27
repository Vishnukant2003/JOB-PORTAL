import React from "react";

const Template3 = ({ data }) => {
  return (
    <div className="grid grid-cols-2 gap-4 border-2 border-gray-300 p-6 bg-white">
      <div>
        <h1 className="text-3xl font-bold">{data.name || "John Doe"}</h1>
        <h2 className="text-xl text-gray-600">{data.role || "Web Developer"}</h2>
        <p>{data.email || "john.doe@example.com"} | {data.phone || "123-456-7890"}</p>

        <h3 className="text-lg font-bold mt-4">Skills</h3>
        <p>{data.skills || "React, Tailwind, Node.js"}</p>
      </div>

      <div>
      <h3 className="text-lg font-bold mt-4">Experience</h3>
<ul className="list-disc ml-4">
  {data.experience?.map((exp, index) => (
    <li key={index}>
      <strong>{exp.title}</strong> at {exp.company} ({exp.years}): {exp.description}
    </li>
  ))}
</ul>

<h3 className="text-lg font-bold mt-4">Experience</h3>
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

        <h3 className="text-lg font-bold mt-4">Projects</h3>
        <ul className="list-disc ml-4">
          {data.projects.map((proj, index) => (
            <li key={index} className="mb-1">
              <strong>{proj.title}</strong>: {proj.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Template3;
