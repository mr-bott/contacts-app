import React, { useState } from 'react';
import useContactStore from '../store/useContactStore';
import '../ContactApp.css';
import { User, Mail, Phone, X, Check } from 'lucide-react'; // import Lucide icons

const AddContactPage = ({ navigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    gmail: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addContact } = useContactStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    setBackendError('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.gmail.trim()) newErrors.gmail = 'Gmail is required';
    else if (!/\S+@\S+\.\S+/.test(formData.gmail)) newErrors.gmail = 'Please enter a valid gmail';
    if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) newErrors.phone = 'Please enter a valid phone number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await addContact(formData);
      navigate('home');
    } catch (error) {
      console.error('Failed to add contact:', error);
      if (error.response?.data?.message) setBackendError(error.response.data.message);
      else setBackendError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-contact-page">
      <div className="add-contact-container">
        <div className="page-header">
          <h1>Add New Contact</h1>
          <p>Fill in the details to add a new contact to your list</p>
        </div>

        <div className="form-card">
          <form onSubmit={handleSubmit} className="contact-form">
            {backendError && <div className="backend-error">{backendError}</div>}

            <div className="form-group">
              <label className="form-label">
                <User size={16} /> Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="Enter full name"
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                <Mail size={16} /> Gmail Address *
              </label>
              <input
                type="email"
                name="gmail"
                value={formData.gmail}
                onChange={handleInputChange}
                className={`form-input ${errors.gmail ? 'error' : ''}`}
                placeholder="Enter gmail address"
              />
              {errors.gmail && <span className="error-text">{errors.gmail}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                <Phone size={16} /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`form-input ${errors.phone ? 'error' : ''}`}
                placeholder="Enter phone number"
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate('home')}
                className="btn btn-secondary"
                disabled={isSubmitting}
        
              >
                <X size={16} /> Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="btn-spinner"></div> Adding...
                  </>
                ) : (
                  <>
                    <Check size={16} /> Add Contact
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContactPage;
