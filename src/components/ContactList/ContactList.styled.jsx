import styled from "styled-components";

export const List = styled.ul``;

export const ListItem = styled.li`
  &::before {
    content: "📞";
    margin-right: 0.5rem;
    vertical-align: 0.25rem;
    font-size: 1.5rem;
  }
`;

export const ContactText = styled.span`
  display: inline-block;
  margin-right: 1rem;
  min-width: 25rem;
`;

export const DeleteBtn = styled.button`
  padding: 0.5rem;
  vertical-align: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  background: #f7a9a3;
  border: 1px solid;
  border-radius: 0.5rem;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
`;
