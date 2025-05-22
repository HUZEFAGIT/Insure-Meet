import React, { useState } from 'react';
import { Search, Phone, FileDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

const UserProfile = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    {
      firstName: 'Amit',
      lastName: 'Kumar',
      userName: 'Amit.Kumar34@bajajallianz.co.in',
      email: 'Amit.Kumar34@bajajallianz.co.in',
      mobile: '0',
      role: 'Claim Admin',
      status: 'Active'
    },
    {
      firstName: 'Kavita',
      lastName: 'Kanade',
      userName: 'kavitakanade@radiaant.com',
      email: 'kavitakanade@radiaant.com',
      mobile: '9021569820',
      role: 'Video Manager',
      status: 'Active'
    },
    {
      firstName: 'Kuldeep',
      lastName: 'R',
      userName: 'k.r@radiaant.com',
      email: 'k.r@radiaant.com',
      mobile: '9762291516',
      role: 'Scheduler',
      status: 'Active'
    }
  ];
 
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(users);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    XLSX.writeFile(wb, 'UserProfileData.xlsx');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-left">User Profile</h1>
            <div className="flex gap-4">
              <Link to="/create-user">
                <Button className="bg-red-700 hover:bg-red-800">
                  Register New User
                </Button>
              </Link>
              <Button 
                className="bg-red-700 hover:bg-red-800"
                onClick={handleExport}
              >
                <FileDown className="w-4 h-4 mr-2" />
                Export to Excel
              </Button>
            </div>
          </div>

          {/* Search Section */}
          <div className="mb-6 text-center">
            <h2 className="text-lg mb-4">
              Search user details with the help of First Name/Last Name/Username/Email id/Mobile Number/Role/ Status
            </h2>
            <div className="flex justify-center gap-2">
              <Input
                type="text"
                placeholder="Search User Details"
                className="max-w-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="bg-red-700 hover:bg-red-800">Filter</Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">First Name</th>
                  <th className="border p-2 text-left">Last Name</th>
                  <th className="border p-2 text-left">User Name</th>
                  <th className="border p-2 text-left">Email</th>
                  <th className="border p-2 text-left">Mobile</th>
                  <th className="border p-2 text-left">Role</th>
                  <th className="border p-2 text-left">Status</th>
                  <th className="border p-2 text-left">Notify</th>
                  <th className="border p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border p-2">{user.firstName}</td>
                    <td className="border p-2">{user.lastName}</td>
                    <td className="border p-2">{user.userName}</td>
                    <td className="border p-2">{user.email}</td>
                    <td className="border p-2">{user.mobile}</td>
                    <td className="border p-2">{user.role}</td>
                    <td className="border p-2">{user.status}</td>
                    <td className="border p-2">
                      <Button className="bg-green-500 hover:bg-green-600 rounded-full p-2">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </td>
                    <td className="border p-2">
                      <div className="flex flex-col gap-2">
                        <Button className="bg-red-700 hover:bg-red-800 w-full">
                          Edit
                        </Button>
                         <Button className="bg-red-700 hover:bg-red-800 w-full">
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;