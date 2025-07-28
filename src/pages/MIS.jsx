import React, { useState, useEffect } from 'react';
import { Search, FileDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const MIS_TABLE_HEADERS = [
  "Application_Type", "Application_Number", "Policy_Number", "LA_Name", "Proposer_Name",
  "Case Allocation_Date", "Case Allocation_Time", "ID_Details", "Gender", "Date_of_Birth_LA",
  "Nominee_Name", "Nominee_DOB", "Rel_With_Nominee", "Address", "City", "State",
  "Contact_Number", "Alternate_Contact_Number", "Email_ID", "Application_Form", "KYC_Status",
  "Face_Match", "Scheduling_Date", "Calling_Date_time", "Calling_Disposition", "TelephonyNotes",
  "Call_Scheduling Support", "Video_Ops_Support", "Appointment_Date_Client", "Appointment_Time_Client",
  "Current Status", "Conclusion", "Observation", "Completion_Date", "TAT", "Priority",
  "Actionable", "Require_Action_Reason", "Billed", "Billing_Date", "Billing_Month",
  "Billing Amount", "Payment Received_Date"
];

const MIS = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [misData, setMisData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMISData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:4000/api/uploads/get-uploaded-csv-data');
        setMisData(response.data || []);
      } catch (error) {
        setMisData([]);
        console.error('Error fetching MIS data:', error);
      }
      setLoading(false);
    };
    fetchMISData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search submitted:', { searchQuery, startDate, endDate });
  };

  // Helper to render cell value or NA
  const renderCell = (row, key) => {
    // Try both original and lowercased keys for flexibility
    if (row[key] !== undefined && row[key] !== null && row[key] !== "") {
      return row[key];
    }
    // Try lowercased key with underscores replaced
    const altKey = key.replace(/ /g, '_').toLowerCase();
    if (row[altKey] !== undefined && row[altKey] !== null && row[altKey] !== "") {
      return row[altKey];
    }
    return "NA";
  };

  // Export table data as Excel file
  const handleExport = () => {
    // Prepare data for export: ensure all columns are present and missing values are 'NA'
    const exportData = misData.map(row => {
      const obj = {};
      MIS_TABLE_HEADERS.forEach(header => {
        // Try both original and lowercased keys
        if (row[header] !== undefined && row[header] !== null && row[header] !== "") {
          obj[header] = row[header];
        } else {
          const altKey = header.replace(/ /g, '_').toLowerCase();
          obj[header] = (row[altKey] !== undefined && row[altKey] !== null && row[altKey] !== "") ? row[altKey] : "NA";
        }
      });
      return obj;
    });
    const worksheet = XLSX.utils.json_to_sheet(exportData, { header: MIS_TABLE_HEADERS });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'MIS Data');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'MIS_Data.xlsx');
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

          {/* MIS Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-100 whitespace-nowrap">
                  {MIS_TABLE_HEADERS.map((header) => (
                    <th key={header} className="border p-2">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={MIS_TABLE_HEADERS.length} className="text-center p-4">Loading...</td></tr>
                ) : misData.length === 0 ? (
                  <tr><td colSpan={MIS_TABLE_HEADERS.length} className="text-center p-4">No data found</td></tr>
                ) : (
                  misData.map((row, idx) => (
                    <tr key={row.id || idx} className="hover:bg-gray-50">
                      {MIS_TABLE_HEADERS.map((header) => (
                        <td key={header} className="border p-2">{renderCell(row, header)}</td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MIS;
