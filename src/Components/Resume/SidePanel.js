import { Button } from "@mantine/core";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const SectionItem = ({ title }) => (
  <li className="flex justify-between items-center p-3 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-200">
    <span>{title}</span>
    <ChevronRight size={18} />
  </li>
);

const BasicDetails = ({ basicDetails, setBasicDetails }) => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold">Basic Details</h3>
    <input type="text" placeholder="Name" className="border p-2 w-full mt-2" value={basicDetails.name} onChange={(e) => setBasicDetails({ ...basicDetails, name: e.target.value })} />
    <input type="email" placeholder="Email" className="border p-2 w-full mt-2" value={basicDetails.email} onChange={(e) => setBasicDetails({ ...basicDetails, email: e.target.value })} />
    <input type="text" placeholder="Phone" className="border p-2 w-full mt-2" value={basicDetails.phone} onChange={(e) => setBasicDetails({ ...basicDetails, phone: e.target.value })} />
  </div>
);

const Skills = ({ skills, setSkills }) => {
  const handleInputChange = (index, field, value) => {
    const updated = [...skills];
    updated[index][field] = value;
    setSkills(updated);
  };

  const addSkill = () => {
    setSkills([...skills, { name: "", level: 50 }]);
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Skills</h3>
      {skills.map((skill, index) => (
        <div key={index} className="flex items-center gap-2 mt-2">
          <input type="text" value={skill.name} onChange={(e) => handleInputChange(index, "name", e.target.value)} className="border rounded p-2 w-full" placeholder="Skill name" />
          <input type="number" value={skill.level} onChange={(e) => handleInputChange(index, "level", e.target.value)} className="border rounded p-2 w-16" min="0" max="100" />
          <button onClick={() => removeSkill(index)} className="text-red-500">✖</button>
        </div>
      ))}
      <button onClick={addSkill} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">+ Add More</button>
    </div>
  );
};

const Education = () => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold">Education</h3>
    <input type="text" placeholder="Degree" className="border p-2 w-full mt-2" />
    <input type="text" placeholder="Institution" className="border p-2 w-full mt-2" />
    <input type="text" placeholder="Year of Completion" className="border p-2 w-full mt-2" />
  </div>
);

const Experience = () => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold">Experience</h3>
    <input type="text" placeholder="Job Title" className="border p-2 w-full mt-2" />
    <input type="text" placeholder="Company" className="border p-2 w-full mt-2" />
    <input type="text" placeholder="Duration" className="border p-2 w-full mt-2" />
  </div>
);

const Projects = () => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold">Projects</h3>
    <input type="text" placeholder="Project Name" className="border p-2 w-full mt-2" />
    <input type="text" placeholder="Description" className="border p-2 w-full mt-2" />
  </div>
);

const Certifications = () => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold">Certifications</h3>
    <input type="text" placeholder="Certification Name" className="border p-2 w-full mt-2" />
    <input type="text" placeholder="Issuing Organization" className="border p-2 w-full mt-2" />
  </div>
);

const SidePanel = ({ onUpdate }) => {
  const sections = ["Basic details", "Skills and expertise", "Education", "Experience", "Projects", "Certifications"];
  
  const [basicDetails, setBasicDetails] = useState({ name: "", email: "", phone: "" });
  const [skills, setSkills] = useState([
    { name: "JavaScript", level: 90 },
    { name: "HTML5", level: 80 },
    { name: "CSS", level: 80 },
  ]);

  return (
    <aside className="w-1/4 bg-[#3d3d3d] text-[#ffbd20] p-4 shadow-md min-h-screen">
      <ul className="space-y-4">
        {sections.map((section, index) => (
          <SectionItem key={index} title={section} />
        ))}
      </ul>
      <BasicDetails basicDetails={basicDetails} setBasicDetails={setBasicDetails} />
      <Skills skills={skills} setSkills={setSkills} />
      <Education />
      <Experience />
      <Projects />
      <Certifications />
      <div className="mt-6 flex justify-center">
        <Button variant="outline" color="dark">RESET ALL EDITS</Button>
      </div>
    </aside>
  );
};

export default SidePanel;
