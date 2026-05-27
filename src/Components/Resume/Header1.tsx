import { useState } from "react";
import template1 from "./ResumeImages/template1.jpg";
import template2 from "./ResumeImages/template2.png";

interface Template {
  id: number;
  name: string;
  image: string;
}

const templates: Template[] = [
  { id: 1, name: "Template 1", image: template1 },
  { id: 2, name: "Template 2", image: template2 },
];

const Header: React.FC = () => {
  const [showTemplates, setShowTemplates] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template.id);
    setShowTemplates(false);
  };

  return (
    <header className="bg-[#3d3d3d] text-[#ffbd20] flex justify-between items-center p-4 shadow-md relative">
      <h1 className="text-2xl font-bold">Professional Resume</h1>
      <div className="flex gap-4 items-center">
        {/* Templates Button */}
        <div className="relative">
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="border border-[#ffbd20] px-4 py-2 rounded hover:bg-[#ffbd20] hover:text-[#3d3d3d]"
          >
            Templates
          </button>

          {/* Dropdown for Template Selection */}
          {showTemplates && (
            <div className="absolute top-12 left-0 bg-white shadow-md p-4 rounded-lg w-64 z-10">
              <h3 className="text-[#3d3d3d] font-semibold mb-3 text-center">Choose Template</h3>
              <div className="flex flex-col gap-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`flex flex-col items-center cursor-pointer p-2 rounded ${
                      selectedTemplate === template.id ? "bg-[#ffbd20] text-[#3d3d3d]" : "hover:bg-gray-200"
                    }`}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <img src={template.image} alt={template.name} className="w-32 h-40 rounded shadow-md" />
                    <span className="mt-2 font-medium">{template.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Other Buttons */}
        <button className="border border-[#ffbd20] px-4 py-2 rounded hover:bg-[#ffbd20] hover:text-[#3d3d3d]">
          Export
        </button>
        <button className="border border-[#ffbd20] px-4 py-2 rounded hover:bg-[#ffbd20] hover:text-[#3d3d3d]">
          Import
        </button>
      </div>
    </header>
  );
};

export default Header;
