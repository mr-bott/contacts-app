import React, { useState, useEffect } from 'react';
import useContactStore from '../store/useContactStore';
import '../ContactApp.css'; 
import ContactCard from '../components/ContactCard';
import { UserPlus } from 'lucide-react';
// HomePage Component
const HomePage = ({ navigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { contacts, loading, fetchContacts } = useContactStore();

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.gmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  return (
    <div className="homepage">
      <div className="homepage-container">
        <header className="homepage-header">
          <div className="hero-section">
            <h1 className="hero-title">Contact Manager</h1>
            <p className="hero-description">
              Organize and manage your contacts with ease. Add, search, and keep track of all your important connections in one beautiful place.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <h3>{contacts.length}</h3>
                <p>Total Contacts</p>
              </div>
              <div className="stat">
                <h3>{new Set(contacts.map(c => c.gmail.split('@')[1])).size}</h3>
                <p>Unique Domains</p>
              </div>
              <div className="stat">
                <h3>{contacts.filter(c => c.phone).length}</h3>
                <p>With Phone Numbers</p>
              </div>
            </div>
          </div>
        </header>

        <section className="search-section">
          <div className="search-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search contacts by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <div className="search-icon"></div>
            </div>
            <button 
              onClick={() => navigate('add-contact')} 
              className="btn btn-primary add-contact-btn"
            >
              <UserPlus size={20} /> Add Contact
            </button>
          </div>
        </section>

        <section className="contacts-section">
          <div className="section-header">
            <h2>Your Contacts</h2>
            <p>{filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''} found</p>
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : filteredContacts.length > 0 ? (
            <div className="contacts-grid">
              {filteredContacts.map(contact => (
                <ContactCard 
                  key={contact._id} 
                  contact={contact} 
                  onClick={() => navigate('contact-detail', contact._id)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon"></div>
              <h3>No contacts found</h3>
              <p>
                {searchTerm 
                  ? `No contacts match "${searchTerm}". Try a different search term.`
                  : "You haven't added any contacts yet. Start by adding your first contact!"
                }
              </p>
              {!searchTerm && (
                <button 
                  onClick={() => navigate('add-contact')} 
                  className="btn btn-primary"
                >
                  Add Your First Contact
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
export default HomePage;