import React, { useState } from "react";
import useContactStore from "../store/useContactStore";
import "../ContactApp.css";
import { Mail, Phone, User, Trash2, ArrowLeft } from "lucide-react";

// ContactDetailPage Component
const ContactDetailPage = ({ navigate, contactId }) => {
  const { contacts, deleteContact } = useContactStore();
  const [isDeleting, setIsDeleting] = useState(false);

  const contact = contacts.find((c) => c._id === contactId);

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this contact? This action cannot be undone."
      )
    ) {
      setIsDeleting(true);
      try {
        await deleteContact(contactId);
        navigate("home");
      } catch (error) {
        console.error("Failed to delete contact");
        setIsDeleting(false);
      }
    }
  };

  if (!contact) {
    return (
      <div className="contact-detail-page">
        <div className="contact-detail-container">
          <div className="not-found">
            <h2>Contact Not Found</h2>
            <p>The contact you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate("home")}
              className="btn btn-primary"
            >
              <ArrowLeft size={16} /> Back to Contacts
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-detail-page">
      <div className="contact-detail-container">
        <div className="">
          <button onClick={() => navigate("home")} className="back-btn">
             <ArrowLeft size={18} />
          </button>
        </div>

        <div className="contact-detail-card">
          <div className="contact-header">
            <div className="contact-avatar-large">
              <div className="avatar-circle-large">
                <User size={36} />
              </div>
            </div>
            <div className="contact-title">
              <h1>{contact.name}</h1>
              <p className="contact-subtitle">Contact Details</p>
            </div>
          </div>

          <div className="contact-details">
            <div className="detail-section">
              <h3>Contact Information</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <div className="detail-icon">
                    <User size={20} />
                  </div>
                  <div className="detail-content">
                    <label>Full Name</label>
                    <span>{contact.name}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon">
                    <Mail size={20} />
                  </div>
                  <div className="detail-content">
                    <label>Email Address</label>
                    <span>{contact.gmail}</span>
                  </div>
                </div>

                {contact.phone && (
                  <div className="detail-item">
                    <div className="detail-icon">
                      <Phone size={20} />
                    </div>
                    <div className="detail-content">
                      <label>Phone Number</label>
                      <span>{contact.phone}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="contact-actions-section">
              <h3>Actions</h3>
              <div className="action-buttons">
                <a
                  href={`mailto:${contact.gmail}`}
                  className="btn btn-secondary"
                >
                  <Mail size={16} /> Send Email
                </a>
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="btn btn-secondary"
                  >
                    <Phone size={16} /> Call Now
                  </a>
                )}
                <button
                  onClick={handleDelete}
                  className="btn btn-danger"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <div className="btn-spinner"></div>
                      Deleting...
                    </>
                  ) : (
                    <span>
                      <Trash2 size={16} /> Delete Contact
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailPage;
