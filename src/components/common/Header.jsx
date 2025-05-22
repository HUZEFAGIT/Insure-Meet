import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import RLogo from '../../assets/RadiaantR.png';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is authenticated
        const user = localStorage.getItem("user");
        setIsAuthenticated(!!user);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user"); // Remove authentication
        setIsAuthenticated(false);
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className="flex justify-between items-center bg-gray-900 text-white p-4">
            {/* Left Section: Logo and Company Name */}
            <Link to="/">
                    <div className="flex items-center space-x-4">
                    <img src={RLogo} width={50} alt="Radiaant Logo" />
                    <div className="flex flex-col text-left">
                        <div className="text-xl font-semibold">RADIAANT</div>
                        <div className="text-sm font-semibold">Captive India Pvt. Ltd.</div>
                    </div>
                </div>
            </Link>

            {/* Center Section: Navigation Links */}
            <div className="flex space-x-8">
                <Link
                    to="/user-profile"
                    className="text-sm font-medium px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-105 transition transform duration-200 ease-in-out"
                >
                    User
                </Link>
                <Link
                    to="/"
                    className="text-sm font-medium px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-105 transition transform duration-200 ease-in-out"
                >
                    Applications
                </Link>
                <Link
                    to="/mis"
                    className="text-sm font-medium px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-105 transition transform duration-200 ease-in-out"
                >
                    MIS
                </Link>
                <Link
                    to="/follow-up"
                    className="text-sm font-medium px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-105 transition transform duration-200 ease-in-out"
                >
                    Follow Ups
                </Link>
            </div>

            {/* Right Section: Login/Logout */}
            <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                    <Button variant="destructive" size="sm" onClick={handleLogout}>
                        Log Out
                    </Button>
                ) : (
                    <Link to="/login">
                        <Button variant="destructive" size="sm">Log In</Button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;