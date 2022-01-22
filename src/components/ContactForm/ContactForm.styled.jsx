import styled from "styled-components";

export const ContactAddForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

export const NameLabel = styled.label`
  font-size: 2rem;
  font-weight: bold;
`;

export const NumberLabel = styled(NameLabel)``;

export const NameInput = styled.input`
  width: 20rem;
  padding: 0.5rem;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
`;

export const NamberInput = styled(NameInput)``;

export const SubmitBtn = styled.button`
  padding: 1rem;
  font-size: 2rem;
  font-weight: bold;
  background: #9dfc9e;
  border: 1px solid;
  border-radius: 0.5rem;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
`;
