import styled from 'styled-components';

export const Button = styled.button<{ active: boolean }>`
  font-family: 'Roboto', sans-serif;
  background: var(--main-white-color);
  color: var(--main-black-color);
  border-radius: 0;
  font-size: var(--font-size-tiny);
  padding: 10px;
  margin-left: 6px;
  border: none;
`;
