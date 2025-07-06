import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const Register = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    otp: ''
  });
  const [sending, setSending] = useState(false);
  const [registering, setRegistering] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    setSending(true);
    try {
      await axios.post('http://localhost:5000/send-otp', { email: form.email });
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to send OTP');
    }
    setSending(false);
  };

  const handleRegister = async e => {
    e.preventDefault();
    setRegistering(true);
    try {
      await axios.post('http://localhost:5000/register', {
        email: form.email,
        username: form.username,
        password: form.password,
        otp: form.otp
      });
      alert('Registration successful! Please login.');
      window.location.href = '/login';
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
    setRegistering(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
        <form
          className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
          onSubmit={handleRegister}
        >
          <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Register</h2>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              disabled={step === 2}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              required
              value={form.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              disabled={step === 2}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              disabled={step === 2}
            />
          </div>
          {step === 1 && (
            <button
              type="button"
              onClick={sendOtp}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition mb-2"
              disabled={sending}
            >
              {sending ? 'Sending OTP...' : 'Send OTP'}
            </button>
          )}
          {step === 2 && (
            <>
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700">OTP</label>
                <input
                  type="text"
                  name="otp"
                  required
                  value={form.otp}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                disabled={registering}
              >
                {registering ? 'Registering...' : 'Register'}
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default Register;
