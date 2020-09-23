import React, { Component } from 'react';
import styled from 'styled-components';
import SearchIcon from '../../img/search-icon.svg';

export default class Search extends Component {
  public render(): JSX.Element {
    return (
      <>
        <Input placeholder="Search by country or industry" active={false} />
      </>
    );
  }
}

const Input = styled.input<{ active: boolean }>`
  color: var(--main-black-color);
  font-size: var(--font-size-tiny);
  font-family: Roboto;
  background: var(--main-white-color);
  border: none;
  width: 300px;
  margin: 0 0 0 30px;
  padding: 10px;
  border-radius: 0;
  background-image: 'url(' ${SearchIcon} ')';
`;
