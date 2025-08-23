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

// ✅ Normalize string (lowercase + trim)
const normalize = (str) => (str || "").toString().trim().toLowerCase();

// ✅ Convert row object into searchable text
const rowToSearchable = (row) => {
  return Object.values(row).join(" ").toLowerCase();
};

// ✅ Remove duplicates (normalize + multiple identifiers)
const removeDuplicates = (data) => {
  const seen = new Set();

  return data.filter((item) => {
    // normalize all possible keys
    const appNo = 
      item.Application_Number || 
      item.application_number || 
      item["Application No"] || 
      item["application no"] || 
      null;

    const key = appNo ? String(appNo).trim().toLowerCase() : JSON.stringify(item);

    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};


const MIS = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [misData, setMisData] = useState([]);
  const [allData, setAllData] = useState([]); // ✅ store original dataset
  const [loading, setLoading] = useState(false);

  const tokens = normalize(searchQuery).split(' ').filter(Boolean);
  useEffect(() => {
    if (tokens.length === 0) {
      // ✅ Reset to full data if query is empty
      setMisData(removeDuplicates(allData));
    }
  }, [searchQuery, allData])

  useEffect(() => {
    const fetchMISData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/uploads/get-uploaded-csv-data`);
        const uniqueData = removeDuplicates(response.data || []);
        setMisData(uniqueData);
        setAllData(uniqueData); // ✅ keep unfiltered copy
      } catch (error) {
        setMisData([]);
        setAllData([]);
        console.error('Error fetching MIS data:', error);
      }
      setLoading(false);
    };
    fetchMISData();
  }, []);

  // 🔍 Search handler (runs only when button clicked)
  const handleSearch = () => {
    if (!allData || allData.length === 0) return;

    // const tokens = normalize(searchQuery).split(' ').filter(Boolean);

    // if (tokens.length === 0) {
    //   // Reset to full data if query is empty
    //   setMisData(removeDuplicates(allData));
    //   return;
    // }

    const results = allData.filter((row) => {
      const hay = rowToSearchable(row);
      return tokens.every((t) => hay.includes(t));
    });

    setMisData(removeDuplicates(results));
  };

  // Export table data as Excel file
  const handleExport = () => {
  const exportData = misData.map(row => {
    const obj = {};
    MIS_TABLE_HEADERS.forEach(header => {
      obj[header] = renderCell(row, header);  // ✅ Use same resolver
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


  const HEADER_TO_KEYS = {
  // Core fields you mentioned
  "LA_Name": ["name_of_la", "la_name", "Name of LA"],
  "Nominee_Name": ["nominee_name", "Nominee Name"],
  "Rel_With_Nominee": ["nominee_relation", "Nominee Relation"],
  "Date_of_Birth_LA": ["dob_insured_person", "DOB (Insured Person)"],
  "Application_Number": ["application_number", "Application Number"],
  "Application_Type": ["application_type", "Application Type"],
  "Application_Form": ["application_form", "Application Form"],
  "Mobile_No_of_LA": ["mobile_no_of_la", "Mobile No of LA"],
  "State": ["state"],
  "Priority": ["priority"],

  // Add other headers from MIS_TABLE_HEADERS as needed:
  // "Policy_Number": ["policy_number"],
  // "Current Status": ["current_status"],
  // ...
};

// helper: normalize keys to compare flexibly
const norm = (s) =>
  String(s).toLowerCase().replace(/[^a-z0-9]/g, "");

  // Helper to render cell value or NA
  const renderCell = (row, header) => {
  // 1) direct match
  let value = row[header];
  if (value === undefined || value === null || value === "") {
    // 2) alias match
    const aliases = HEADER_TO_KEYS[header] || [];
    for (const alias of aliases) {
      if (row[alias] !== undefined && row[alias] !== null && row[alias] !== "") {
        value = row[alias];
        break;
      }
    }

    // 3) normalized fallback
    if (value === undefined || value === null || value === "") {
      const target = norm(header);
      for (const [k, v] of Object.entries(row)) {
        if (norm(k) === target && v !== null && v !== "") {
          value = v;
          break;
        }
      }
    }
  }

  // ✅ Format ISO date → dd-mm-yyyy
  if (value && typeof value === "string" && /\d{4}-\d{2}-\d{2}T/.test(value)) {
    try {
      const d = new Date(value);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    } catch {
      return value;
    }
  }

  return value || "NA";
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch(); // ✅ Enter to search
                }}
              />
              <Button className="bg-red-700 hover:bg-red-800" onClick={handleSearch}>
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
                onClick={() => console.log('Date range search:', { startDate, endDate })}
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
                  <tr><td colSpan={MIS_TABLE_HEADERS.length} className="text-center font-bold p-4">No data found</td></tr>
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
