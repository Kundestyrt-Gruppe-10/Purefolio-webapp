import React, { Component } from 'react';
import styled from 'styled-components';

export default class Search extends Component {
  public render() {
    return (
      <>
        <Input placeholder="Search by country or industry" active={false} />
      </>
    );
  }
}

const Input = styled.input<{ active: boolean }>`
  color: white;
  font-size: var(--font-size-medium);
  font-family: Roboto;
  background: var(--sec-purple-color);
  border: none;
  width: 300px;
`;
