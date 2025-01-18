import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSignUp = () => {
    // Handle sign-up logic
    console.log('Form Data:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Sign Up</h2>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your name"
            className="w-full rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Confirm your password"
            className="w-full rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
          <Button
            className="bg-red-700 hover:bg-red-800 w-full py-2 text-white rounded-lg"
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-red-700 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
