import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardContent } from '../components/ui/card';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [csvData, setCsvData] = useState([]);

  const fetchAndParseCSV = async () => {
    try {
      // Fetch the data from the API
      const response = await axios.get('http://localhost:4000/api/uploads');
      
      // Filter the records by title "Upload Bulk Data"
      const filteredData = response.data.filter(record => record.title === "Upload Bulk Data");
  
      // Loop through all filtered records and parse the files
      const parsedData = [];
      
      for (const record of filteredData) {
        for (const file of record.files) {
          const filePath = file.path;
  
          // You would typically send the file to the server or process it locally.
          // For this example, we assume you can fetch the file from the server.
          
          // Fetch the file (if it's available via URL)
          const fileResponse = await axios.get(`http://localhost:4000/${filePath}`, { responseType: 'arraybuffer' });
  
          // Parse the Excel file
          const workbook = XLSX.read(fileResponse.data, { type: 'array' });
          
          // Assuming the file has one sheet, you can adjust this based on the sheet structure.
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          
          // Convert the sheet to JSON
          const jsonData = XLSX.utils.sheet_to_json(sheet);
          
          parsedData.push({ fileName: file.originalname, data: jsonData });
        }
      }
      setCsvData(parsedData[0].data)
      console.log(parsedData[0].data); // Output parsed data
      
    } catch (error) {
      console.error('Error processing the files:', error);
    }
  };
  

  useEffect(() => {
    fetchAndParseCSV();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="w-full">
        <CardContent className="p-6">
          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <Link to={"/upload-claims-page"}>
              <Button className="bg-red-700 hover:bg-red-800">Add Bulk</Button>
            </Link>
            <Link to={"/upload-rec-form"}>
              <Button className="bg-red-700 hover:bg-red-800">Upload Record</Button>
            </Link>
          </div>

          {/* Search Section */}
          <div className="mb-6 text-center">
            <h2 className="text-lg mb-4">
              Search Application details with the help of Application No./Applicant Name/ Application Reported Date/Current Status
            </h2>
            <div className="flex justify-center gap-2">
              <Input
                type="text"
                placeholder="Search Application"
                className="max-w-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="bg-red-700 hover:bg-red-800">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {/* Data Section */}
          <div className="space-y-4">
            {csvData.map((row, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="col-span-1 md:col-span-1">
                    <span className="font-medium">{index + 1}</span>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <span className="font-medium">{row.Application_Number}</span>
                  </div>
                  <div className="col-span-1 md:col-span-3">
                    <span className="font-medium">{row.Proposer_Name}</span>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <div>{row.Allocation_Date} <br /> {row.Allocation_Date_Time}</div>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <div className="flex flex-col gap-2">
                      <Link to={"/application-documents"}>
                        <Button className="bg-red-700 hover:bg-red-800 w-full">Documents</Button>
                      </Link>
                      <Link to={"/call-management"}>
                        <Button className="bg-red-700 hover:bg-red-800 w-full">Call Management</Button>
                      </Link>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <div className="flex flex-col gap-2">
                      <Button className="bg-red-700 hover:bg-red-800 w-full">SMS</Button>
                      <Button className="bg-red-700 hover:bg-red-800 w-full">Join Video Meet</Button>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <div className="flex flex-col gap-2">
                      <Button className="bg-red-700 hover:bg-red-800 w-full">UPLOAD</Button>
                      <Button className="bg-red-700 hover:bg-red-800 w-full">PLAY</Button>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-1 text-blue-600">
                    <span className="font-medium">{row.Current_Status}</span>
                  </div>
                  <div className="col-span-1 md:col-span-1">
                    <span>{row.Require_Action_Reason}</span>
                  </div>
                  <div className="col-span-1 md:col-span-1">
                    <span>{row.Report_Status}</span>
                  </div>
                  <div className="col-span-1 md:col-span-1">
                    <span>{row.Observation}</span>
                  </div>
                  <div className="col-span-1 md:col-span-1">
                    <Link to={"/case-details"}>
                    <Button className="bg-red-700 hover:bg-red-800 w-full">Case Details</Button>
                    </Link>
                  </div>
                  <div className="col-span-1 md:col-span-1">
                    <Button className="bg-red-700 hover:bg-red-800 w-full">Edit</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Homepage;