import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import RLogo from '../../assets/RadiaantR.png';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is authenticated and get user role
        const user = localStorage.getItem("user");
        if (user) {
            try {
                const userData = JSON.parse(user);
                setUserRole(userData.role);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error parsing user data:', error);
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user"); // Remove authentication
        setIsAuthenticated(false);
        setUserRole(null);
        navigate("/login"); // Redirect to login page
    };

    // Function to check if a navigation item should be shown based on user role
    const shouldShowNavItem = (itemName) => {
        // If user is not authenticated, show all items (or you can choose to hide them)
        if (!isAuthenticated) return true;
        
        // If user role is scheduler, hide specific items
        if (userRole === 'scheduler') {
            const hiddenItems = ['mis', 'video-verification', 'case-details'];
            return !hiddenItems.includes(itemName);
        }
        
        // For other roles, show all items
        return true;
    };

    return (
        <div className="flex justify-between items-center bg-gray-900 text-white p-4 print:hidden">
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
                {/* <Link
                    to="/user-profile"
                    className="text-sm font-medium px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-105 transition transform duration-200 ease-in-out"
                >
                    User
                </Link> */}
                <Link
                    to="/"
                    className="text-sm font-medium px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-105 transition transform duration-200 ease-in-out"
                >
                    Applications
                </Link>
                {shouldShowNavItem('mis') && (
                    <Link
                        to="/mis"
                        className="text-sm font-medium px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-105 transition transform duration-200 ease-in-out"
                    >
                        MIS
                    </Link>
                )}
                {/* <Link
                    to="/follow-up"
                    className="text-sm font-medium px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-105 transition transform duration-200 ease-in-out"
                >
                    Follow Ups
                </Link> */}
                {shouldShowNavItem('video-verification') && (
                    <Link
                        to="/video-verification"
                        className="text-sm font-medium px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-105 transition transform duration-200 ease-in-out"
                    >
                        Video Verification
                    </Link>
                )}
                {shouldShowNavItem('case-details') && (
                    <Link
                        to="/case-details"
                        className="text-sm font-medium px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-105 transition transform duration-200 ease-in-out"
                    >
                        Case Details
                    </Link>
                )}
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