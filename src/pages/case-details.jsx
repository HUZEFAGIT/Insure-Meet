import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // <-- import useNavigate


const questionsData = [
  { id: 1, question: "Process" }, { id: 2, question: "Phone Number" },
  { id: 3, question: "Verifier name" }, { id: 4, question: "Name of Person Met / Attended video call" },
  { id: 5, question: "Relation with Applicant" }, { id: 6, question: "ID Card Seen" },
  { id: 7, question: "ID Card Number PAN/Aadhar No." }, { id: 8, question: "Native Place" },
  { id: 9, question: "Marital Status" }, { id: 10, question: "Applicant DOB / Age" },
  { id: 11, question: "Education Qualification" }, { id: 12, question: "Occupation Type" },
  { id: 13, question: "Employer Name/Trade Name" }, { id: 14, question: "Dept. Name/Designation" },
  { id: 15, question: "Exact Nature of job/duty" }, { id: 16, question: "Years in Working / Business" },
  { id: 17, question: "Income / Salary (Per Annum)" }, { id: 18, question: "Does customer has any vehicle, if yes, type of vehicle" },
  { id: 19, question: "Other Life or Health Insurance" }, { id: 20, question: "Interest in Adventurous Sports" },
  { id: 21, question: "Habits and duration" }, { id: 22, question: "Do you have any medical ailment..." },
  { id: 23, question: "Any h/o- accident, disability or handicapped" }, { id: 24, question: "Family Physician Details" },
  { id: 25, question: "Medication Preference" }, { id: 26, question: "Is the LA taking any medicines?" },
  { id: 27, question: "Family members count & relation" }, { id: 28, question: "No. of Dependent" },
  { id: 29, question: "Total Family Income" }, { id: 30, question: "Family Health History" },
  { id: 31, question: "Family Life/Health Policy" }, { id: 32, question: "Political Relation" },
  { id: 33, question: "Communication Address" }, { id: 34, question: "Type of Address" },
  { id: 35, question: "Nominee Occupation & Income" }, { id: 36, question: "Advisor relation to LA/How policy source to LA" },
  { id: 37, question: "Sum Assured, Premium amount/mode" }, { id: 38, question: "Policy Term & Prem. Paying Term" },
  { id: 39, question: "Who is paying premium" }, { id: 40, question: "Have you investigated same customer for other insurance company" },
  { id: 41, question: "Details of investigation findings in peer company" },
  { id: 42, question: "Conclusion of the case as per investigation" },
  { id: 43, question: "Compiled Report" },
  { id: 44, question: "Status - Positive/Negative/Neutral" },
];

