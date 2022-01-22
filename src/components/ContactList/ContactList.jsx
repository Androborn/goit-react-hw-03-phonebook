import PropTypes from "prop-types";

import { List, ListItem, ContactText, DeleteBtn } from "./ContactList.styled";

export const ContactList = ({ contacts, deleteContact }) => (
  <List>
    {contacts.map(({ id, name, number }) => (
      <ListItem key={id}>
        <ContactText>
          {name}: {number}
        </ContactText>
        <DeleteBtn type={"button"} onClick={() => deleteContact(id)}>
          Delete
        </DeleteBtn>
      </ListItem>
    ))}
  </List>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
