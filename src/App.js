import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/Loginpage';
import SignUpPage from './pages/Signuppage';
import Homepage from './pages/Homepage';
import Header from './components/common/Header';
import CallManagement from './pages/Callmanage';

function App() {
  return (
    <div className="App">
      <LoginPage/>
      <SignUpPage/>
      <Header/>
      <Homepage/>
      <CallManagement/>
    </div>
  );
}

export default App;
