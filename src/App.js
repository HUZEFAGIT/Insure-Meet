import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

import LoginPage from './pages/Loginpage';
import SignUpPage from './pages/Signuppage';
import Homepage from './pages/Homepage';
import Header from './components/common/Header';
import CallManagement from './pages/Callmanage';
import UploadClaimsPage from './pages/UploadClaimsPage';
import Uploadrecform from './components/core/Upload-rec-form';
import ApplicationDocuments from './components/core/app-doc';
import UserProfile from './pages/user';
import CreateUser from './pages/create-user';
import MIS from './pages/MIS';
import FollowUp from './pages/Follow-up';
import Casedetailspage from './pages/case-details';
import VideoVerification from './pages/video-verification';

const DISABLE_AUTH = true; // Toggle to enable/disable authentication

const ProtectedRoute = ({ element }) => {
  if (DISABLE_AUTH) return element;
  const isAuthenticated = localStorage.getItem('user');
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const AppContent = () => {
  const location = useLocation();
  const hideHeaderRoutes = ['/login', '/signup'];

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<ProtectedRoute element={<Homepage />} />} />
        <Route
          path="/call-management"
          element={<ProtectedRoute element={<CallManagement />} />}
        />
        <Route
          path="/upload-claims-page"
          element={<ProtectedRoute element={<UploadClaimsPage />} />}
        />
        <Route
          path="/upload-rec-form"
          element={<ProtectedRoute element={<Uploadrecform />} />}
        />
        <Route
          path="/application-documents"
          element={<ProtectedRoute element={<ApplicationDocuments />} />}
        />
        <Route
          path="/user-profile"
          element={<ProtectedRoute element={<UserProfile />} />}
        />
        <Route
          path="/create-user"
          element={<ProtectedRoute element={<CreateUser />} />}
        />
        <Route 
          path="/mis" 
          element={<ProtectedRoute element={<MIS />} />} 
        />
        <Route
          path="/follow-up"
          element={<ProtectedRoute element={<FollowUp />} />}
        />
        <Route
          path="/case-details"
          element={<ProtectedRoute element={<Casedetailspage />} />}
        />
        <Route
          path="/video-verification"
          element={<ProtectedRoute element={<VideoVerification />} />}
        />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <AppContent />
      </div>
    </Router>
  );
}

export default App;