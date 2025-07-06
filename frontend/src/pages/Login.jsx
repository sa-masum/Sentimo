import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

function setCookie(name, value, days = 7) {
  const expires = new Date(Date.now() + days*24*60*60*1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

const Login = () => {
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/login', form);
      setCookie('token', res.data.token);
      alert('Login successful!');
      window.location.href = '/';
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
        <form
          className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
          onSubmit={handleLogin}
        >
          <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Login</h2>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">Email or Username</label>
            <input
              type="text"
              name="identifier"
              required
              value={form.identifier}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
