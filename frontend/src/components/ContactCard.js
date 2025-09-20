import { Phone, ArrowRight } from 'lucide-react';

// ContactCard Component
const ContactCard = ({ contact, onClick }) => {
  return (
    <div className="contact-card" onClick={onClick}>
      <div className="contact-avatar">
        <div className="avatar-circle">
          {contact.name.charAt(0).toUpperCase()}
        </div>
      </div>
      <div className="contact-info">
        <h3 className="contact-name">{contact.name}</h3>
        <p className="contact-email">{contact.email}</p>
        {contact.phone && (
          <p className="contact-phone">
            <Phone size={18} style={{ marginRight: '5px' }} /> {contact.phone}
          </p>
        )}
      </div>
      <div className="contact-actions">
        <ArrowRight size={20} />
      </div>
    </div>
  );
};

export default ContactCard;
