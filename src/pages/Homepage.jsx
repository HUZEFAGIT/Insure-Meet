import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

const ROWS_OPTIONS = [15, 30, 50, 100];

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [csvData, setCsvData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // ✅ will drive the table
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const navigate = useNavigate();

  // ---- helpers for robust search ----
  const normalize = (s) =>
    (s ?? '')
      .toString()
      .normalize('NFD') // strip accents
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();

  const formatDateVariants = (d) => {
    if (!d) return [];
    try {
      const dt = new Date(d);
      // include a few common variations users might type
      return [
        dt.toLocaleDateString(),                    // system locale
        dt.toLocaleDateString('en-IN'),             // dd/mm/yyyy (India)
        dt.toISOString().slice(0, 10),              // yyyy-mm-dd
      ].map(normalize);
    } catch {
      return [];
    }
  };

  const rowToSearchable = (row) => {
    const parts = [
      row.application_number,
      row.name_of_la,
      row.application_type,
      row.application_form,
      row.priority,            // assuming this is “Current Status”
      row.state,
      row.address,
      row.mobile_no_of_la,
    ];

    // add multiple date renderings to help match user input
    parts.push(...formatDateVariants(row.dob_insured_person));

    return normalize(parts.filter(Boolean).join(' '));
  };
  // -----------------------------------

  // ✅ Remove duplicates by Application Number
  const removeDuplicates = (arr) => {
    const seen = new Set();
    return arr.filter((item) => {
      if (!item.application_number) return true; // keep if no number
      if (seen.has(item.application_number)) return false; // skip duplicate
      seen.add(item.application_number);
      return true;
    });
  };

  // Fetch data directly from API
  const fetchAndParseCSV = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/uploads/get-uploaded-csv-data`);
      const data = response.data || [];
      setCsvData(data);
      setFilteredData(data); // ✅ initialize filtered data
      const uniqueData = removeDuplicates(response.data); // ✅ remove dups
      setData(uniqueData);
      setFilteredData(uniqueData);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error processing the files:', error);
    }
    setLoading(false);
  };

// ✅ Load CSV only once on mount
useEffect(() => {
  fetchAndParseCSV();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

useEffect(() => {
  if (searchQuery.trim() === '') {
    setFilteredData(removeDuplicates(csvData));
    setCurrentPage(1);
  }
}, [searchQuery, csvData]);

// 🔍 Search handler (runs only when button clicked)
const handleSearch = () => {
  if (!csvData || csvData.length === 0) return;

  const tokens = normalize(searchQuery).split(' ').filter(Boolean);

  if (tokens.length === 0) {
    setFilteredData(removeDuplicates(csvData)); // reset to full data
    setCurrentPage(1);
    return;
  }

  const results = csvData.filter((row) => {
    const hay = rowToSearchable(row);
    return tokens.every((t) => hay.includes(t));
  });

  setFilteredData(removeDuplicates(results));
  setCurrentPage(1);
};

  // Pagination logic (use filteredData)
  const totalRows = filteredData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // Handlers
  const handleVideoVerification = (row) => {
    navigate('/video-verification', { state: { applicantDetails: row } });
    setTimeout(() => {
      console.log('Video-verification row:', row);
    }, 0);
  };

  const handleCaseDetails = (row) => {
    navigate('/case-details');
    setTimeout(() => {
      console.log('Case Details row:', row);
    }, 0);
  };

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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch(); // ✅ Enter to search
                }}
              />
              <Button className="bg-red-700 hover:bg-red-800" onClick={handleSearch}>
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {/* Loader */}
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <ClipLoader color="#b91c1c" size={60} />
            </div>
          ) : (
            <>
              {/* Table Pagination Controls */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  Rows per page:&nbsp;
                  <select
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                    className="border rounded px-2 py-1"
                  >
                    {ROWS_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Button
                    className="mr-2"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </Button>
                  <span>
                    Page {currentPage} of {totalPages || 1}
                  </span>
                  <Button
                    className="ml-2"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    Next
                  </Button>
                </div>
                <div>
                  Showing {paginatedData.length} of {totalRows} records
                </div>
              </div>

              {/* Data Section with Table Header */}
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-2">
                  <thead>
                    <tr className="bg-gray-100 text-xs font-bold text-gray-700">
                      <th className="px-2 py-2 text-left">Sr No</th>
                      <th className="px-2 py-2 text-left">Application Type</th>
                      <th className="px-2 py-2 text-left">Application Number</th>
                      <th className="px-2 py-2 text-left">Name of LA</th>
                      <th className="px-2 py-2 text-left">DOB (Insured Person)</th>
                      <th className="px-2 py-2 text-left">Nominee Name</th>
                      <th className="px-2 py-2 text-left">Nominee Relation</th>
                      <th className="px-2 py-2 text-left">Address</th>
                      <th className="px-2 py-2 text-left">State</th>
                      <th className="px-2 py-2 text-left">Mobile No of LA</th>
                      <th className="px-2 py-2 text-left">Application Form</th>
                      <th className="px-2 py-2 text-left">Observation</th> 
                      <th className="px-2 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((row, index) => (
                      <tr key={row.id ?? `${row.application_number}-${index}`} className="bg-white hover:bg-gray-50">
                        <td className="px-2 py-2">{index + 1 + (currentPage - 1) * rowsPerPage}</td>
                        <td className="px-2 py-2">{row.application_type}</td>
                        <td className="px-2 py-2">{row.application_number}</td>
                        <td className="px-2 py-2">{row.name_of_la}</td>
                        <td className="px-2 py-2">
                          {row.dob_insured_person ? new Date(row.dob_insured_person).toLocaleDateString('en-IN') : ''}
                        </td>
                        <td className="px-2 py-2">{row.nominee_name}</td>
                        <td className="px-2 py-2">{row.nominee_relation}</td>
                        <td className="px-2 py-2">{row.address}</td>
                        <td className="px-2 py-2">{row.state}</td>
                        <td className="px-2 py-2">{row.mobile_no_of_la}</td>
                        <td className="px-2 py-2">{row.application_form}</td>
                        <td className="px-2 py-2">{row.priority}</td>
                        <td className="px-2 py-2 flex gap-2">
                          <Button className="bg-red-700 hover:bg-red-800" onClick={() => handleVideoVerification(row)}>Video-verification</Button>
                          <Button className="bg-red-700 hover:bg-red-800" onClick={() => handleCaseDetails(row)}>Case Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Homepage;
