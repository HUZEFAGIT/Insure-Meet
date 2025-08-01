import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // <-- Added for Show Password

  const navigate = useNavigate();

  // <-- Modified: wrapped logic in handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault(); // <-- Prevent default form submission
    setLoading(true);
    setError("");
    try {
      const response = await axios.post('http://localhost:4000/api/v1/auth/login', { email, password });
      if (response.data && response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate('/');
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 overflow-hidden"> {/* <-- prevent scroll */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Login</h2>

        {/* <-- Wrapped in form tag */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"} // <-- Toggle password visibility
              placeholder="Enter your password"
              className="w-full rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-red-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* <-- Submit button triggers form on Enter key too */}
          <Button
            type="submit"
            className="bg-red-700 hover:bg-red-800 w-full py-2 text-white rounded-lg"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;