import React, { useState } from 'react';
import { Search, FileDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';

const FollowUp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const claims = [
    {
      applicationType: 'Post',
      applicationNumber: '6140123012',
      allocationDate: '03-02-2025',
      allocationDateTime: '11:27:43am',
      laName: 'DINESHJAGDISHKAITHWAS',
      proposerName: '',
      idDetails: '',
      gender: '',
      dateOfBirth: '',
      nomineeName: 'JAGDISH SURAJPAL KAITHWAS',
      nomineeDoB: '',
      relWithNominee: '',
      address: 'NEAR V T CONVENT-PLOT NO 85 85 PLOT AREA JOGI'
    },
    {
      applicationType: 'Post',
      applicationNumber: '6140125480',
      allocationDate: '03-02-2025',
      allocationDateTime: '11:27:43am',
      laName: 'MINA DAS',
      proposerName: '',
      idDetails: '',
      gender: '',
      dateOfBirth: '',
      nomineeName: 'BIJU NEOG',
      nomineeDoB: '',
      relWithNominee: '',
      address: 'SECTOR 1 PART NOONMATI-KAMRUP METRO KAMRU'
    },
    {
      applicationType: 'Post',
      applicationNumber: '6140126361',
      allocationDate: '03-02-2025',
      allocationDateTime: '11:27:43am',
      laName: 'NITYA GOGOI',
      proposerName: '',
      idDetails: '',
      gender: '',
      dateOfBirth: '',
      nomineeName: 'ADITYA GOGOI',
      nomineeDoB: '',
      relWithNominee: '',
      address: 'S O THUKESWAR GOGOI PO DOOM DOOMA-VILL TCA DOOMA DIST TINSUKIA'
    },
    {
      applicationType: 'Post',
      applicationNumber: '6140152208',
      allocationDate: '03-02-2025',
      allocationDateTime: '11:27:43am',
      laName: 'DIUPBHAI NAROTTAMBHAI PATEL',
      proposerName: '',
      idDetails: '',
      gender: '',
      dateOfBirth: '',
      nomineeName: 'GEETABEN PATEL',
      nomineeDoB: '',
      relWithNominee: '',
      address: 'D 1 RAJ LAXMI BUNGLOW CITY LIGHT SURAT-SURAT'
    }
  ];

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
                placeholder="Search Claim..."
                className="max-w-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="bg-red-700 hover:bg-red-800" onClick={handleSubmit}>
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
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Application_Type</th>
                  <th className="border p-2 text-left">Application_Number</th>
                  <th className="border p-2 text-left">Allocation_Date</th>
                  <th className="border p-2 text-left">Allocation_Date_Time</th>
                  <th className="border p-2 text-left">LA_Name</th>
                  <th className="border p-2 text-left">Proposer_Name</th>
                  <th className="border p-2 text-left">ID_Details</th>
                  <th className="border p-2 text-left">Gender</th>
                  <th className="border p-2 text-left">Date_of_Birth</th>
                  <th className="border p-2 text-left">Nominee_Name</th>
                  <th className="border p-2 text-left">Nominee_DOB</th>
                  <th className="border p-2 text-left">Rel_With_Nominee</th>
                  <th className="border p-2 text-left">Address</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((claim, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2">{claim.applicationType}</td>
                    <td className="p-2">{claim.applicationNumber}</td>
                    <td className="p-2">{claim.allocationDate}</td>
                    <td className="p-2">{claim.allocationDateTime}</td>
                    <td className="p-2">{claim.laName}</td>
                    <td className="p-2">{claim.proposerName}</td>
                    <td className="p-2">{claim.idDetails}</td>
                    <td className="p-2">{claim.gender}</td>
                    <td className="p-2">{claim.dateOfBirth}</td>
                    <td className="p-2">{claim.nomineeName}</td>
                    <td className="p-2">{claim.nomineeDoB}</td>
                    <td className="p-2">{claim.relWithNominee}</td>
                    <td className="p-2">{claim.address}</td>
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

export default FollowUp;