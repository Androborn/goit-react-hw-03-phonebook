import { Component } from 'react';
import { nanoid } from 'nanoid';

import { Section, ContactForm, Filter, ContactList } from './components';
import { handleInputChange, saveToStorage, loadFromStorage } from './utils';

import { Wrapper, PageHeader } from './App.styled';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

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
          contacts: [...prevState.contacts, newContact],
        }));
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
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

  componentDidMount() {
    const dataToLoad = 'contacts';

    this.setState(() => ({
      [dataToLoad]: [...loadFromStorage(dataToLoad)],
    }));
  }

  componentDidUpdate(prevState) {
    const { state } = this;
    const dataToSave = 'contacts';

    state[dataToSave] !== prevState[dataToSave] &&
      saveToStorage(dataToSave, state[dataToSave]);
  }

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
        <Section header={'Contacts'}>
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
