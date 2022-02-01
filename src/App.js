import { Component } from 'react';
import { nanoid } from 'nanoid';

import { Section, ContactForm, Filter, ContactList } from './components';
import {
  handleInputChange,
  saveToStorage,
  loadFromStorage,
  DATA_TO_LOAD,
  DATA_TO_SAVE,
} from './utils';

import { Wrapper, PageHeader } from './App.styled';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    this.setState(() => ({
      [DATA_TO_LOAD]: [...loadFromStorage(DATA_TO_LOAD)],
    }));
  }

  componentDidUpdate(_, prevState) {
    const { state, filterContacts, claenFilter } = this;

    state[DATA_TO_SAVE] !== prevState[DATA_TO_SAVE] &&
      saveToStorage(DATA_TO_SAVE, state[DATA_TO_SAVE]);

    if (prevState.filter && filterContacts().length === 0) {
      claenFilter();
    }
  }

  handleFilterInputChange = handleInputChange.bind(this);

  addContact = (newName, newNumber) => {
    const newContact = {
      id: nanoid(),
      name: newName,
      number: newNumber,
    };
    const { name } = newContact;

    this.checkDuplicatedContacts(name)
      ? alert(`${name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [newContact, ...prevState.contacts],
        }));
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
    return filteredContacts;
  };

  claenFilter = () => {
    this.setState({ filter: '' });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  checkDuplicatedContacts = validatedName =>
    this.state.contacts.find(
      contact => contact.name.toLowerCase() === validatedName.toLowerCase(),
    );

  render() {
    const { filter } = this.state;
    const {
      addContact,
      handleFilterInputChange,
      filterContacts,
      deleteContact,
    } = this;

    return (
      <Wrapper>
        <PageHeader>Phonebook</PageHeader>
        <ContactForm onSubmit={addContact} />
        <Section header="Contacts">
          <Filter value={filter} onChange={handleFilterInputChange}>
            Find contacts by name
          </Filter>
          <ContactList
            contacts={filterContacts()}
            deleteContact={deleteContact}
          />
        </Section>
      </Wrapper>
    );
  }
}
