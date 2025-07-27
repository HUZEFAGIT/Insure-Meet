import React, { useState } from 'react'; // ✅ Import useState
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import axios from 'axios'; // ✅ Import axios (you can install if not installed: npm i axios)
import { toast } from 'react-hot-toast';

const UploadClaimsPage = () => {
  const [selectedFiles, setSelectedFiles] = useState({}); // ✅ Keep selected files per section
  const [isLoading, setIsLoading] = useState(false);
  const handleFileChange = (section, event) => {
    const file = event.target.files[0]; // Only allow one file
    setSelectedFiles(prev => ({
      ...prev,
      [section]: file,
    }));
  };

  const handleUpload = async (section) => {
    setIsLoading(true);
    const file = selectedFiles[section];
    if (!file) {
      toast.error('No file selected for upload!');
      return;
    }
    const formData = new FormData();
    formData.append('file', file); // Use 'file' as the field name
    formData.append('title', section);
    try {
      const response = await axios.post('http://localhost:4000/api/uploads/uploadcsv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsLoading(false);
      toast.success('File uploaded successfully!');
    } catch (error) {
      setIsLoading(false);
      toast.error('Error uploading file!');
    }
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
          Choose File
        </Button>
        <input
          type="file"
          id={`file-${title}`}
          className="hidden"
          onChange={(e) => handleFileChange(title, e)}
        />
        <span className="text-gray-500 text-sm">
          {selectedFiles[title] ? selectedFiles[title].name : 'No file chosen'}
        </span>
      </div>
      <Button
        className="bg-red-700 hover:bg-red-800 text-white w-24 mt-4"
        onClick={() => handleUpload(title)}
      >
        {isLoading ? 'Uploading...' : 'Upload'}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="w-full displa">
        <CardContent className="p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-left">Upload Claims</h2>
            <div className="border-t border-gray-200 mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 align-items-center">
            <UploadSection title="Upload Bulk Data" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadClaimsPage;
