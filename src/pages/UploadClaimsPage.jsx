import React from 'react';
import { Button } from '../components/ui/button';

const UploadClaimsPage = () => {
  const handleFileChange = (section) => {
    console.log(`File selected for ${section}`);
  };

  const handleUpload = (section) => {
    console.log(`Uploading files for ${section}`);
  };

  const UploadSection = ({ title, required = false }) => (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        {required && <span className="text-red-500">*</span>}
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          className="bg-white border-gray-300 hover:bg-gray-50 text-gray-700 w-full"
          onClick={() => document.getElementById(`file-${title}`).click()}
        >
          Choose Files
        </Button>
        <input
          type="file"
          id={`file-${title}`}
          className="hidden"
          onChange={() => handleFileChange(title)}
          multiple
        />
        <span className="text-gray-500 text-sm">No file chosen</span>
      </div>

      <Button
        className="bg-blue-500 hover:bg-blue-600 text-white w-24 mt-4"
        onClick={() => handleUpload(title)}
      >
        Upload
      </Button>
    </div>
  );

  return (
    <div className="bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-left">Upload Claims</h2>
          <div className="border-t border-gray-200 mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UploadSection title="Upload Bulk Data" />
          <UploadSection title="Upload On Time Images" />

          <UploadSection title="Upload Bulk Full Image" required={true} />
          <UploadSection title="Upload Bulk Face Match" />

          <div className="md:col-span-1">
            <UploadSection title="Upload Bulk Other Documents" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadClaimsPage;
