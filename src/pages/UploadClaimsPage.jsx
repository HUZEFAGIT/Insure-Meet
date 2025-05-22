import React, { useState } from 'react'; // ✅ Import useState
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import axios from 'axios'; // ✅ Import axios (you can install if not installed: npm i axios)
import { toast } from 'react-hot-toast';

const UploadClaimsPage = () => {
  const [selectedFiles, setSelectedFiles] = useState({}); // ✅ Keep selected files per section

  const handleFileChange = (section, event) => {
    console.log(`File(s) selected for ${section}`, event.target.files);
    setSelectedFiles(prev => ({
      ...prev,
      [section]: event.target.files,
    }));
  };

  const handleUpload = async (section) => {
    console.log(`Uploading files for ${section}`);
    const files = selectedFiles[section];
  
    if (!files || files.length === 0) {
      console.log('No files selected for upload');
      toast.error('No files selected for upload!');
      return;
    }
  
    const formData = new FormData();
    formData.append('title', section);
  
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
  
    try {
      const response = await axios.post('http://localhost:4000/api/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Upload successful:', response.data);
      toast.success('Files uploaded successfully!');
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error('Error uploading files!');
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
          Choose Files
        </Button>
        <input
          type="file"
          id={`file-${title}`}
          className="hidden"
          multiple
          onChange={(e) => handleFileChange(title, e)}
        />
        <span className="text-gray-500 text-sm">
          {selectedFiles[title]?.length > 0
            ? `${selectedFiles[title].length} file(s) selected`
            : 'No file chosen'}
        </span>
      </div>

      <Button
        className="bg-red-700 hover:bg-red-800 text-white w-24 mt-4"
        onClick={() => handleUpload(title)}
      >
        Upload
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="w-full">
        <CardContent className="p-6">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadClaimsPage;
