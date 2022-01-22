import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;
  padding-top: 10vh;
  font-size: 2rem;
  background: #cbf1f7;
`;

export const PageHeader = styled.h1`
  margin-bottom: 1rem;
  font-size: 4rem;

  &::before {
    content: "☎️";
    margin-right: 1rem;
    vertical-align: 0.5rem;
    font-size: 3rem;
  }
`;
