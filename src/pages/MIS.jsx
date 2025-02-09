import React, { useState } from 'react';
import { Search, FileDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';


const MIS = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search submitted:', { searchQuery, startDate, endDate });
  };

  const handleExport = () => {
    console.log('Exporting to Excel...');
    // Add export functionality here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="w-full">
        <CardContent className="p-6">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-left">All Cases</h1>
            <Button 
              className="bg-red-700 hover:bg-red-800"
              onClick={handleExport}
            >
              <FileDown className="w-4 h-4 mr-2" />
              Export to Excel
            </Button>
          </div>

          {/* Search Section */}
          <div className="mb-8">
            <h2 className="text-lg text-center mb-4">
              Search claim details with the help of Application No./LA_Name/Allocation_Date/Current Status
            </h2>
            <div className="flex justify-center gap-2 mb-8">
              <Input
                type="text"
                placeholder="Search User Details"
                className="max-w-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="bg-red-700 hover:bg-red-800">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>

            {/* Date Range Section */}
            <div className="flex justify-center items-center gap-4">
              <div className="flex items-center gap-2">
                <label htmlFor="startDate">Start Date</label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-40"
                />
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="endDate">End Date</label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-40"
                />
              </div>

              <Button 
                className="bg-red-700 hover:bg-red-800"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Application_No</th>
                  <th className="border p-2 text-left">Application_Number</th>
                  <th className="border p-2 text-left">Allocation_Date</th>
                  <th className="border p-2 text-left">Allocation_Time</th>
                  <th className="border p-2 text-left">Proposer_Name</th>
                  <th className="border p-2 text-left">ID_Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border p-2">-</td>
                  <td className="border p-2">-</td>
                  <td className="border p-2">14-02-2024</td>
                  <td className="border p-2">10:30 AM</td>
                  <td className="border p-2">-</td>
                  <td className="border p-2">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MIS;