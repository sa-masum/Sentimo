import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const About = () => {
  const [accuracy, setAccuracy] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/model-accuracy')
      .then(res => setAccuracy(res.data.accuracy))
      .catch(() => setAccuracy(null));
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-6 text-center">About Sentimo</h1>
          <p className="text-lg text-gray-700 mb-6 text-center">
            <span className="font-semibold text-indigo-600">Sentimo</span> is a modern web application for analyzing the sentiment of your text using AI-powered insights.
            <br /><br />
            Whether you're a guest or a registered user, Sentimo provides instant feedback on your text's emotional tone. Registered users can save their analysis history and gain valuable insights over time.
          </p>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-indigo-600 mb-2">Features</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Real-time sentiment analysis</li>
              <li>Secure and private: your data is protected</li>
              <li>History tracking for registered users</li>
              <li>Easy-to-use, professional interface</li>
            </ul>
          </div>
          <div className="bg-indigo-50 rounded-lg p-6 text-center mt-8">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">Model Accuracy</h3>
            {accuracy !== null ? (
              <p className="text-2xl font-bold text-green-700">
                {Math.round(accuracy * 100)}% accuracy
              </p>
            ) : (
              <p className="text-gray-600">
                <span className="font-bold text-indigo-600">Coming Soon:</span> Sentimo will soon use a state-of-the-art AI model for sentiment analysis.<br />
                <span className="italic">Model accuracy metrics will be displayed here once integrated.</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
