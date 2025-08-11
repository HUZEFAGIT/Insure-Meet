import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import { useNavigate, useLocation } from 'react-router-dom';

const questionsData = [
  { id: 1, question: "Process" },
  { id: 2, question: "Phone Number" },
  { id: 3, question: "Verifier name" },
  { id: 4, question: "Name of Person Met / Attended video call" },
  { id: 5, question: "Relation with Applicant" },
  { id: 6, question: "ID Card Seen" },
  { id: 7, question: "ID Card Number PAN/Aadhar No." },
  { id: 8, question: "Native Place" },
  { id: 9, question: "Marital Status" },
  { id: 10, question: "Applicant DOB / Age" },
  { id: 11, question: "Education Qualification" },
  { id: 12, question: "Occupation Type" },
  { id: 13, question: "Employer Name/Trade Name" },
  { id: 14, question: "Dept. Name/Designation" },
  { id: 15, question: "Exact Nature of job/duty" },
  { id: 16, question: "Years in Working / Business" },
  { id: 17, question: "Income / Salary (Per Annum)" },
  { id: 18, question: "Does customer has any vehicle, if yes, type of vehicle" },
  { id: 19, question: "Other Life or Health Insurance" },
  { id: 20, question: "Interest in Adventurous Sports" },
  { id: 21, question: "Habits and duration" },
  { id: 22, question: "Do you have any medical ailment..." },
  { id: 23, question: "Any h/o- accident, disability or handicapped" },
  { id: 24, question: "Family Physician Details" },
  { id: 25, question: "Medication Preference" },
  { id: 26, question: "Is the LA taking any medicines?" },
  { id: 27, question: "Family members count & relation" },
  { id: 28, question: "No. of Dependent" },
  { id: 29, question: "Total Family Income" },
  { id: 30, question: "Family Health History" },
  { id: 31, question: "Family Life/Health Policy" },
  { id: 32, question: "Political Relation" },
  { id: 33, question: "Communication Address" },
  { id: 34, question: "Type of Address" },
  { id: 35, question: "Nominee Occupation & Income" },
  { id: 36, question: "Advisor relation to LA/How policy source to LA" },
  { id: 37, question: "Sum Assured, Premium amount/mode" },
  { id: 38, question: "Policy Term & Prem. Paying Term" },
  { id: 39, question: "Who is paying premium" },
  { id: 40, question: "Have you investigated same customer for other insurance company" },
  { id: 41, question: "Details of investigation findings in peer company" },
  { id: 42, question: "Conclusion of the case as per investigation" },
  { id: 43, question: "Compiled Report" },
  { id: 44, question: "Status - Positive/Negative/ Neutral" },
];

// Document list for the documents section
const documentsList = [
  'Aadhaar', 'PAN', 'Voter Card', 'Driving Licence', 'Passport', 'Ration Card', 'Job Card', 'ITR', 'Salary Slip', 'Bank Statement', 'Live Photo of customer & house with Geo Tagging', 'Medical Records', 'Social Media Profile', 'Vehicle Registration Details'
];

const checklistData = [
  { id: 0, label: "Aadhaar" },
  { id: 1, label: "PAN" },
  { id: 2, label: "Voter Card" },
  { id: 3, label: "Driving Licence" },
  { id: 4, label: "Passport" },
  { id: 5, label: "Ration Card" },
  { id: 6, label: "Job Card" },
  { id: 7, label: "ITR" },
  { id: 8, label: "Salary Slip" },
  { id: 9, label: "Bank Statement" },
  { id: 10, label: "Live Photo of customer & house with Geo Tagging" },
  { id: 11, label: "Medical Records" },
  { id: 12, label: "Social Media Profile" },
  { id: 13, label: "Vehicle Registration Details" }
];

