import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getCookie('token');
        const res = await axios.get('http://localhost:5000/profile', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch profile. Please log in again.');
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
    try {
      await axios.delete('http://localhost:5000/profile', { withCredentials: true });
      document.cookie = 'token=; Max-Age=0; path=/;';
      alert('Account deleted successfully.');
      window.location.href = '/register';
    } catch (err) {
      alert('Failed to delete account.');
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg font-semibold text-gray-600">Loading profile...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-indigo-700 text-center mb-6">Your Profile</h1>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Email:</span>
              <span className="text-gray-600">{user?.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Username:</span>
              <span className="text-gray-600">{user?.username}</span>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleDeleteAccount}
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-red-700 transition"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
