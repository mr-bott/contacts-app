// App.js
import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import AddContactPage from './pages/AddContactPage';
import ContactDetailPage from './pages/ContactDetailPage';
import Footer from './pages/Footer';
import './ContactApp.css';

function App() {
  // Simple navigation state
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedContactId, setSelectedContactId] = useState(null);

  const navigate = (page, contactId = null) => {
    setCurrentPage(page);
    setSelectedContactId(contactId);
    window.scrollTo(0, 0); // scroll to top on page change
  };

  return (
    <div className="app">
      {currentPage === 'home' && <HomePage navigate={navigate} />}
      {currentPage === 'add-contact' && <AddContactPage navigate={navigate} />}
      {currentPage === 'contact-detail' && selectedContactId && (
        <ContactDetailPage navigate={navigate} contactId={selectedContactId} />
      )}
      <Footer />
    </div>
  );
}

export default App;
