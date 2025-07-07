import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardContent } from '../components/ui/card';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { ClipLoader } from 'react-spinners';

const ROWS_OPTIONS = [15, 30, 50, 100];

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const fetchAndParseCSV = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/api/uploads');
      const filteredData = response.data.filter(record => record.title === "Upload Bulk Data");
      const parsedData = [];
      for (const record of filteredData) {
        for (const file of record.files) {
          const filePath = file.path;
          const fileResponse = await axios.get(`http://localhost:4000/${filePath}`, { responseType: 'arraybuffer' });
          const workbook = XLSX.read(fileResponse.data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet);
          parsedData.push({ fileName: file.originalname, data: jsonData });
        }
      }
      setCsvData(parsedData[0]?.data || []);
      setCurrentPage(1); // Reset to first page on new data
    } catch (error) {
      console.error('Error processing the files:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAndParseCSV();
  }, []);

  // Pagination logic
  const totalRows = csvData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginatedData = csvData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when rows per page changes
  };

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

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
                      <th className="px-2 py-2 text-left">APPLICATION #</th>
                      <th className="px-2 py-2 text-left">APPLICANT NAME</th>
                      <th className="px-2 py-2 text-left">APPLICATION REPORTED DATE<br/>AND TIME</th>
                      <th className="px-2 py-2 text-left">APPLICATION Form<br/>AND CALL MANAGEMENT</th>
                      <th className="px-2 py-2 text-left">SEND INVITATION</th>
                      <th className="px-2 py-2 text-left">CURRENT STATUS</th>
                      <th className="px-2 py-2 text-left">REQUIRE_ACTION</th>
                      <th className="px-2 py-2 text-left">REPORT STATUS</th>
                      <th className="px-2 py-2 text-left">OBSERVATION</th>
                      <th className="px-2 py-2 text-left">COMPILED REPORT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((row, index) => (
                      <tr key={index + (currentPage - 1) * rowsPerPage} className="bg-white hover:bg-gray-50">
                        <td className="px-2 py-2">{index + 1 + (currentPage - 1) * rowsPerPage}</td>
                        <td className="px-2 py-2">{row.Application_Number}</td>
                        <td className="px-2 py-2">{row.Proposer_Name}</td>
                        <td className="px-2 py-2">
                          {row.Allocation_Date}<br />{row.Allocation_Date_Time}
                        </td>
                        <td className="px-2 py-2">
                          <div className="flex flex-col gap-2">
                            <Link to={"/application-documents"}>
                              <Button className="bg-red-700 hover:bg-red-800 w-full">Documents</Button>
                            </Link>
                            <Link to={"/call-management"}>
                              <Button className="bg-red-700 hover:bg-red-800 w-full">Call Management</Button>
                            </Link>
                          </div>
                        </td>
                        <td className="px-2 py-2">
                          <div className="flex flex-col gap-2">
                            <Button className="bg-red-700 hover:bg-red-800 w-full">SMS</Button>
                            <Button className="bg-red-700 hover:bg-red-800 w-full">Join Video Meet</Button>
                          </div>
                        </td>
                        <td className="px-2 py-2 text-blue-600 font-medium">{row.Current_Status}</td>
                        <td className="px-2 py-2">{row.Require_Action_Reason}</td>
                        <td className="px-2 py-2">{row.Report_Status}</td>
                        <td className="px-2 py-2">{row.Observation}</td>
                        <td className="px-2 py-2">
                          <Link
                            to="/case-details"
                            state={{ caseDetails: row }}
                          >
                            <Button className="bg-red-700 hover:bg-red-800 w-full">CASE DETAILS</Button>
                          </Link>
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