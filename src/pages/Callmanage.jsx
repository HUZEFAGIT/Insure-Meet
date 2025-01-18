import React, { useState } from "react";
import { Phone } from "lucide-react";

const CallManagement = () => {
    const [requireSupport, setRequireSupport] = useState(false);

    return (
        <div className="h-screen bg-gray-50 p-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Call Management Heading */}
                <div className="pb-4 border-b mb-6">
                    <h2 className="text-2xl font-bold text-left">Call Management</h2>
                </div>

                {/* Application Information Section */}
                <div className="mb-6 flex items-start">
                    <div className="flex-1">
                        <h3 className="text-lg font-medium mb-4 text-left">Application Information</h3>
                        <div className="flex space-x-8 items-center">
                            <div className="flex space-x-2 items-center">
                                <label className="text-sm text-gray-600">Application Number:</label>
                                <div className="font-medium">6140587611</div>
                            </div>
                            <div className="flex space-x-2 items-center">
                                <label className="text-sm text-gray-600">Applicant/LA Name:</label>
                                <div className="font-medium">UPENDRA KUMAR GUPTA</div>
                            </div>
                            <div className="flex space-x-2 items-center">
                                <label className="text-sm text-gray-600">Contact Number:</label>
                                <div className="font-medium">9155503700</div>
                            </div>
                        </div>

                    </div>
                    <div className="ml-4">
                        <button className="bg-red-700 hover:bg-red-800 text-white px-3 py-2 rounded text-sm flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            Call Now
                        </button>
                    </div>
                </div>

                {/* If Insurance Support Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4 text-left">If Insurance Support</h3>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="support"
                                checked={requireSupport}
                                onChange={(e) => setRequireSupport(e.target.checked)}
                                className="rounded border-gray-300"
                            />
                            <label htmlFor="support" className="text-sm">
                                Require BAJAJ Support
                            </label>
                        </div>
                        <input
                            type="text"
                            defaultValue="Not answering any calls."
                            className="border rounded p-2 max-w-md w-full "
                        />
                        <div className="flex space-x-2">
                            <button className="bg-red-700 hover:bg-red-800 text-white px-3 py-1.5 rounded text-sm">
                                Submit
                            </button>
                            <button className="border border-gray-300 hover:bg-gray-50 px-3 py-1.5 rounded text-sm">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                <br></br>

                {/* Set Time Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4 text-left">Schedule Call</h3>
                    <div className="grid grid-cols-4 gap-4">
                        <div>
                            <label className="text-sm text-gray-600 block mb-1">Date</label>
                            <input
                                type="text"
                                defaultValue="17"
                                className="border rounded p-2 w-full"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600 block mb-1">Month</label>
                            <input
                                type="text"
                                defaultValue="January"
                                className="border rounded p-2 w-full"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600 block mb-1">Year</label>
                            <input
                                type="text"
                                defaultValue="2024"
                                className="border rounded p-2 w-full bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600 block mb-1">Time Slot</label>
                            <select className="border rounded p-2 w-full">
                                <option>Select Time Slot</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button className="bg-red-700 hover:bg-red-800 text-white px-3 py-1.5 rounded text-sm">
                            Set Time
                        </button>
                    </div>
                </div>

                {/* Assign Team Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">Assign Team</h3>
                    <div className="space-y-4">
                        <select className="border rounded p-2 max-w-md w-full">
                            <option>Select Video Manager</option>
                        </select>
                        <div>
                            <button className="bg-red-700 hover:bg-red-800 text-white px-3 py-1.5 rounded text-sm">
                                Assign Team
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallManagement;
