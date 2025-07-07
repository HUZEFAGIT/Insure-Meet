import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

const UploadClaimsPage = () => {
  const [applicationType, setApplicationType] = useState("");
  const [applicationNumber, setApplicationNumber] = useState("");
  const [laName, setLaName] = useState("");
  const [proposerName, setProposerName] = useState("");
  const [idDetails, setIdDetails] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [nomineeName, setNomineeName] = useState("");
  const [nomineeDOB, setNomineeDOB] = useState("");
  const [relWithNominee, setRelWithNominee] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [alternateContactNumber, setAlternateContactNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [applicationForm, setApplicationForm] = useState("");
  const [tat, setTat] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = () => {
    console.log({
      applicationType,
      applicationNumber,
      laName,
      proposerName,
      idDetails,
      gender,
      dateOfBirth,
      nomineeName,
      nomineeDOB,
      relWithNominee,
      address,
      city,
      state,
      contactNumber,
      alternateContactNumber,
      emailId,
      applicationForm,
      tat,
      priority,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <Card className="w-full max-w-7xl">
        <CardContent className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-left">Upload Claims</h2>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-y-6 gap-x-4">
              <Input label="Application Type" value={applicationType} onChange={setApplicationType} placeholder="Enter Application Type" />
              <Input label="Application Number" value={applicationNumber} onChange={setApplicationNumber} placeholder="Enter Application Number" />
              <Input label="LA Name" value={laName} onChange={setLaName} placeholder="Enter LA Name" />
              <Input label="Proposer Name" value={proposerName} onChange={setProposerName} placeholder="Enter Proposer Name" />
              <Input label="ID Details" value={idDetails} onChange={setIdDetails} placeholder="Enter ID Details" />
              <Input label="Gender" value={gender} onChange={setGender} placeholder="Enter Gender" />
              <Input label="Date of Birth" value={dateOfBirth} onChange={setDateOfBirth} placeholder="Enter Date of Birth" />
              <Input label="Nominee Name" value={nomineeName} onChange={setNomineeName} placeholder="Enter Nominee Name" />
              <Input label="Nominee DOB" value={nomineeDOB} onChange={setNomineeDOB} placeholder="Enter Nominee DOB" />
              <Input label="Relation With Nominee" value={relWithNominee} onChange={setRelWithNominee} placeholder="Enter Relation with Nominee" />
              <Input label="Address" value={address} onChange={setAddress} placeholder="Enter Address" />
              <Input label="City" value={city} onChange={setCity} placeholder="Enter City" />
              <Input label="State" value={state} onChange={setState} placeholder="Enter State" />
              <Input label="Contact Number" value={contactNumber} onChange={setContactNumber} placeholder="Enter Contact Number" />
              <Input label="Alternate Contact Number" value={alternateContactNumber} onChange={setAlternateContactNumber} placeholder="Enter Alternate Contact Number" />
              <Input label="Email ID" value={emailId} onChange={setEmailId} placeholder="Enter Email ID" />
              <Input label="Application Form" value={applicationForm} onChange={setApplicationForm} placeholder="Enter Application Form" />
              <Input label="TAT" value={tat} onChange={setTat} placeholder="Enter TAT" />
              <Input label="Priority" value={priority} onChange={setPriority} placeholder="Enter Priority" />
            </div>

            <Button className="bg-red-700 hover:bg-red-800 py-3 text-white rounded-lg" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Input = ({ label, value, onChange, placeholder }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm h-12 pl-4 placeholder-gray-400"
      placeholder={placeholder}
    />
  </div>
);

export default UploadClaimsPage;
