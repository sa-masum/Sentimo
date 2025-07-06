import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from '../components/Header';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const Home = () => {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast.warn("Please enter some text.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/analyze",
        { text },
        { withCredentials: true }
      );

      setSentiment(res.data.sentiment);
    } catch (err) {
      console.error(err);
      toast.error("Failed to analyze sentiment");
    } finally {
      setLoading(false);
    }
  };

  // Clear sentiment when user types new text
  const handleTextChange = (e) => {
    setText(e.target.value);
    setSentiment('');
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-indigo-700 tracking-tight drop-shadow">
            Sentimo
          </h1>
          <p className="text-center text-gray-500 mb-8 text-lg">
            Analyze the sentiment of your text instantly with AI-powered insights.
          </p>
          <textarea
            className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none text-gray-800 text-base shadow-sm transition"
            placeholder="Type your text here..."
            value={text}
            onChange={handleTextChange}
          />
          <div className="flex justify-center mt-6">
            <button
              onClick={handleAnalyze}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Analyzing...
                </span>
              ) : (
                "Analyze Sentiment"
              )}
            </button>
          </div>
          {sentiment && (
            <div className="mt-10 flex flex-col items-center">
              <div className="w-full max-w-md bg-gradient-to-r from-indigo-100 to-indigo-50 rounded-xl shadow-inner p-6 flex flex-col items-center">
                <p className="text-lg font-semibold text-gray-700 mb-2">Predicted Sentiment</p>
                <span
                  className={`text-3xl font-bold mt-1 px-6 py-2 rounded-lg ${
                    sentiment === 'Positive'
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : sentiment === 'Negative'
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                  }`}
                >
                  {sentiment}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
