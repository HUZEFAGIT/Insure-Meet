import React from 'react';
// import logo from './logo.svg';
import './App.css';
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
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/call-management' element={<CallManagement />} />
          <Route path='/upload-claims-page' element={<UploadClaimsPage />} />
          <Route path='/upload-rec-form' element={<Uploadrecform />} />
          <Route path='/application-documents' element={<ApplicationDocuments />} />
          <Route path='/user-profile' element={<UserProfile />} />
          <Route path='/create-user' element={<CreateUser />} />
          <Route path='/mis' element={<MIS />} />
          <Route path='/follow-up' element={<FollowUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
