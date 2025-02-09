import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

const ApplicationDocuments = () => {
  const [documents, setDocuments] = useState({
    aadhar: false,
    pan: false,
    driving: false,
    voter: false,
    proposal: false,
    photo: false,
  });

  const documentList = [
    { id: "aadhar", label: "Aadhar Card" },
    { id: "pan", label: "PAN Card" },
    { id: "driving", label: "Driving License" },
    { id: "voter", label: "Voter ID" },
    { id: "proposal", label: "Proposal Form" },
    { id: "photo", label: "Photo" },
  ];

  const handleCheckboxChange = (id) => {
    setDocuments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    console.log("Files selected:", files);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="w-full">
        <CardContent className="p-6">
          {/* File Upload Label */}
          <div className="mb-6 pb-4 border-b">
            <h2 className="text-2xl font-bold text-left">File Upload</h2>
          </div>

          {/* Document Checklist Section */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4 text-left">Documents Checklist</h3>
            {documentList.map(({ id, label }) => (
              <div key={id} className="flex items-center my-3">
                <input
                  type="checkbox"
                  id={id}
                  checked={documents[id]}
                  onChange={() => handleCheckboxChange(id)}
                  className="w-5 h-5 cursor-pointer"
                />
                <label htmlFor={id} className="ml-3 text-gray-700 cursor-pointer">
                  {label}
                </label>
              </div>
            ))}
          </div>

          {/* Choose File and Upload Button Section */}
          <div className="space-y-4">
            <div className="mb-6 flex items-center justify-between">
              <input
                type="file"
                id="file-upload"
                className="border rounded p-2"
                onChange={handleFileChange}
              />
            </div>

            <div className="flex justify-between space-x-4">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white w-24">
                Upload
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationDocuments;
