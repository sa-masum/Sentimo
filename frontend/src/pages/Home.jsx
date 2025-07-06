import React from 'react';
import Header from '../components/Header';

const Home = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col items-center justify-center pt-12">
        <section className="w-full max-w-3xl mx-auto text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-700 mb-6 drop-shadow">
            Welcome to Sentimo
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Instantly analyze the sentiment of your text with AI-powered insights.<br />
            Discover emotions, trends, and more with just a click.
          </p>
          <a
            href="/analyze"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-indigo-700 transition text-lg"
          >
            Get Started
          </a>
        </section>
        <section className="mt-16 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <svg className="h-10 w-10 text-indigo-500 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="10" />
            </svg>
            <h3 className="font-bold text-lg mb-1">Real-Time Analysis</h3>
            <p className="text-gray-500 text-center">Get instant feedback on your text's sentiment with advanced AI models.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <svg className="h-10 w-10 text-indigo-500 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M17 9V7a5 5 0 00-10 0v2a5 5 0 00-2 4v5a2 2 0 002 2h10a2 2 0 002-2v-5a5 5 0 00-2-4z" />
            </svg>
            <h3 className="font-bold text-lg mb-1">Secure & Private</h3>
            <p className="text-gray-500 text-center">Your data is protected and never shared. Analyze with confidence.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <svg className="h-10 w-10 text-indigo-500 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 20l9-5-9-5-9 5 9 5z" />
              <path d="M12 12V4" />
            </svg>
            <h3 className="font-bold text-lg mb-1">History & Insights</h3>
            <p className="text-gray-500 text-center">Track your analysis history and gain valuable insights over time.</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
