import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export const EsgSectorDropdown: React.FC = () => {
  return <Select options={options} />;
};
