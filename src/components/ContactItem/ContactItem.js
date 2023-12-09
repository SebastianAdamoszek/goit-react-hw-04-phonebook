import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactItem.module.css';

const ContactItem = ({ contact, handleDeleteContact }) => (
  <li key={contact.id}>
        <p className={css.list__style}></p>
        <p className={css.contact}>{contact.name}: {contact.number}</p>
        <button className={css.button__del} onClick={() => handleDeleteContact(contact.id)}>Delete</button>
      </li>
);


ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  handleDeleteContact: PropTypes.func.isRequired,
}

export default ContactItem;
