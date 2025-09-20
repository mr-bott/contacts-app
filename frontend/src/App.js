import React, { useState } from 'react';
import Router from './components/Router';
import ToastContainer from './components/ToastContainer';
import './ContactApp.css';
import AddContactPage from './pages/AddContactPage';

// Note: Other page components like HomePage and ContactDetailPage would be similarly defined in their respective files.

// Simple CSS for the app can be included in ContactApp.css   
// Main App Component
function ContactApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [contactId, setContactId] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div className="contact-app">
      <Router 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        contactId={contactId}
        setContactId={setContactId}
      />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default ContactApp;