import React from 'react';
import { Button } from '../ui/button';
import RLogo from '../../assets/RadiaantR.png';

const Header = () => {
    return (
        <div className="flex justify-between items-center bg-gray-900 text-white p-4 mb-6">
            {/* Left Section: Logo and Company Name */}
            <div className="flex items-center space-x-4">
                <img src={RLogo} width={50} alt="Radiaant Logo" />
                <div className="flex flex-col text-left">
                    <div className="text-xl font-semibold">RADIAANT</div>
                    <div className="text-sm font-semibold">Captive India Pvt. Ltd.</div>
                </div>
            </div>

            {/* Center Section: Navigation Links */}
            <div className="flex space-x-8">
                <a
                    href="#"
                    className="text-sm font-medium px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-105 transition transform duration-200 ease-in-out"
                >
                    User
                </a>
                <a
                    href="#"
                    className="text-sm font-medium px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-105 transition transform duration-200 ease-in-out"
                >
                    Application
                </a>
                <a
                    href="#"
                    className="text-sm font-medium px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-105 transition transform duration-200 ease-in-out"
                >
                    Internal MIS
                </a>
                <a
                    href="#"
                    className="text-sm font-medium px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-105 transition transform duration-200 ease-in-out"
                >
                    MIS
                </a>
                <a
                    href="#"
                    className="text-sm font-medium px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-105 transition transform duration-200 ease-in-out"
                >
                    Follow Ups
                </a>
            </div>

            {/* Right Section: User Info and Logout */}
            <div className="flex items-center space-x-4">
                <div className="text-sm">
                    <div>SuperAdmin</div>
                    <div className="text-gray-300">kuldeep.rathod@radiaant.com</div>
                </div>
                <Button variant="destructive" size="sm">Logout</Button>
            </div>
        </div>
    );
};

export default Header;
