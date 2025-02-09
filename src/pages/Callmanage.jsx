import React, { useState } from "react";
import { Phone } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const CallManagement = () => {
    const [requireSupport, setRequireSupport] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    // Generate time slots from 9:30 AM to 6:30 PM with 30-minute intervals
    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 9; hour < 18; hour++) {
            const hour12 = hour > 12 ? hour - 12 : hour;
            const period = hour >= 12 ? 'PM' : 'AM';
            
            slots.push(`${hour12}:30 ${period}`);
            slots.push(`${hour12 + 1}:00 ${period}`);
        }
        return slots;
    };

    return (
        <div className="bg-gray-50 p-4"> 
        
            <div className="bg-white rounded-lg shadow-md border p-6">
                {/* Call Management Heading */}
                <div className="pb-4 border-b mb-6">
                    <h2 className="text-2xl font-bold text-left">Call Management</h2>
                </div>

                {/* Application Information Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4 text-left">Application Information</h3>
                    <div className="flex flex-wrap justify-between items-center gap-4">
                        <div className="flex gap-2 items-center">
                            <label className="text-sm text-gray-600">Application Number:</label>
                            <div className="font-medium">6140587611</div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <label className="text-sm text-gray-600">Applicant/LA Name:</label>
                            <div className="font-medium">UPENDRA KUMAR GUPTA</div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <label className="text-sm text-gray-600">Contact Number:</label>
                            <div className="font-medium">9155503700</div>
                        </div>
                        <Button className="bg-red-700 hover:bg-red-800">
                            <Phone className="w-4 h-4 mr-2" />
                            Call Now
                        </Button>
                    </div>
                </div>

                {/* If Insurance Support Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4 text-left">If Insurance Support</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Input
                                type="checkbox"
                                id="support"
                                checked={requireSupport}
                                onChange={(e) => setRequireSupport(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <label htmlFor="support" className="text-sm">
                                Require BAJAJ Support
                            </label>
                        </div>
                        <Input
                            type="text"
                            defaultValue="Not answering any calls."
                            className="max-w-md"
                        />
                        <div className="flex gap-2">
                            <Button className="bg-red-700 hover:bg-red-800">
                                Submit
                            </Button>
                            <Button variant="outline">
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Schedule Call Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4 text-left">Schedule Call</h3>
                    <div className="flex gap-4 max-w-md">
                        <div className="flex-1">
                            <label className="text-sm text-gray-600 block mb-1">Date</label>
                            <Input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-sm text-gray-600 block mb-1">Time Slot</label>
                            <select className="w-full rounded-md border border-gray-300 p-2">
                                <option value="">Select Time Slot</option>
                                {generateTimeSlots().map((slot) => (
                                    <option key={slot} value={slot}>
                                        {slot}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mt-4 text-left">
                        <Button className="bg-red-700 hover:bg-red-800">
                            Set Time
                        </Button>
                    </div>
                </div>

                {/* Assign Team Section */}
                <div className="mb-6 text-left">
                    <h3 className="text-lg font-medium mb-4">Assign Team</h3>
                    <div className="space-y-4">
                        <select className="w-full max-w-md rounded-md border border-gray-300 p-2">
                            <option>Select Video Manager</option>
                            <option>Manager 1</option>
                            <option>Manager 2</option>
                            <option>Manager 3</option>
                        </select>
                        <div>
                            <Button className="bg-red-700 hover:bg-red-800">
                                Assign Team
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallManagement;