// Main Video Page Component
const VideoVerification = () => {
  const [responses, setResponses] = useState({});
  const [finalConclusion, setFinalConclusion] = useState('');
  const [finalObservation, setFinalObservation] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [imagePreviews, setImagePreviews] = useState({});
  const [faceCompareImages, setFaceCompareImages] = useState({
    reference: null,
    comparison: null,
  });
  const [faceComparePreviews, setFaceComparePreviews] = useState({
    reference: null,
    comparison: null,
  });
  const [comparisonResult, setComparisonResult] = useState(null);
  const [isComparing, setIsComparing] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [applicantDetails, setApplicantDetails] = useState(() => {
    return location.state?.applicantDetails || {
      applicationNo: '',
      "Allocation date and time": '',
      "life to be Assured": '',
      proposerName: '',
      DateOfBirth: '',
      phone: '',
      gender: '',
      "Id details": '',
      address: '',
      nomineeName: '',
      nomineeDOB: '',
      relationWithNominee: '',
      state: '',
    };
  });
  const [page, setPage] = useState('form'); // 'form', 'summary', 'casefiles'
  const [submissionData, setSubmissionData] = useState(null);
  
  // Initialize documentSelections with proper structure
  const [documentSelections, setDocumentSelections] = useState(
  Array(documentsList.length).fill('')
);

const handleDocumentSelection = (index, value) => {
  setDocumentSelections(prev => {
    const updated = [...prev];
    updated[index] = value;
    return updated;
  });
};

  const referenceImageRef = useRef();
  const comparisonImageRef = useRef();
  const finalObservationRef = useRef(null);

  

  // Load face-api models
  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@latest/model';
        
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
        ]);
        
        setModelsLoaded(true);
        console.log('Face-api models loaded successfully');
      } catch (error) {
        console.error('Error loading face-api models:', error);
        setModelsLoaded(false);
      }
    };

    loadModels();
  }, []);

  // Debug effect to log documentSelections changes
  useEffect(() => {
    console.log('Document selections updated:', documentSelections);
  }, [documentSelections]);

  const compareImagesWithFaceAPI = async () => {
    if (!modelsLoaded) {
      console.warn('Face-api models not loaded, falling back to basic comparison');
      return await compareImages();
    }

    if (!referenceImageRef.current || !comparisonImageRef.current) {
      return;
    }

    setIsComparing(true);
    setComparisonResult(null);

    try {
      const referenceFaceDetection = await faceapi.detectSingleFace(
        referenceImageRef.current, 
        new faceapi.TinyFaceDetectorOptions()
      ).withFaceLandmarks().withFaceDescriptor();

      const comparisonFaceDetection = await faceapi.detectSingleFace(
        comparisonImageRef.current, 
        new faceapi.TinyFaceDetectorOptions()
      ).withFaceLandmarks().withFaceDescriptor();

      if (!referenceFaceDetection || !comparisonFaceDetection) {
        setComparisonResult({
          status: 'No Match',
          color: 'text-red-600',
          details: ''
        });
        setIsComparing(false);
        return;
      }

      const distance = faceapi.euclideanDistance(
        referenceFaceDetection.descriptor,
        comparisonFaceDetection.descriptor
      );

      const similarity = Math.max(0, Math.min(100, (1 - distance) * 100));

      let status, color, percentage;
      if (distance < 0.7) {
        status = 'Match';
        color = 'text-green-600';
        percentage = Math.round(similarity * 100) / 100;
      } else if (distance < 0.3) {
        status = 'Possible Match';
        color = 'text-green-600';
      } else {
        status = 'No Match';
        color = 'text-red-600';
      }

      setComparisonResult({
        status,
        color,
        ...(percentage && { percentage }),
        details: `Face distance: ${distance.toFixed(4)}`
      });

    } catch (error) {
      console.error('Error in face comparison:', error);
      setComparisonResult({
        status: 'Comparison Error',
        color: 'text-red-600',
        details: error.message
      });
    }
 
    setIsComparing(false);
  };

  const handleChange = (id, field, value) => {
    setResponses(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const textareaQuestions = [21, 22, 25, 26, 43, 42]; // Add any question IDs here

  const textareaConfig = {
    21: { rows: 1, placeholder: "Type remark..." },
    22: { rows: 1, placeholder: "Type remark..." },
    25: { rows: 1, placeholder: "Type remark..." },
    26: { rows: 1, placeholder: "Type remark..." },
    42: { rows: 1, placeholder: "Type remark..." },
    43: { rows: 1, placeholder: "Type remark..." },
  };

  const isTextareaQuestion = (id) => {
    return textareaQuestions.includes(id);
  };

  const getTextareaConfig = (id) => {
    return textareaConfig[id] || { rows: 1, placeholder: "Type remark..." };
  };

  const handleDetailChange = (field, value) => {
    setApplicantDetails(prev => ({ ...prev, [field]: value }));
  };

  // Enhanced document selection handler

  const handleFileChange = (label, files) => {
    console.log(`Handling files for ${label}:`, files);
    if (label === 'Upload ID Proof') {
      const selectedFiles = Array.from(files).slice(0, 4);
      console.log('Selected files:', selectedFiles);
      if (selectedFiles.length === 0) return;

      const previews = selectedFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => ({
        ...prev,
        [label]: previews,
      }));
      setUploadedFiles((prev) => ({
        ...prev,
        [label]: selectedFiles,
      }));
    } else {
      const file = files[0];
      if (!file) return;
      console.log('Single file:', file);
      const preview = URL.createObjectURL(file);
      setImagePreviews((prev) => ({
        ...prev,
        [label]: preview,
      }));
      setUploadedFiles((prev) => ({
        ...prev,
        [label]: file,
      }));
    }
  };

  const handleFaceCompareChange = (type, file) => {
    if (file) {
      setFaceCompareImages(prev => ({
        ...prev,
        [type]: file
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setFaceComparePreviews(prev => ({
          ...prev,
          [type]: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFaceCompareImage = (type) => {
    setFaceCompareImages(prev => ({
      ...prev,
      [type]: null
    }));
    setFaceComparePreviews(prev => ({
      ...prev,
      [type]: null
    }));
    
    const fileInputs = document.querySelectorAll(`input[data-type="${type}"]`);
    fileInputs.forEach(input => {
      input.value = '';
    });
    
    setComparisonResult(null);
  };

  const removeUploadedImage = (label, index = null) => {
    if (label === 'Upload ID Proof' && index !== null) {
      setImagePreviews((prev) => {
        const updatedPreviews = [...(prev[label] || [])];
        updatedPreviews.splice(index, 1);
        return {
          ...prev,
          [label]: updatedPreviews.length > 0 ? updatedPreviews : undefined,
        };
      });
      setUploadedFiles((prev) => {
        const updatedFiles = [...(prev[label] || [])];
        updatedFiles.splice(index, 1);
        return {
          ...prev,
          [label]: updatedFiles.length > 0 ? updatedFiles : undefined,
        };
      });
    } else {
      setImagePreviews((prev) => {
        const { [label]: _, ...rest } = prev;
        return rest;
      });
      setUploadedFiles((prev) => {
        const { [label]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const analyzeImageHistogram = (imageData) => {
    const data = imageData.data;
    const histogram = { r: [], g: [], b: [] };

    for (let i = 0; i < 256; i++) {
      histogram.r[i] = 0;
      histogram.g[i] = 0;
      histogram.b[i] = 0;
    }

    for (let i = 0; i < data.length; i += 4) {
      histogram.r[data[i]]++;
      histogram.g[data[i + 1]]++;
      histogram.b[data[i + 2]]++;
    }

    return histogram;
  };

  const calculateSimilarity = (hist1, hist2) => {
    let correlation = 0;
    
    ['r', 'g', 'b'].forEach(channel => {
      let sum1 = 0, sum2 = 0, sum1Sq = 0, sum2Sq = 0, pSum = 0;
      
      for (let i = 0; i < 256; i++) {
        const val1 = hist1[channel][i];
        const val2 = hist2[channel][i];
        
        sum1 += val1;
        sum2 += val2;
        sum1Sq += val1 * val1;
        sum2Sq += val2 * val2;
        pSum += val1 * val2;
      }
      
      const num = pSum - (sum1 * sum2 / 256);
      const den = Math.sqrt((sum1Sq - sum1 * sum1 / 256) * (sum2Sq - sum2 * sum2 / 256));
      
      if (den !== 0) {
        correlation += Math.abs(num / den);
      }
    });
    
    return correlation / 3;
  };

  const compareImages = async () => {
    if (!faceCompareImages.reference || !faceCompareImages.comparison) {
      alert('Please upload both reference and comparison images');
      return;
    }
    
    setIsComparing(true);
    setComparisonResult(null);
    
    try {
      const canvas1 = document.createElement('canvas');
      const canvas2 = document.createElement('canvas');
      const ctx1 = canvas1.getContext('2d');
      const ctx2 = canvas2.getContext('2d');
      
      const img1 = new Image();
      const img2 = new Image();
      
      await new Promise((resolve) => {
        let loadedCount = 0;
        
        img1.onload = () => {
          canvas1.width = 100;
          canvas1.height = 100;
          ctx1.drawImage(img1, 0, 0, 100, 100);
          loadedCount++;
          if (loadedCount === 2) resolve();
        };
        
        img2.onload = () => {
          canvas2.width = 100;
          canvas2.height = 100;
          ctx2.drawImage(img2, 0, 0, 100, 100);
          loadedCount++;
          if (loadedCount === 2) resolve();
        };
        
        img1.src = faceComparePreviews.reference;
        img2.src = faceComparePreviews.comparison;
      });
      
      const imageData1 = ctx1.getImageData(0, 0, 100, 100);
      const imageData2 = ctx2.getImageData(0, 0, 100, 100);
      
      const hist1 = analyzeImageHistogram(imageData1);
      const hist2 = analyzeImageHistogram(imageData2);
      
      const similarity = calculateSimilarity(hist1, hist2);
      
      let status, color, percentage;
      if (similarity > 0.7) {
        status = 'Full Match';
        color = 'text-green-600';
        percentage = Math.round((similarity * 100) * 100) / 100;
      } else if (similarity > 0.4) {
        status = 'Partial Match';
        color = 'text-yellow-600';
      } else {
        status = 'No Match';
        color = 'text-red-600';
      }
      
      setTimeout(() => {
        setComparisonResult({
          status,
          color,
          ...(percentage && { percentage })
        });
        setIsComparing(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error comparing images:', error);
      setComparisonResult({
        status: 'Error',
        color: 'text-red-600'
      });
      setIsComparing(false);
    }
  };

  const handleReset = () => {
    setFaceCompareImages({
      reference: null,
      comparison: null
    });
    setFaceComparePreviews({
      reference: null,
      comparison: null
    });
    
    setUploadedFiles({});
    setImagePreviews({});
    
    setComparisonResult(null);
    setIsComparing(false);
    
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
      input.value = '';
    });
  };

  const handleSubmit = () => {
    const data = {
      applicantDetails,
      responses,
      finalConclusion,
      finalObservation,
      uploadedFiles,
      imagePreviews,
      comparisonResult,
      flaggedCount: Object.values(responses).filter((r) => r.flag).length,
      submissionDate: new Date().toISOString(),
      questionsData: questionsData,
      documentSelections, // <-- this array will have all selected values
      documentsList 
    };
    
    console.log('Submitting data:', data); // Debug log to check what's being submitted
    console.log('Document selections:', documentSelections); // Specific log for document selections
    
    navigate('/case-details', { state: { submissionData: data } });
  };

  const handleNavigateToCaseFiles = () => setPage('casefiles');

  const handleFinalObservationChange = (e) => {
    setFinalObservation(e.target.value);
    
    if (finalObservationRef.current) {
      finalObservationRef.current.style.height = 'auto';
      finalObservationRef.current.style.height = finalObservationRef.current.scrollHeight + 'px';
    }
  };

  if (page === 'summary' && submissionData) {
    return (
      <div className="p-4 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Submission Summary</h1>
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold mb-2">Applicant Details</h2>
          <ul className="list-disc pl-5">
            {Object.entries(submissionData.applicantDetails).map(([key, value]) => (
              <li key={key}><strong>{key}:</strong> {value}</li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mb-2">Responses</h2>
          <ul className="list-disc pl-5">
            {Object.entries(submissionData.responses).map(([id, response]) => (
              <li key={id}>
                <strong>Q{questionsData.find(q => q.id === parseInt(id)).question}:</strong> {response.answer}
                {response.remark && <span> ({response.remark})</span>}
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mb-2">Final Conclusion</h2>
          <p>{submissionData.finalConclusion}</p>
          <h2 className="text-xl font-semibold mb-2">Final Observation</h2>
          <p>{submissionData.finalObservation}</p>
          <button 
            onClick={handleNavigateToCaseFiles} 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            View Case Files
          </button>
        </div>
      </div>
    );  
  }

  if (page === 'casefiles') {
    const submissionData = location.state?.submissionData;

    return (
      <div className="p-4 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Case Files</h1>
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold mb-2">Document Checklist</h2>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-4">Document</th>
                <th className="text-left py-3 px-4">Uploaded</th>
                <th className="text-left py-3 px-4">Verified</th>
              </tr>
            </thead>
            <tbody>
              {documentsList.map((doc, index) => (
                <tr key={index}>
                  <td>{doc}</td>
                  <td>
                    <input
                      type="radio"
                      name={`doc-casefiles-${index}`}
                      checked={submissionData.documentSelections[index] === 'Policy Holder'}
                      readOnly
                    /> Policy Holder
                    <input
                      type="radio"
                      name={`doc-casefiles-${index}`}
                      checked={submissionData.documentSelections[index] === 'Life Assured'}
                      readOnly
                    /> Life Assured
                  </td>
                </tr>
              ))}
             
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 min-h-screen">
      <div>
        <div className="bg-white -100 p-8">
          <div className="bg-white text-black rounded-lg p-6 mb-1 shadow-">
            <h1 className="text-3xl font-bold mb-4">Video Verification Report</h1>
            <div className="text-base leading-relaxed text-white-800 text-justify">
              <p>
                This is the transcript of the answers provided by the Insured verbally to the questions asked below in a video verification 
                by the Investigating team on behalf of <span className="underline">Radiaant Captive India Pvt. Ltd.</span> Insurance Company Limited.
                The answers provided by the Life to be assured would form a part of the proposal for Insurance. The company has accepted the 
                answers provided in utmost good faith and thereby issued the policy. The Company reserves the right to repudiate any claim 
                arising out of this policy in the event of impersonation or any misstatement / misrepresentation and / or suppression of 
                material information found either in the said verification or in the application form.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative w-full h-full mx-auto rounded overflow-hidden shadow">
            <video
              controls
              className="w-full h-full object-contain rounded"
              poster="https://via.placeholder.com/640x360.png?text=Video+Preview"
            >
              <source src=" " type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">
            Face Compare 
            {modelsLoaded && <span className="text-green-600 text-sm ml-2"></span>}
            {!modelsLoaded && <span className="text-yellow-600 text-sm ml-2">⚠ Basic Mode</span>}
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center border rounded-lg p-4">
              <p className="mb-2">Reference Image</p>
              {faceComparePreviews.reference && (
                <div className="relative">
                  <img 
                    ref={referenceImageRef}
                    src={faceComparePreviews.reference} 
                    alt="Reference" 
                    className="w-30 h-50 object-cover rounded mb-2 border"
                    crossOrigin="anonymous"
                  />
                  <button
                    onClick={() => removeFaceCompareImage('reference')}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                    title="Remove reference image"
                  >
                    ✕
                  </button>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*"
                className="mb-2" 
                data-type="reference"
                onChange={(e) => handleFaceCompareChange('reference', e.target.files[0])}
              />
            </div>
            <div className="flex flex-col items-center border rounded-lg p-4">
              <p className="mb-2">Comparison Image</p>
              {faceComparePreviews.comparison && (
                <div className="relative">
                  <img 
                    ref={comparisonImageRef}
                    src={faceComparePreviews.comparison} 
                    alt="Comparison" 
                    className="w-30 h-50 object-cover rounded mb-2 border"
                    crossOrigin="anonymous"
                  />
                  <button
                    onClick={() => removeFaceCompareImage('comparison')}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                    title="Remove comparison image"
                  >
                    ✕
                  </button>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*"
                className="mb-2" 
                data-type="comparison"
                onChange={(e) => handleFaceCompareChange('comparison', e.target.files[0])}
              />
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button 
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:bg-gray-400"
              onClick={modelsLoaded ? compareImagesWithFaceAPI : compareImages}
              disabled={!faceCompareImages.reference || !faceCompareImages.comparison || isComparing}
            >
              {isComparing ? 'COMPARING...' : (modelsLoaded ? ' COMPARE →' : 'COMPARE →')}
            </button>
            <button 
              className="bg-red-600 text-white px-4 py-2 rounded"
              onClick={handleReset}
            >
              RESET ALL
            </button>
          </div>
          
          {(comparisonResult || isComparing) && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <h4 className="font-semibold mb-2">Face Comparison Result</h4>
              {isComparing ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span>Analyzing faces...</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {comparisonResult.percentage && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Match Confidence:</span>
                      <span className={`font-bold text-lg ${comparisonResult.color}`}>
                        {comparisonResult.percentage}%
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Status:</span>
                    <span className={`font-semibold ${comparisonResult.color}`}>
                      {comparisonResult.status}
                    </span>
                  </div>
                  {comparisonResult.details && (
                    <div className="text-sm text-gray-600">
                      {comparisonResult.details}
                    </div>
                  )}
                  {comparisonResult.percentage && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full transition-all duration-500 bg-green-600`}
                        style={{ width: `${Math.max(comparisonResult.percentage, 5)}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white border rounded shadow p-4 space-y-4 text-sm mt-6">
          <h2 className="text-lg font-semibold">Applicant Details</h2>
          <table className="w-full">
            <tbody>
              {Object.entries(applicantDetails).map(([key, value]) => (
                <tr key={key}>
                  <td className="pr-2 font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</td>
                  <td>
                    <input
                      className="w-full border px-2 py-1 rounded text-sm"
                      value={value}
                      onChange={(e) => handleDetailChange(key, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            <h3 className="text-lg font-semibold mb-1">Upload Images</h3>
            {['Upload ID Proof', 'Upload Face Comparison', 'Upload Full Image', 'Upload Other Images', 'Social Media Check'].map((label) => (
              <div key={label} className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="w-48 font-medium">{label}:</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="border p-1 text-xs rounded flex-1"
                    data-upload-type={label}
                    multiple={label === 'Upload ID Proof'}
                    onChange={(e) => handleFileChange(label, e.target.files)}
                  />
                  
                </div>
                {label === 'Upload ID Proof' && Array.isArray(imagePreviews[label]) && imagePreviews[label].length > 0 && (
                  <div className="flex flex-wrap gap-2 ml-48 pl-2">
                    {imagePreviews[label].map((src, idx) => (
                      <div key={idx} className="relative w-fit">
                        <img
                          src={src}
                          alt={`${label} preview ${idx + 1}`}
                          className="w-32 h-32 object-cover rounded border"
                        />
                        <button
                          onClick={() => removeUploadedImage(label, idx)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                          title={`Remove ${label.toLowerCase()} ${idx + 1}`}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {label !== 'Upload ID Proof' && imagePreviews[label] && (
                  <div className="ml-48 pl-2 relative w-fit">
                    <img
                      src={imagePreviews[label]}
                      alt={`${label} preview`}
                      className="w-48 h-48 object-cover rounded border"
                    />
                    <button
                      onClick={() => removeUploadedImage(label)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                      title={`Remove ${label.toLowerCase()}`}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-1 mt-4">Checklist</h4>
            <table className="w-full text-xs border">
              <thead>
                <tr>
                  <th className="border p-1">Sr no.</th>
                  <th className="border p-1">Document</th>
                  <th className="border p-1">Policy Holder</th>
                  <th className="border p-1">Life Assured</th>
                </tr>
              </thead>
              <tbody>
                {checklistData.map(({ id, label }) => (
                  <tr key={id}>
                    <td className="border p-1 text-center">{id + 1}</td>
                    <td className="border p-1">{label}</td>
                    <td className="border p-1 text-center">
                      <input
                        type="radio"
                        name={`doc-${id}`}
                        checked={documentSelections[id] === 'Policy Holder'}
                        onChange={() => handleDocumentSelection(id, 'Policy Holder')}
                      />
                    </td>
                    <td className="border p-1 text-center">
                      <input
                        type="radio"
                        name={`doc-${id}`}
                        checked={documentSelections[id] === 'Life Assured'}
                        onChange={() => handleDocumentSelection(id, 'Life Assured')}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <p><strong>Flagged Answers:</strong> {Object.values(responses).filter((r) => r.flag).length}</p>
            <table className="mt-2 w-full text-sm border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">#</th>
                  <th className="border px-2 py-1 text-left">Question</th>
                  <th className="border px-2 py-1">Answer</th>
                  <th className="border px-2 py-1">Remark</th>
                </tr>
              </thead>
              <tbody>
                {questionsData
                  .filter((q) => responses[q.id]?.flag)
                  .map((q) => (
                    <tr key={q.id} className="bg-red-100">
                      <td className="border px-2 py-1 text-center">{q.id}</td>
                      <td className="border px-2 py-1">{q.question}</td>
                      <td className="border px-2 py-1 text-center">{responses[q.id]?.answer || '—'}</td>
                      <td className="border px-2 py-1">{responses[q.id]?.remark || '—'}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="flex gap-2 mt-2">
              <select
                className="border px-2 py-1 rounded text-sm"
                value={finalConclusion}
                onChange={(e) => setFinalConclusion(e.target.value)}
              >
                <option value="">Choose</option>
                <option>Suspend</option>
                <option>Unsuspend</option>
              </select>
              <textarea
                ref={finalObservationRef}
                rows={2}
                placeholder="Final Observation"
                className="w-full border rounded px-2 py-1 resize-none"
                value={finalObservation}
                onChange={handleFinalObservationChange}
                style={{ minHeight: '2.5rem', overflow: 'hidden' }}
                onInput={handleFinalObservationChange}
              />
            </div>
          </div>
        </div>
        </div>

        <div className="overflow-x-auto bg-white border rounded shadow">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4 text-center">Give Remark</h1>
          <div className="overflow-auto border border-gray-300 rounded">
            <table className="min-w-full text-sm border-collapse">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="border px-2 py-2">#</th>
                  <th className="border px-2 py-2 text-left">Questions</th>
                  <th className="border px-2 py-2">Yes</th>
                  <th className="border px-2 py-2">No</th>
                  <th className="border px-2 py-2 text-left">Remarks</th>
                  <th className="border px-2 py-2">Flag</th>
                </tr>
              </thead>
              <tbody>
                {questionsData.map(({ id, question }) => (
                  <tr key={id} className={`${responses[id]?.flag ? 'bg-red-200' : ''}`}>
                    <td className="border px-2 py-2 text-center">{id}</td>
                    <td className="border px-2 py-2">{question}</td>
                    <td className="border px-2 py-2 text-center">
                      <input
                        type="radio" 
                        name={`answer-${id}`}
                        onChange={() => handleChange(id, 'answer', 'yes')}
                        checked={responses[id]?.answer === 'yes'}
                      />
                    </td>
                    <td className="border px-2 py-2 text-center">
                      <input
                        type="radio"
                        name={`answer-${id}`}
                        onChange={() => handleChange(id, 'answer', 'no')}
                        checked={responses[id]?.answer === 'no'}
                      />
                    </td>
                    <td className="border px-2.5 py-2.5">
                    {isTextareaQuestion(id) ? (
                      <textarea
                        value={responses[id]?.remark || ''}
                        onChange={e => {
                          handleChange(id, 'remark', e.target.value);
                          e.target.style.height = 'auto';
                          e.target.style.height = e.target.scrollHeight + 'px';
                        }}
                        className="border rounded px-2 py-2 w-full"
                        style={{
                          overflow: 'hidden',
                          resize: 'none',
                          fontSize: '1rem'
                        }}
                        placeholder={getTextareaConfig(id).placeholder}
                        rows={1}
                      />
                    ) : (
                      <input
                        type="text"
                        value={responses[id]?.remark || ''}
                        onChange={e => handleChange(id, 'remark', e.target.value)}
                        className="border rounded px-2 py-2 w-full"
                        style={{
                          fontSize: '1rem'
                        }}
                        placeholder="Type remark..."
                      />
                    )}
                  </td>
                  <td className="border px-2 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={responses[id]?.flag || false}
                      onChange={(e) => handleChange(id, 'flag', e.target.checked)}
                    />
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-4">
            <button
              className="bg-white text-black border border-gray-500 px-4 py-2 rounded hover:bg-gray-100"
              onClick={handleSubmit}
            >
              Submit Answers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoVerification;