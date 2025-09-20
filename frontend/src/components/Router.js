
// Simple routing without react-router-dom
import React from 'react';
import HomePage from '../pages/HomePage';
import AddContactPage from '../pages/AddContactPage';
import ContactDetailPage from '../pages/ContactDetailPage';
const Router = ({ currentPage, setCurrentPage, contactId, setContactId }) => {
  const navigate = (page, id = null) => {
    setCurrentPage(page);
    setContactId(id);
  };

  const props = { navigate, contactId };

  switch (currentPage) {
    case 'add-contact':
      return <AddContactPage {...props} />;
    case 'contact-detail':
      return <ContactDetailPage {...props} />;
    default:
      return <HomePage {...props} />;
  }
};
export default Router;