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

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  
 
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    // sortContacts();
  }, [contacts]);

  // const sortContacts = () => {
  //   setContacts(prevContacts =>
  //     [...prevContacts].sort((a, b) => a.name.localeCompare(b.name))
  //   );
  // };

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleNumberChange = e => {
    setNumber(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already a contact!`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
    setName('');
    setNumber('');
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
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
          <Filter
            filter={filter}
            handleFilterChange={handleFilterChange}
          />
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


// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       contacts: [],
//       name: '',
//       number: '',
//       filter: '',
//     };
//   }
//   // metody cyklu życiowego zad react-03 + sortowanie alfabetyczne
//   componentDidMount() {
//     const storedContacts = localStorage.getItem('contacts');
//     if (storedContacts) {
//       this.setState({ contacts: JSON.parse(storedContacts) }, () => {
//         this.sortContacts();
//       });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.contacts !== this.state.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//       this.sortContacts();
//     }
//   }

//   sortContacts() {
//     this.setState({
//       contacts: this.state.contacts.sort((a, b) =>
//         a.name.localeCompare(b.name)
//       ),
//     });
//   }
//   ////////////////////////////////
//   handleNameChange = e => {
//     this.setState({ name: e.target.value });
//   };

//   handleNumberChange = e => {
//     this.setState({ number: e.target.value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     const { contacts, name, number } = this.state;

//     if (
//       contacts.some(
//         contact => contact.name.toLowerCase() === name.toLowerCase()
//       )
//     ) {
//       alert(`${name} is already a contact!`);
//       return;
//     }

//     const newContact = {
//       id: nanoid(),
//       name,
//       number,
//     };

//     this.setState({
//       contacts: [...contacts, newContact],
//       name: '',
//       number: '',
//     });
//   };

//   handleFilterChange = e => {
//     this.setState({ filter: e.target.value });
//   };

//   handleDeleteContact = id => {
//     this.setState({
//       contacts: this.state.contacts.filter(contact => contact.id !== id),
//     });
//   };

//   render() {
//     const { name, number, filter, contacts } = this.state;

//     return (
//       <div
//         className={image.background}
//         style={{
//           width: 900,
//           height: 900,
//           display: 'flex',
//           justifyContent: 'start',
//           alignItems: 'start',
//           gap: 60,
//           fontSize: 30,
//           color: '#010101',
//           margin: 20,
//           padding: 20,
//           border: '10px solid darkgray',
//           borderRadius: 15,
//         }}
//       >
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'start',
//             flexDirection: 'column',
//           }}
//         >
//           <h1>Phonebook</h1>
//           <ContactForm
//             name={name}
//             number={number}
//             handleNameChange={this.handleNameChange}
//             handleNumberChange={this.handleNumberChange}
//             handleSubmit={this.handleSubmit}
//           />
//         </div>
//         <div
//           style={{
//             marginTop: 13,
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'start',
//             flexDirection: 'column',
//             gap: 30,
//           }}
//         >
//           <div>
//             <h2 style={{ marginBottom: 4 }}>Contacts</h2>
//             <Filter
//               filter={filter}
//               handleFilterChange={this.handleFilterChange}
//             />
//           </div>
//           <div>
//             <h2 style={{ marginTop: '25px' }}>Contact list</h2>
//             <ContactList
//               contacts={contacts.filter(contact =>
//                 contact.name.toLowerCase().includes(filter.toLowerCase())
//               )}
//               handleDeleteContact={this.handleDeleteContact}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;