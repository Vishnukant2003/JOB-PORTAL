import React from "react";

interface TemplateSelectorProps {
  setSelectedTemplate: (template: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ setSelectedTemplate }) => {
  return (
    <div className="mb-4">
      <label className="block text-white font-semibold">Select Template</label>
      <select
        onChange={(e) => setSelectedTemplate(e.target.value)}
        className="border border-[#ffbd20] p-2 rounded w-full bg-[#3d3d3d] text-white"
      >
        <option value="Template1">Default</option>
        <option value="Template2">Modern</option>
      </select>
    </div>
  );
};

export default TemplateSelector;
