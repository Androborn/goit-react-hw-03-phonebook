import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import {
  ContactAddForm,
  NameLabel,
  NameInput,
  NumberLabel,
  NamberInput,
  SubmitBtn,
} from './ContactForm.styled';

export class ContactForm extends Component {
  state = { name: '', number: '' };

  _nameInputId = nanoid();
  _numberInputId = nanoid();

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const {
      state: { name, number },
      props,
      resetForm,
    } = this;

    props.onSubmit(name, number);
    resetForm();
  };

  resetForm = () =>
    this.setState({
      name: '',
      number: '',
    });

  render() {
    const {
      state: { name, number },
      _nameInputId,
      _numberInputId,
      handleSubmit,
      handleInputChange,
    } = this;

    return (
      <ContactAddForm onSubmit={handleSubmit}>
        <NameLabel htmlFor={_nameInputId}>Name</NameLabel>
        <NameInput
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleInputChange}
          id={_nameInputId}
        />
        <NumberLabel htmlFor={_numberInputId}>Number</NumberLabel>
        <NamberInput
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleInputChange}
          id={_numberInputId}
        />
        <SubmitBtn type={'submit'}>Add contact</SubmitBtn>
      </ContactAddForm>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