// ResultPage Component, summary
function ResultPage({ data, onBack }) {
  const { name, email, applicationNumber, reportData } = data || {};
  const { responses, applicantDetails, finalConclusion, finalObservation } = reportData || {};

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Report Submitted Successfully</h2>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Back to Cases
          </button>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-green-700 font-medium">Report has been successfully submitted for review</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Submission Details</h3>
            <div className="space-y-2">
              <p><strong>Investigator Name:</strong> {name || 'Not provided'}</p>
              <p><strong>Email:</strong> {email || 'Not provided'}</p>
              <p><strong>Application Number:</strong> {applicationNumber || 'Not provided'}</p>
              <p><strong>Submission Date:</strong> {new Date().toLocaleDateString('en-GB')}</p>
              <p><strong>Submission Time:</strong> {new Date().toLocaleTimeString()}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Next Steps</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Your report will be reviewed by the quality assurance team</p>
              <p>• You will receive a confirmation email within 24 hours</p>
              <p>• Any queries regarding this report will be communicated via email</p>
              <p>• Report reference number will be sent to your registered email</p>
            </div>
          </div>
        </div>

        {reportData && (
          <>
            {/* Report Summary */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Report Summary</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Total Questions:</p>
                    <p className="text-lg font-bold text-blue-600">{questionsData.length}</p>
                  </div>
                  <div>
                    <p className="font-medium">Flagged Items:</p>
                    <p className="text-lg font-bold text-red-600">
                      {Object.values(responses || {}).filter((r) => r?.flag).length}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Status:</p>
                    <p className="text-lg font-bold text-green-600">Submitted</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Applicant Details,summary */}
            {Object.keys(applicantDetails || {}).length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Applicant Details</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {Object.entries(applicantDetails).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <p className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</p>
                        <p>{value || 'Not provided'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Final Conclusion and Observation,summary */}
            {(finalConclusion || finalObservation) && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Final Remarks</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-4">
                    {finalConclusion && (
                      <div>
                        <p className="font-medium">Final Conclusion:</p>
                        <p className="text-sm">{finalConclusion}</p>
                      </div>
                    )}
                    {finalObservation && (
                      <div>
                        <p className="font-medium">Final Observation:</p>
                        <p className="text-sm">{finalObservation}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const Casedetailspage = ({
  applicationNumber = null,
  onBack = () => console.log('Back clicked'),
  claimsData = null,
  submissionData = {}
}) => {
  const [caseDetails, setCaseDetails] = useState(null);
  const [reportDate] = useState(new Date().toLocaleDateString('en-GB'));
  const [showResultPage, setShowResultPage] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const printableRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate(); 
  const submissionDataFromLocation = location.state?.submissionData;

  const {
    applicantDetails = {},
    uploadedFiles = {},
    imagePreviews = {},
    responses = {},
    finalConclusion = '',
    finalObservation = '',
  } = submissionDataFromLocation || submissionData;

  const documents = [
    'Aadhaar Card (with QR Code Scan Snapshot)', 'Pan Card', 'Voter Card', 'Driving license',
    'Passport', 'Ration Card', 'Job Card', 'ITR', 'Salary Slip', 'Bank Statement',
    'Live Photo of customer & house with Geo Tagging', 'Medical records', 'Social Media Profile',
    'Vehicle Registration Details'
  ];

  const defaultDetails = [
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
    }
  ];

  const details = claimsData || defaultDetails;

  useEffect(() => {
    if (applicationNumber) {
      const selectedCase = details.find(claim => claim.applicationNumber === applicationNumber);
      setCaseDetails(selectedCase || details[0]);
    } else {
      setCaseDetails(details[0]);
    }
  }, [applicationNumber]);

  const handleExport = () => {
    // Create Excel-like data structure
    const exportData = [];
    
    // Basic Information
    exportData.push(['DETAILED VIDEO VERIFICATION REPORT (CONFIDENTIAL)']);
    exportData.push([]);
    exportData.push(['Basic Information']);
    exportData.push(['Investigation Agency Name', 'Radiaant']);
    exportData.push(['Application/Policy Number', caseDetails?.applicationNumber || '']);
    exportData.push(['Case Entrustment Date', caseDetails?.allocationDate || '']);
    exportData.push(['Date of Verification', reportDate]);
    exportData.push(['Time of Investigation', caseDetails?.allocationDateTime || 'Not specified']);
    exportData.push(['Report Submission Date', reportDate]);
    exportData.push(['Verification Done With', 'Video Call']);
    
    // Applicant Details
    if (Object.keys(applicantDetails).length > 0) {
      exportData.push([]);
      exportData.push(['Applicant Details']);
      Object.entries(applicantDetails).forEach(([key, value]) => {
        exportData.push([key.replace(/([A-Z])/g, ' $1').trim(), value || '—']);
      });
    } else {
      exportData.push(['LA Name', caseDetails?.laName || '']);
    }
    
    // Verification Responses
    exportData.push([]);
    exportData.push(['Verification Responses']);
    exportData.push(['#', 'Question', 'Answer', 'Remark', 'Flag']);
    
    questionsData.forEach(({ id, question }) => {
      const response = responses[id] || {};
      exportData.push([
        id,
        question,
        response.answer || '—',
        response.remark || '—',
        response.flag ? '✔' : '—'
      ]);
    });

    // Policies with Other Insurance Companies
    exportData.push([]);
    exportData.push(['Policies with Other Insurance Companies']);
    exportData.push(['S. No.', 'Company Name', 'Policy No.', 'DOC', 'SA', 'Annual Premium', 'Status']);
    exportData.push(['NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA']);

    // Documents Checklist
    exportData.push([]);
    exportData.push(['Check List']);
    exportData.push(['S. No.', 'Documents', 'Policy Holder', 'Life Assured']);
    
    documents.forEach((doc, index) => {
      exportData.push([
        index + 1,
        doc,
        responses[index]?.policyHolder ? '✔' : '—',
        responses[index]?.lifeAssured ? '✔' : '—'
      ]);
    });

    // Declaration
    // exportData.push([]);
    // exportData.push(['DECLARATION:']);
    // exportData.push(['Investigator name & contact number:', '']);
    // exportData.push(['Agency Name:', 'RADIAANT Captive India Pvt. Ltd.']);
    // exportData.push(['Declaration Text:', 'I, do hereby solemnly affirm and above-mentioned contents are true and correct to the best of knowledge and nothing is concealed therein. All the contents are true as per documents collected.']);

    // Convert to CSV format
    const csvContent = exportData.map(row => 
      row.map(cell => 
        typeof cell === 'string' && cell.includes(',') ? `"${cell}"` : cell
      ).join(',')
    ).join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Case_Details${caseDetails?.applicationNumber || 'Unknown'}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmitReport = () => {
    // Prepare the data to be passed to ResultPage
    const submissionInfo = {
      name: 'John Investigator', // This could come from user input or session
      email: 'investigator@radiaant.com', // This could come from user input or session
      applicationNumber: caseDetails?.applicationNumber,
      reportData: {
        responses,
        applicantDetails,
        finalConclusion,
        finalObservation
      }
    };
    
    setSubmittedData(submissionInfo);
    setShowResultPage(true);
  };

  const handleBackFromResult = () => {
    setShowResultPage(false);
    setSubmittedData(null);
    // Optionally call the original onBack function
    onBack();
  };

  const handleBack = () => {
    navigate('/video-ver'); // <-- navigate to video verification page
  };

  const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
    const baseStyle = "px-4 py-2 rounded font-medium focus:outline-none transition-colors cursor-pointer";
    const variantStyles = {
      primary: "bg-red-700 hover:bg-red-800 text-white",
      outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700",
      success: "bg-green-700 hover:bg-green-800 text-white",
      blue: "bg-blue-600 hover:bg-blue-700 text-white"
    };
    const buttonStyle = `${baseStyle} ${variantStyles[variant]} ${className}`;
    return (
      <button className={buttonStyle} onClick={onClick}>
        {children}
      </button>
    );
  };

  const Card = ({ children, className = '' }) => {
    return (
      <div className={`bg-white rounded-lg shadow-md ${className}`}>
        {children}
      </div>
    );
  };

  const formatKey = (key) => {
    return key.replace(/([A-Z])/g, ' $1').trim();
  };

  const ImagePlaceholder = ({ label }) => {
    const getIcon = () => {
      if (label.includes('Photograph')) {
        return (
          <>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </>
        );
      } else if (label.includes('KYC')) {
        return (
          <>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </>
        );
      } else if (label.includes('Social Media')) {
        return (
          <>
            <circle cx="18" cy="5" r="3"/>
            <circle cx="6" cy="12" r="3"/>
            <circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </>
        );
      } else {
        return (
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        );
      }
    };

    return (
      <div className="bg-gray-200 w-48 h-48 flex justify-center items-center rounded">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-12 h-12 text-gray-500" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {getIcon()}
        </svg>
      </div>
    );
  };

  // Show ResultPage if submission is complete
  if (showResultPage) {
    return <ResultPage data={submittedData} onBack={handleBackFromResult} />;
  }

  if (!caseDetails) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading case details...</p>
        </div>
      </div>
    );
  }
  

  return (
   
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Add print-specific styles */}
      <style>
        {`
          @media print {
            @page {
              margin: 1;
            }
            body {
              margin: 1;
            }
            .print\\:hidden {
              display: none !important;
            }
            .min-h-screen {
              min-height: auto;
            }
            .bg-gray-50 {
              background: none;
            }
            .shadow-md {
              box-shadow: none;
            }
            .rounded-lg {
              border-radius: 0;
            }
            .p-4, .p-6 {
              padding: 0;
            }
            .max-w-7xl {
              max-width: none;
              width: 100%;
            }
            /* Ensure tables fit the page */
            table {
              width: 100%;
              font-size: 10pt;
            }
             Avoid page breaks inside tables 
            table, tr, td, th {
              page-break-inside: avoid;
            }
            /* Remove unnecessary margins and paddings */
            .mb-8 {
              margin-bottom: 1rem;
            }
              
          }
        `}
      </style>
    <Card className="w-full max-w-7xl mx-auto">
        {/* Header Section - Hidden in Print */}
        <div className="p-6 print:hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center">
              DETAILED VIDEO VERIFICATION REPORT (CONFIDENTIAL)
            </h2>
            {/* <h1 className="text-xl sm:text-2xl font-bold">Case Details - Video Verification Report</h1> */}
            <Button variant="primary" onClick={handleExport} className="shrink-0">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                Export to Excel
              </div>
            </Button>
          </div>
        </div>

        <div className="text-base leading-relaxed text-white-800 text-justify px-9">
              <p>
                This is the transcript of the answers provided by the Insured verbally to the questions asked below in a video verification 
                by the Investigating team on behalf of <span className="underline">Radiaant Captive India Pvt. Ltd.</span> Insurance Company Limited.
                The answers provided by the Life to be assured would form a part of the proposal for Insurance. The company has accepted the 
                answers provided in utmost good faith and thereby issued the policy. The Company reserves the right to repudiate any claim arising out of this policy in the event of impersonation or any 
                misstatement / misrepresentation and / or suppression of material information found either in the said verification or 
                in the application form.
              </p>
            </div>

        {/* Printable Content */}
        <div className="p-6 print:p-5" ref={printableRef}>
          {/* Report Header */}
          {/* <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center">
              DETAILED VIDEO VERIFICATION REPORT (CONFIDENTIAL)
            </h2>
          </div> */}

          {/* Basic Information Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Basic Information</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3 w-1/2 font-medium bg-gray-50">Investigation Agency Name</td>
                    <td className="border border-gray-300 p-3 w-1/2">Radiaant</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium bg-gray-50">Application/Policy Number</td>
                    <td className="border border-gray-300 p-3">{caseDetails.applicationNumber}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium bg-gray-50">Case Entrustment Date</td>
                    <td className="border border-gray-300 p-3">{caseDetails.allocationDate}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium bg-gray-50">Date of Verification</td>
                    <td className="border border-gray-300 p-3">{reportDate}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium bg-gray-50">Time of Investigation</td>
                    <td className="border border-gray-300 p-3">{caseDetails.allocationDateTime || "Not specified"}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium bg-gray-50">Report Submission Date</td>
                    <td className="border border-gray-300 p-3">{reportDate}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium bg-gray-50">Verification Done With</td>
                    <td className="border border-gray-300 p-3">Video Call</td>
                  </tr>
                </tbody>
              </table>
              <table className="w-full border-collapse text-sm">
                <tbody>
                  {Object.keys(applicantDetails).length > 0 ? (
                    Object.entries(applicantDetails).map(([key, value]) => (
                      <tr key={key}>
                        <td className="border border-gray-300 p-3 w-1/2 font-medium bg-gray-50 capitalize">
                          {formatKey(key)}:
                        </td>
                        <td className="border border-gray-300 p-3">{value || '—'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="border border-gray-300 p-3 w-1/2 font-medium bg-gray-50">LA Name:</td>
                      <td className="border border-gray-300 p-3">{caseDetails.laName}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Verification Responses */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Verification Responses</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 p-3 w-16">#</th>
                    <th className="border border-gray-300 p-3 text-left">Question</th>
                    <th className="border border-gray-300 p-3">Answer</th>
                    <th className="border border-gray-300 p-3">Remark</th>
                    <th className="border border-gray-300 p-3 w-16">Flag</th>
                  </tr>
                </thead>
                <tbody>
                  {questionsData.map(({ id, question }) => (
                    <tr key={id} className={responses[id]?.flag ? 'bg-red-50' : ''}>
                      <td className="border border-gray-300 p-3 text-center">{id}</td>
                      <td className="border border-gray-300 p-3">{question}</td>
                      <td className="border border-gray-300 p-3 text-center">{responses[id]?.answer || '—'}</td>
                      <td className="border border-gray-300 p-3">{responses[id]?.remark || '—'}</td>
                      <td className="border border-gray-300 p-3 text-center">{responses[id]?.flag ? '✔' : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Policies with Other Insurance Companies */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Policies with Other Insurance Companies</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 p-3">S. No.</th>
                    <th className="border border-gray-300 p-3">Company Name</th>
                    <th className="border border-gray-300 p-3">Policy No.</th>
                    <th className="border border-gray-300 p-3">DOC</th>
                    <th className="border border-gray-300 p-3">SA</th>
                    <th className="border border-gray-300 p-3">Annual Premium</th>
                    <th className="border border-gray-300 p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3 text-center">NA</td>
                    <td className="border border-gray-300 p-3">NA</td>
                    <td className="border border-gray-300 p-3">NA</td>
                    <td className="border border-gray-300 p-3">NA</td>
                    <td className="border border-gray-300 p-3">NA</td>
                    <td className="border border-gray-300 p-3">NA</td>
                    <td className="border border-gray-300 p-3">NA</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Uploaded Images */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Screenshots and Uploaded Images</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {/* ID Proofs - Dynamic Grid */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Upload ID Proof</h4>
                <div className="border border-gray-300 p-2 bg-gray-50 rounded flex justify-center items-center min-h-64">
                  {Array.isArray(imagePreviews['Upload ID Proof']) && imagePreviews['Upload ID Proof'].length > 0 ? (
                    <div
                      className={`grid gap-2`}
                      style={{
                        gridTemplateColumns: `repeat(${Math.min(imagePreviews['Upload ID Proof'].length, 2)}, minmax(0, 1fr))`,
                        gridTemplateRows: imagePreviews['Upload ID Proof'].length > 2 ? 'repeat(2, 1fr)' : '1fr',
                        width: '100%',
                        maxWidth: '400px',
                        minHeight: '192px',
                      }}
                    >
                      {imagePreviews['Upload ID Proof'].slice(0, 4).map((src, idx) => (
                        <img
                          key={idx}
                          src={src}
                          alt={`ID Proof ${idx + 1}`}
                          className="object-cover w-full h-40 rounded border"
                          style={{ aspectRatio: '1/1', minWidth: 0 }}
                          onError={e => { e.target.style.display = 'none'; }}
                        />
                      ))}
                    </div>
                  ) : (
                    <ImagePlaceholder label="Upload ID Proof" />
                  )}
                </div>
              </div>

              {/* Other Images as before */}
              {['Upload Face Comparison', 'Upload Full Image', 'Upload Other Images', 'Social Media Check'].map((label) => (
                <div key={label} className="space-y-2">
                  <h4 className="text-sm font-medium">{label}</h4>
                  <div className="border border-gray-300 p-2 flex justify-center items-center bg-gray-50 h-64 rounded">
                    {imagePreviews[label] ? (
                      <img 
                        src={imagePreviews[label]} 
                        alt={`${label} preview`} 
                        className="w-48 h-48 object-cover rounded border"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : (
                      <ImagePlaceholder label={label} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents Checklist */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Check List</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 p-3 w-16">S. No.</th>
                    <th className="border border-gray-300 p-3 text-left">Documents</th>
                    <th className="border border-gray-300 p-3 w-32">Policy Holder</th>
                    <th className="border border-gray-300 p-3 w-32">Life Assured</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-3 text-center">{index + 1}</td>
                      <td className="border border-gray-300 p-3">{doc}</td>
                      <td className="border border-gray-300 p-3 text-center">
                        {submissionDataFromLocation?.documentSelections?.[index] === 'Policy Holder' ? '✔' : '—'}
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {submissionDataFromLocation?.documentSelections?.[index] === 'Life Assured' ? '✔' : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Declaration Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">DECLARATION:</h3>
            <div className="border border-gray-300 p-4 bg-gray-50 rounded">
              <div className="space-y-2 text-sm mb-4">
                <p><strong>Investigator name & contact number:</strong></p>
                <p><strong>Agency Name:</strong> RADIAANT Captive India Pvt. Ltd.</p>
              </div>
              <p className="text-sm leading-relaxed">
                I, do hereby solemnly affirm and above-mentioned contents are true and correct to the best of knowledge and nothing is concealed therein. All the contents are true as per documents collected.
              </p>
            </div>
          </div> 

          

          {/* Action Buttons */}
         <div className="print:hidden">
            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button variant="blue" onClick={() => window.print()}>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 6 2 18 2 18 9" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <polyline points="6 14 18 14 18 22 6 22 6 14" />
                  </svg>
                  Print
                </div>
              </Button>
              <Button variant="success" onClick={handleSubmitReport}>
                Submit Report
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default Casedetailspage;