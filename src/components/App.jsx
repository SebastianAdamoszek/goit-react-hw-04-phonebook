import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import image from '../image/image.module.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [shouldSort, setShouldSort] = useState(false);
////////////////////////
  useEffect(() => {
    // Odczytanie listy kontaktów z localStorage
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (storedContacts) {
      setContacts(storedContacts);
    }
  }, []);

  useEffect(() => {
    // Zapisanie listy kontaktów do localStorage po zmianie
    localStorage.setItem('contacts', JSON.stringify(contacts));
    if (shouldSort) {
      sortContacts();
      setShouldSort(false); 
    }
  }, [contacts, shouldSort]);
////////////////////////
  const sortContacts = () => {
    setContacts(prevContacts =>
      [...prevContacts].sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleNumberChange = e => {
    setNumber(e.target.value);
  };

  const handleSubmit = (e, name, number) => {
    e.preventDefault();
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already a contact!`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    setContacts([...contacts, newContact]);
    setName('');
    setNumber('');
    setShouldSort(true);
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
    setFilter(''); 
  };

  return (
    <div
      className={image.background}
      style={{
        width: 900,
        height: 900,
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'start',
        gap: 60,
        fontSize: 30,
        color: '#010101',
        margin: 20,
        padding: 20,
        border: '10px solid darkgray',
        borderRadius: 15,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
          flexDirection: 'column',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm
          name={name}
          number={number}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          handleSubmit={handleSubmit}
        />
      </div>
      <div
        style={{
          marginTop: 13,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
          flexDirection: 'column',
          gap: 30,
        }}
      >
        <div>
          <h2 style={{ marginBottom: 4 }}>Contacts</h2>
          <Filter filter={filter} handleFilterChange={handleFilterChange} />
        </div>
        <div>
          <h2 style={{ marginTop: '25px' }}>Contact list</h2>
          <ContactList
            contacts={contacts.filter(contact =>
              contact.name.toLowerCase().includes(filter.toLowerCase())
            )}
            handleDeleteContact={handleDeleteContact}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
