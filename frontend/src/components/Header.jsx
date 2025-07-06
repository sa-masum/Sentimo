import React, { useEffect, useState } from 'react';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

function removeCookie(name) {
  document.cookie = `${name}=; Max-Age=0; path=/;`;
}

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getCookie('token'));
  }, []);

  const handleLogout = () => {
    removeCookie('token');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-30">
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-extrabold text-indigo-700 tracking-tight select-none">
            {/* Logo or App Name */}
            Sentimo
          </span>
        </div>
        <ul className="flex items-center gap-6">
          <li>
            <a href="/" className="text-gray-700 hover:text-indigo-600 font-medium transition">
              Home
            </a>
          </li>
          <li>
            <a href="/analyze" className="text-gray-700 hover:text-indigo-600 font-medium transition">
              Analyze
            </a>
          </li>
          <li>
            <a href="/history" className="text-gray-700 hover:text-indigo-600 font-medium transition">
              History
            </a>
          </li>
          <li>
            <a href="/about" className="text-gray-700 hover:text-indigo-600 font-medium transition">
              About
            </a>
          </li>
          {!isLoggedIn ? (
            <>
              <li>
                <a href="/register" className="text-gray-700 hover:text-indigo-600 font-medium transition">
                  Register
                </a>
              </li>
              <li>
                <a href="/login" className="text-gray-700 hover:text-indigo-600 font-medium transition">
                  Login
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/profile" className="text-gray-700 hover:text-indigo-600 font-medium transition">
                  Profile
                </a>
              </li>
              <li>
                <button
                  className="ml-2 bg-indigo-600 text-white px-4 py-1.5 rounded-lg font-semibold shadow hover:bg-indigo-700 transition"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
