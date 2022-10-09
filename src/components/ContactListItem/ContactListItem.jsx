import PropTypes from 'prop-types';
import { ListItem, ContactText, DeleteBtn } from './ContactListItem.styled';

export const ContactListItem = ({
  id,
  name,
  number,
  handleContactDeletion,
}) => {
  return (
    <ListItem>
      <ContactText>
        {name}: {number}
      </ContactText>
      <DeleteBtn type={'button'} onClick={() => handleContactDeletion(id)}>
        Delete
      </DeleteBtn>
    </ListItem>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  handleContactDeletion: PropTypes.func.isRequired,
};
