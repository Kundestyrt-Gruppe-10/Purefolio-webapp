import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

const options = [
  { value: '2018', label: '2018' },
  { value: '2017', label: '2017' },
  { value: '2016', label: '2016' },
];

export const PeriodDropdown: React.FC = () => {
  return <Select options={options} />;
};
