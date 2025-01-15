import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardHeader, CardContent } from '../components/ui/card'

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const sampleData = [
    {
      srNo: 1,
      applicationNo: '6140587611',
      applicantName: 'UPENDRA KUMAR GUPTA',
      reportedDate: '27-12-2024',
      reportedTime: '03:01:48pm',
      currentStatus: 'Not Completed',
      requireAction: 'Not answering any calls.',
      status: 'Suspend',
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="w-full">
        <CardContent className="p-6">
          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <Button className="bg-red-700 hover:bg-red-800">Add Bulk record</Button>
            <Button className="bg-red-700 hover:bg-red-800">Upload Record</Button>
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

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Sr No</th>
                  <th className="border p-2 text-left">APPLICATION #</th>
                  <th className="border p-2 text-left">APPLICANT NAME</th>
                  <th className="border p-2 text-left">APPLICATION REPORTED DATE AND TIME</th>
                  <th className="border p-2 text-left">Form AND CALL MANAGEMENT</th>
                  <th className="border p-2 text-left">SEND INVITATION</th>
                  <th className="border p-2 text-left">RECORDED VIDEO</th>
                  <th className="border p-2 text-left">CURRENT STATUS</th>
                  <th className="border p-2 text-left">REQUIRE_ACTION</th>
                  <th className="border p-2 text-left">STATUS</th>
                  <th className="border p-2 text-left">OBSERVATION</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map((row) => (
                  <tr key={row.srNo} className="hover:bg-gray-50">
                    <td className="border p-2">{row.srNo}</td>
                    <td className="border p-2">{row.applicationNo}</td>
                    <td className="border p-2">{row.applicantName}</td>
                    <td className="border p-2">
                      {row.reportedDate}<br/>
                      {row.reportedTime}
                    </td>
                    <td className="border p-2">
                      <div className="flex flex-col gap-2">
                        <Button className="bg-red-700 hover:bg-red-800 w-full">Documents</Button>
                        <Button className="bg-red-700 hover:bg-red-800 w-full">Call Management</Button>
                      </div>
                    </td>
                    <td className="border p-2">
                      <div className="flex flex-col gap-2">
                        <Button className="bg-red-700 hover:bg-red-800 w-full">SMS</Button>
                        <Button className="bg-red-700 hover:bg-red-800 w-full">Join Video Meet</Button>
                      </div>
                    </td>
                    <td className="border p-2">
                      <div className="flex flex-col gap-2">
                        <Button className="bg-red-700 hover:bg-red-800 w-full">UPLOAD</Button>
                        <Button className="bg-red-700 hover:bg-red-800 w-full">PLAY</Button>
                      </div>
                    </td>
                    <td className="border p-2 text-blue-600">{row.currentStatus}</td>
                    <td className="border p-2">{row.requireAction}</td>
                    <td className="border p-2">{row.status}</td>
                    <td className="border p-2">
                      <Button className="bg-red-700 hover:bg-red-800 w-full">Observation</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Homepage;