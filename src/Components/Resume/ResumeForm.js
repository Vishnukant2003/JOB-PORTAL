import React, { useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // For dropdown icons
import TemplateSelector from "./TemplateSelector";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";

const ResumeForm = () => {
  const { register, handleSubmit, watch, control, setValue } = useForm({
    defaultValues: JSON.parse(localStorage.getItem("resumeData")) || {
      name: "",
      role: "",
      email: "",
      phone: "",
      summary: "",
      skills: [{ skill: "" }],
      education: [{ degree: "", institution: "", year: "" }],
      projects: [{ title: "", description: "" }],
      experience: [{ title: "", company: "", years: "", description: "" }],
    },
  });

  const resumeData = watch();
  const printRef = useRef();

  // Handling Field Arrays
  const { fields: skillsFields, append: addSkill, remove: removeSkill } = useFieldArray({ control, name: "skills" });
  const { fields: educationFields, append: addEducation, remove: removeEducation } = useFieldArray({ control, name: "education" });
  const { fields: projectFields, append: addProject, remove: removeProject } = useFieldArray({ control, name: "projects" });
  const { fields: experienceFields, append: addExperience, remove: removeExperience } = useFieldArray({ control, name: "experience" });

  const [selectedTemplate, setSelectedTemplate] = useState("Template1");

  // Collapsible State for Sections
  const [isSkillsOpen, setIsSkillsOpen] = useState(true);
  const [isEducationOpen, setIsEducationOpen] = useState(true);
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  const [isExperienceOpen, setIsExperienceOpen] = useState(true);

  // Save to Local Storage
  const onSubmit = (data) => {
    localStorage.setItem("resumeData", JSON.stringify(data));
    alert("Resume saved successfully!");
  };

  // Load from Local Storage
  const loadSavedResume = () => {
    const savedData = JSON.parse(localStorage.getItem("resumeData"));
    if (savedData) {
      Object.keys(savedData).forEach((key) => setValue(key, savedData[key]));
      alert("Resume loaded successfully!");
    } else {
      alert("No saved resume found!");
    }
  };

  // Handle Resume Print
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "My_Resume",
    onAfterPrint: () => alert("PDF Downloaded Successfully!"),
  });

  // Render Selected Resume Template
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "Template1":
        return <Template1 data={resumeData} />;
      case "Template2":
        return <Template2 data={resumeData} />;
      default:
        return <Template1 data={resumeData} />;
    }
  };

  return (
    <div className="flex">
      {/* Left: Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/3 p-6 bg-[#3d3d3d] shadow-lg text-white"
      >
        <TemplateSelector setSelectedTemplate={setSelectedTemplate} />

        {/* Basic Fields */}
        {["name", "role", "email", "phone", "summary"].map((field) => (
          <input
            key={field}
            {...register(field)}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full p-2 mb-2 border border-[#ffbd20] rounded bg-[#3d3d3d] text-white"
          />
        ))}

        {/* Skills Section */}
        <div className="mt-4">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsSkillsOpen(!isSkillsOpen)}>
            <h3 className="text-[#ffbd20] font-semibold">Skills</h3>
            {isSkillsOpen ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {isSkillsOpen && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {skillsFields.map((item, index) => (
                <div key={item.id} className="flex gap-2 mb-2">
                  <input {...register(`skills.${index}.skill`)} placeholder="Skill" className="w-full p-2 border border-[#ffbd20] rounded bg-[#3d3d3d] text-white" />
                  <button type="button" onClick={() => removeSkill(index)} className="text-red-500">X</button>
                </div>
              ))}
              <button type="button" onClick={() => addSkill({ skill: "" })} className="text-[#ffbd20]">+ Add Skill</button>
            </div>
          )}
        </div>

        {/* Education Section */}
        <div className="mt-4">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsEducationOpen(!isEducationOpen)}>
            <h3 className="text-[#ffbd20] font-semibold">Education</h3>
            {isEducationOpen ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {isEducationOpen && educationFields.map((item, index) => (
            <div key={item.id} className="flex gap-2 mb-2">
              <input {...register(`education.${index}.degree`)} placeholder="Degree" className="w-1/3 p-2 border bg-[#3d3d3d] text-white" />
              <input {...register(`education.${index}.institution`)} placeholder="Institution" className="w-1/3 p-2 border bg-[#3d3d3d] text-white" />
              <input {...register(`education.${index}.year`)} placeholder="Year" className="w-1/4 p-2 border bg-[#3d3d3d] text-white" />
              <button type="button" onClick={() => removeEducation(index)} className="text-red-500">X</button>
            </div>
          ))}
          {isEducationOpen && <button type="button" onClick={() => addEducation({ degree: "", institution: "", year: "" })} className="text-[#ffbd20]">+ Add Education</button>}
        </div>
     {/* Project Section */}
<div className="mt-4">
  <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsProjectsOpen(!isProjectsOpen)}>
    <h3 className="text-[#ffbd20] font-semibold">Projects</h3>
    {isProjectsOpen ? <FaChevronUp /> : <FaChevronDown />}
  </div>

  {isProjectsOpen && (
    <div className="mt-2 space-y-4">
      {projectFields.map((item, index) => (
        <div key={item.id} className="flex flex-col gap-2 bg-[#3d3d3d] p-4 rounded border border-[#ffbd20]">
          <input
            {...register(`projects.${index}.title`)}
            placeholder="Project Title"
            className="p-2 border border-[#ffbd20] rounded bg-[#3d3d3d] text-white"
          />
          <textarea
            {...register(`projects.${index}.description`)}
            placeholder="Project Description"
            className="p-2 border border-[#ffbd20] rounded bg-[#3d3d3d] text-white"
          />
          <button
            type="button"
            onClick={() => removeProject(index)}
            className="self-end text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addProject({ title: "", description: "" })}
        className="text-[#ffbd20] mt-2"
      >
        + Add Project
      </button>
    </div>
  )}
</div>

 

        {/* Experience Section */}
<div className="mt-4">
  <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExperienceOpen(!isExperienceOpen)}>
    <h3 className="text-[#ffbd20] font-semibold">Experience</h3>
    {isExperienceOpen ? <FaChevronUp /> : <FaChevronDown />}
  </div>
  {isExperienceOpen &&
    experienceFields.map((item, index) => (
      <div key={item.id} className="flex gap-2 mb-2">
        <input {...register(`experience.${index}.title`)} placeholder="Job Title" className="w-1/3 p-2 border bg-[#3d3d3d] text-white" />
        <input {...register(`experience.${index}.company`)} placeholder="Company" className="w-1/3 p-2 border bg-[#3d3d3d] text-white" />
        <input {...register(`experience.${index}.years`)} placeholder="Years" className="w-1/4 p-2 border bg-[#3d3d3d] text-white" />
        <textarea {...register(`experience.${index}.description`)} placeholder="Description" className="w-full p-2 border bg-[#3d3d3d] text-white"></textarea>
        <button type="button" onClick={() => removeExperience(index)} className="text-red-500">X</button>
      </div>
    ))
  }
  {isExperienceOpen && <button type="button" onClick={() => addExperience({ title: "", company: "", years: "", description: "" })} className="text-[#ffbd20]">+ Add Experience</button>}
</div>


        {/* Save & Load Buttons */}
        <button type="submit" className="bg-[#ffbd20] text-[#3d3d3d] px-4 py-2 rounded font-semibold mt-4 w-full">Save Resume</button>
        <button type="button" onClick={loadSavedResume} className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full">Load Resume</button>
</form>

      {/* Right: Resume Preview */}
      <div ref={printRef} className="w-[230mm] h-[320mm] text-black bg-white shadow-lg p-[20mm] mx-auto print-a4 overflow-hidden">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumeForm;
