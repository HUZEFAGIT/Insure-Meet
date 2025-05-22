import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { loginUser } from "../apis/api"; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(""); // Define error state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    const result = await loginUser(email, password);
    if (result.success) {
        console.log("Login Successful:", result.user);
        localStorage.setItem("user", JSON.stringify(result.user)); // Store user info
        navigate('/'); // Redirect to homepage
    } else {
        setError(result.message);
    }
    setLoading(false);
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Login</h2>
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button
            className="bg-red-700 hover:bg-red-800 w-full py-2 text-white rounded-lg"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          {/* <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-red-700 hover:underline">
              Sign up
            </a>
          </p> */}
          
        </div>
      </div>
    </div>
  );
};

export default LoginPage;