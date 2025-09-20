import React, { useState, useEffect } from 'react';
import '../ContactApp.css';
import axios from 'axios';

// Simple state management without Zustand
const useContactStore = () => {
    const API_URL = process.env.REACT_APP_API_URL;
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('contacts');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


const fetchContacts = async () => {
  setLoading(true);
  try {
    const response = await axios.get(`${API_URL}/api/contacts`);
    setContacts(response.data);
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
  } finally {
    setLoading(false);
  }
};

  const addContact = async (contactData) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/create-contact`,
        contactData
      );
      setContacts(prev => [...prev, res.data.contact]);
      return res.data.contact;
    } catch (err) {
      // IMPORTANT: throw the error so AddContactPage can catch it
      throw err;
    } finally {
      setLoading(false);
    }
  };

const deleteContact = async (id) => {
  setLoading(true);
  try {
    await axios.delete(`${API_URL}/api/contacts/${id}`);
    setContacts(prev => prev.filter(c => c._id !== id));
  } catch (error) {
    console.error("Failed to delete contact:", error);
  } finally {
    setLoading(false);
  }
};
  return { contacts, loading, fetchContacts, addContact, deleteContact };
};
export default useContactStore;