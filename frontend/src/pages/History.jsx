import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, text: '', sentiment: '' });

  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:5000/history', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        });
        setHistory(res.data.history || []);
      } catch (err) {
        alert('Failed to fetch history. Please login again.');
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this record?')) return;
    try {
      await axios.delete(`http://localhost:5000/history/${id}`, { withCredentials: true });
      setHistory(history.filter(item => item._id !== id));
    } catch (err) {
      alert('Failed to delete.');
    }
  };

  const handleShow = (item) => {
    setModal({ open: true, text: item.text, sentiment: item.sentiment });
  };

  const closeModal = () => setModal({ open: false, text: '', sentiment: '' });

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col items-center pt-12 relative">
        <div className={`w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 transition-all duration-200 ${modal.open ? 'blur-sm pointer-events-none select-none' : ''}`}>
          <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Your Sentiment History</h1>
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : history.length === 0 ? (
            <div className="text-center text-gray-500">No history found.</div>
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="px-4 py-2 text-left">Text</th>
                  <th className="px-4 py-2 text-left">Sentiment</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {history.map(item => (
                  <tr key={item._id} className="border-b hover:bg-indigo-50">
                    <td className="px-4 py-2 truncate max-w-xs">{item.text.slice(0, 50)}{item.text.length > 50 ? '...' : ''}</td>
                    <td className="px-4 py-2">
                      <span className={
                        item.sentiment === 'Positive'
                          ? 'text-green-600 font-semibold'
                          : item.sentiment === 'Negative'
                          ? 'text-red-600 font-semibold'
                          : 'text-yellow-600 font-semibold'
                      }>
                        {item.sentiment}
                      </span>
                    </td>
                    <td className="px-4 py-2 flex gap-2 justify-center">
                      <button
                        onClick={() => handleShow(item)}
                        className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition text-sm"
                      >
                        Show
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* Modal */}
        {modal.open && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">Text & Sentiment</h2>
              <div className="mb-4">
                <div className="font-semibold text-gray-700 mb-1">Text:</div>
                <div className="bg-gray-100 rounded p-3 text-gray-800 break-words">{modal.text}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-1">Sentiment:</div>
                <div className={
                  "inline-block px-4 py-2 rounded-lg text-lg font-bold " +
                  (modal.sentiment === 'Positive'
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : modal.sentiment === 'Negative'
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : 'bg-yellow-100 text-yellow-700 border border-yellow-200')
                }>
                  {modal.sentiment}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default History;
