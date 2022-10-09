import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactForm, Filter, ContactList } from './components';
import { saveToStorage, loadFromStorage } from './utils';
import { DATA_TO_LOAD, DATA_TO_SAVE } from './utils/constants';
import { Wrapper, PageHeader, SectionHeader } from './App.styled';

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
    const { state, filterContacts, cleanFilter } = this;
    const noFilterMatch = state.filter && filterContacts().length === 0;

    state[DATA_TO_SAVE] !== prevState[DATA_TO_SAVE] &&
      saveToStorage(DATA_TO_SAVE, state[DATA_TO_SAVE]);

    if (noFilterMatch) {
      cleanFilter();
    }
  }

  handleFilterInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  addContact = (newName, newNumber) => {
    const newContact = {
      id: nanoid(),
      name: newName,
      number: newNumber,
    };
    const { name } = newContact;

    this.checkDuplicatedContacts(name)
      ? toast.warn(`${name} is already in contacts`, {
          position: 'bottom-center',
          autoClose: 2000,
        })
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

  cleanFilter = () => {
    toast.info("There's no such contact", {
      toastId: 'filter-toast',
      position: 'bottom-center',
      autoClose: 1000,
    });
    setTimeout(() => this.setState({ filter: '' }), 2000);
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
    const {
      state: { filter },
      addContact,
      handleFilterInputChange,
      filterContacts,
      deleteContact,
    } = this;

    return (
      <Wrapper>
        <PageHeader>Phonebook</PageHeader>
        <ContactForm onSubmit={addContact} />
        <SectionHeader>Contacts</SectionHeader>
        <Filter value={filter} onChange={handleFilterInputChange}>
          Find contacts by name
        </Filter>
        <ContactList
          contacts={filterContacts()}
          deleteContact={deleteContact}
        />
        <ToastContainer />
      </Wrapper>
    );
  }
}
