import React, { useState, useMemo, Suspense } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Template1 from "./templates/Template1"; // Ensure this uses @react-pdf/renderer components

const ResumePreview = ({ resumeData }) => {
  const memoizedResumeData = useMemo(() => resumeData, [resumeData]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Live Resume Preview</h2>

      <Suspense fallback={<p>Loading preview...</p>}>
        <PDFViewer width="100%" height="500px" className="border rounded">
          <Template1 data={memoizedResumeData} />
        </PDFViewer>
      </Suspense>
    </div>
  );
};

export default ResumePreview;
