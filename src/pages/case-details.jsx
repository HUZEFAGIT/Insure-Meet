import React, { useState, useEffect } from 'react';

const CaseVerificationDetails = ({ applicationNumber, onBack, claimsData }) => {
  const [caseDetails, setCaseDetails] = useState(null);
  const [reportDate, setReportDate] = useState(new Date().toLocaleDateString('en-GB'));
  
  // Sample data for demonstration
  const claims = claimsData || [
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
      address: 'NEAR V T CONVENT-PLOT NO 85 85 PLOT AREA JOGI',
      contactNo: '8295006070',
      permanentAddress: 'S/O PRITAM-BALKRA 79 BALKRA 79-BHIWANI MAURI',
      nomineeNameRelation: 'POONAM POONAM'
    },
    {
      applicationType: 'Post',
      applicationNumber: '6156766451',
      allocationDate: '16-05-2025',
      allocationDateTime: '11:27:43am',
      laName: 'Julee Devi',
      proposerName: '',
      idDetails: '',
      gender: 'Female',
      dateOfBirth: '04-05-1981',
      nomineeName: 'Rajesh Kumar',
      nomineeDoB: '',
      relWithNominee: '',
      address: '123 Main Street, Sector 7, New Delhi',
      contactNo: '9876543210',
      permanentAddress: '456 Park Avenue, Sector 10, Gurgaon',
      nomineeNameRelation: 'Husband'
    }
  ];

  useEffect(() => {
    // Find the matching claim by application number
    if (applicationNumber) {
      const selectedCase = claims.find(claim => claim.applicationNumber === applicationNumber);
      if (selectedCase) {
        setCaseDetails(selectedCase);
      }
    } else {
      // Use first claim as default if no application number provided
      setCaseDetails(claims[0]);
    }
  }, [applicationNumber]);

  const handleExport = () => {
    console.log('Exporting to PDF...');
    // Add export functionality here
  };

  const handleBack = () => {
    if (typeof onBack === 'function') {
      onBack();
    }
  };

  // Custom button component
  const Button = ({ children, onClick, variant, className }) => {
    const baseStyle = "px-4 py-2 rounded font-medium focus:outline-none";
    const variantStyles = {
      primary: "bg-red-700 hover:bg-red-800 text-white",
      outline: "border border-gray-300 bg-white hover:bg-gray-50",
      success: "bg-green-700 hover:bg-green-800 text-white"
    };
    
    const buttonStyle = `${baseStyle} ${variantStyles[variant] || variantStyles.primary} ${className || ''}`;
    
    return (
      <button 
        className={buttonStyle} 
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  // Custom card component
  const Card = ({ children, className }) => {
    return (
      <div className={`bg-white rounded-lg shadow-md ${className || ''}`}>
        {children}
      </div>
    );
  };

  if (!caseDetails) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <p>Loading case details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="w-full">
        <div className="p-6">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Button 
                variant="outline" 
                className="mr-4"
                onClick={handleBack}
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                  Back
                </div>
              </Button>
              <h1 className="text-2xl font-bold">Case Details</h1>
            </div>
            <Button
              variant="primary"
              onClick={handleExport}
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                Export Report
              </div>
            </Button>
          </div>

          {/* Report Header */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold mb-2">DETAILED VIDEO VERIFICATION REPORT (CONFIDENTIAL)</h2>
          </div>

          {/* Basic Information Section */}
          <div className="mb-8">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr>
                  <td className="border p-2 w-1/2 font-medium">Investigation Agency Name</td>
                  <td className="border p-2 w-1/2">Radiaant</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium">Application/Policy Number</td>
                  <td className="border p-2">{caseDetails.applicationNumber}</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium">Case Entrustment Date</td>
                  <td className="border p-2">{caseDetails.allocationDate}</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium">Date of Verification</td>
                  <td className="border p-2">{reportDate}</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium">Time of Investigation</td>
                  <td className="border p-2">{caseDetails.allocationDateTime || "Not specified"}</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium">Report Submission Date</td>
                  <td className="border p-2">{reportDate}</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium">Verification Done With</td>
                  <td className="border p-2">Video Call</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Profile Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-2">(A) Profile of LA (as per investigation)</h3>
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr>
                  <td className="border p-2 w-14 text-center">1</td>
                  <td className="border p-2 w-1/2 font-medium">Life Insured Name</td>
                  <td className="border p-2">{caseDetails.laName}</td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">2</td>
                  <td className="border p-2 font-medium">DOB/Age</td>
                  <td className="border p-2">{caseDetails.dateOfBirth || "Not specified"}</td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">3</td>
                  <td className="border p-2 font-medium">Native Place</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">4</td>
                  <td className="border p-2 font-medium">Marital Status</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">5</td>
                  <td className="border p-2 font-medium">Education Qualification</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">6</td>
                  <td className="border p-2 font-medium">Occupation Type</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">7</td>
                  <td className="border p-2 font-medium">Employer Name/Trade Name</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">8</td>
                  <td className="border p-2 font-medium">Dept. Name/Designation</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">9</td>
                  <td className="border p-2 font-medium">Exact Nature of job/duty</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">10</td>
                  <td className="border p-2 font-medium">Years in Working / Business</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">11</td>
                  <td className="border p-2 font-medium">Income / Salary (Per Annum)</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">12</td>
                  <td className="border p-2 font-medium">Does customer has any vehicle, if yes, type of vehicle</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">13</td>
                  <td className="border p-2 font-medium">Other Life or Health Insurance</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">14</td>
                  <td className="border p-2 font-medium">Interest in Adventurous Sports</td>
                  <td className="border p-2"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Health Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-2">(B) Habits & Health of Life Assured (as per investigation)</h3>
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr>
                  <td className="border p-2 w-14 text-center">15</td>
                  <td className="border p-2 w-1/2 font-medium">Habits and duration</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">16</td>
                  <td className="border p-2 font-medium">H/O OPD/Admission/Surgery/Accident</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">17</td>
                  <td className="border p-2 font-medium">Family Physician Details</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">18</td>
                  <td className="border p-2 font-medium">Medication Preference</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">19</td>
                  <td className="border p-2 font-medium">Is, the LA taking any medicines/under treatment? If yes, details of medication.</td>
                  <td className="border p-2"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Family Details Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-2">(C) Family Details (as per investigation)</h3>
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr>
                  <td className="border p-2 w-14 text-center">20</td>
                  <td className="border p-2 w-1/2 font-medium">Family members count & relation</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">21</td>
                  <td className="border p-2 font-medium">No. of Dependent</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">22</td>
                  <td className="border p-2 font-medium">Total Family Income</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">23</td>
                  <td className="border p-2 font-medium">Family Health History</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">24</td>
                  <td className="border p-2 font-medium">Family Life/Health Policy</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">25</td>
                  <td className="border p-2 font-medium">Political Relation</td>
                  <td className="border p-2"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Additional Details Section - NEWLY ADDED */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-2">(D) IMPORTANT ADDITIONAL DETAILS</h3>
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr>
                  <td className="border p-2 w-14 text-center">26</td>
                  <td className="border p-2 w-1/2 font-medium">Contact No. & Alternate No.</td>
                  <td className="border p-2">{caseDetails.contactNo || ""}</td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">27</td>
                  <td className="border p-2 font-medium">Email ID/Alternate Email ID</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">28</td>
                  <td className="border p-2 font-medium">Permanent Address</td>
                  <td className="border p-2">{caseDetails.permanentAddress || ""}</td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">29</td>
                  <td className="border p-2 font-medium">Communication Address</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">30</td>
                  <td className="border p-2 font-medium">Type of Address</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">31</td>
                  <td className="border p-2 font-medium">Nominee Name/Relation</td>
                  <td className="border p-2">{caseDetails.nomineeNameRelation || ""}</td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">32</td>
                  <td className="border p-2 font-medium">Nominee DOB</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">33</td>
                  <td className="border p-2 font-medium">Nominee Occupation & Income</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">34</td>
                  <td className="border p-2 font-medium">Advisor relation to LA/How policy source to LA</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">35</td>
                  <td className="border p-2 font-medium">Sum Assured, Premium amount/mode</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">36</td>
                  <td className="border p-2 font-medium">Policy Term & Prem. Paying Term</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">37</td>
                  <td className="border p-2 font-medium">Who is paying premium</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">38</td>
                  <td className="border p-2 font-medium">Have you investigated same customer for other insurance company</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">39</td>
                  <td className="border p-2 font-medium">Details of investigation findings in peer company</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2 text-center">40</td>
                  <td className="border p-2 font-medium">Conclusion of the case as per investigation</td>
                  <td className="border p-2"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Policies with other Insurance Companies Section - NEWLY ADDED */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-2">Policies with other Insurance Companies:</h3>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border p-2">S. No.</th>
                  <th className="border p-2">Company Name</th>
                  <th className="border p-2">Policy No.</th>
                  <th className="border p-2">DOC</th>
                  <th className="border p-2">SA</th>
                  <th className="border p-2">Annual Premium</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 text-center">NA</td>
                  <td className="border p-2">NA</td>
                  <td className="border p-2">NA</td>
                  <td className="border p-2">NA</td>
                  <td className="border p-2">NA</td>
                  <td className="border p-2">NA</td>
                  <td className="border p-2">NA</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Observations Section - NEWLY ADDED */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-2">OBSERVATIONS OF THE INVESTIGATORS (incorporating point below):</h3>
            <div className="border p-4 min-h-32">
              {/* This is an empty textarea-like area for observations */}
            </div>
          </div>
          
          {/* Screenshots Section - NEWLY ADDED */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-2">Screenshots:</h3>
            
            {/* LA/PH Live Photograph during Video Verification */}
            <div className="mb-6">
              <h4 className="text-base font-medium mb-2 text-center">LA/PH Live Photograph during Video Verification</h4>
              <div className="border p-2 flex justify-center items-center bg-gray-50 h-64">
                <div className="bg-gray-200 w-48 h-48 flex justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* KYC of LA/PH */}
            <div className="mb-6">
              <h4 className="text-base font-medium mb-2 text-center">KYC of LA/PH</h4>
              <div className="border p-2 flex justify-center items-center bg-gray-50 h-64">
                <div className="bg-gray-200 w-48 h-48 flex justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Social Media Checks of LA/PH */}
            <div className="mb-6">
              <h4 className="text-base font-medium mb-2 text-center">Social Media Checks of LA/PH</h4>
              <div className="border p-2 flex justify-center items-center bg-gray-50 h-64">
                <div className="bg-gray-200 w-48 h-48 flex justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3"/>
                    <circle cx="6" cy="12" r="3"/>
                    <circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Other documents */}
            <div className="mb-6">
              <h4 className="text-base font-medium mb-2 text-center">Other documents (as per checklist) of LA/PH without geo tagging</h4>
              <div className="border p-2 flex justify-center items-center bg-gray-50 h-64">
                <div className="bg-gray-200 w-48 h-48 flex justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={handleBack}>
              Cancel
            </Button>
            <Button variant="success">
              Submit Report
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CaseVerificationDetails;