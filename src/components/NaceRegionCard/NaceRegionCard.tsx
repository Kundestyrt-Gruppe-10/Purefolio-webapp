import { fontsize } from '*.svg';
import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { Redirect } from 'react-router-dom';

const data = [
  { regionId: 1, value: 'Norway', label: 'Norway' },
  { regionId: 2, value: 'Sweden', label: 'Sweden' },
  { regionId: 3, value: 'Denmark', label: 'Denmark' },
  { regionId: 4, value: 'Finland', label: 'Finland' },
  { regionId: 5, value: 'United Kingdom', label: 'United Kingdom' },
  { regionId: 6, value: 'Germany', label: 'Germany' },
  { regionId: 7, value: 'France', label: 'France' },
  { regionId: 8, value: 'Spain', label: 'Spain' },
  { regionId: 9, value: 'Italy', label: 'Italy' },
  { regionId: 10, value: 'Switzerland', label: 'Switzerland' },
];

const customStyles = {};

export const NaceRegionCard: React.FC = () => {
  return (
    <>
      <CardBackground active={true}>
        <CardBar active={true} />
        <CardTop active={true}>
          <Select
            className="country-select"
            classNamePrefix="react-select"
            active={true}
            options={data}
          />
          <Button danger={true}>
            <i
              className="material-icons"
              style={{ fontSize: 'inherit', fontWeight: 'bold' }}
            >
              add
            </i>
          </Button>
          <Button danger={true}>
            <i
              className="material-icons"
              style={{ fontSize: 'inherit', fontWeight: 'bold' }}
            >
              remove
            </i>
          </Button>
          <DangerButton danger={true}>
            <i
              className="material-icons"
              style={{ fontSize: 'inherit', fontWeight: 'bold' }}
            >
              close
            </i>
          </DangerButton>
        </CardTop>
        <Text active={true}>Industry:</Text>
        <div
          style={{
            border: '2px solid var(--sec-purple-color)',
            marginBottom: '10px',
          }}
        >
          <Select
            width="100%"
            height="5px"
            classNamePrefix="react-select"
            active={true}
            options={data}
          />
        </div>
        <Text active={true}>Sub-sector:</Text>
        <div style={{ border: '2px solid var(--sec-purple-color)' }}>
          <Select
            width="100%"
            classNamePrefix="react-select"
            active={true}
            options={data}
          />
        </div>
      </CardBackground>
    </>
  );
};

export const NaceRegionCardContainer: React.FC = () => {
  return (
    <Background active={true}>
      <NaceRegionCard />
      <NaceRegionCard />
    </Background>
  );
};

const Background = styled.div<{ active: boolean }>`
  margin: 0;
  background-color: var(--main-white-color);
  padding: 100px;
  display: flex;
  flex-direction: row;
`;

const CardBackground = styled.div<{ active: boolean }>`
  padding: 0px 20px 20px 20px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--third-bluegrey-color);
  color: var(--sec-purple-color);
  font-size: var(--font-size-tiny);
`;

const CardBar = styled.div<{ active: boolean }>`
  padding: 5px 70px;
  margin: 0;
  background-color: var(--third-turquoise-color);
`;

const DropDownMenu = styled.select<{ active: boolean }>`
  border-color: var(--sec-purple-color);
  border-width: 3px;
  background-color: var(--third-bluegrey-color);
  padding: 8px 70px;
  margin: 5px 0 15px 0;
`;

const CountryDropDown = styled.select<{ active: boolean }>`
  width: 65%;
  border: none;
  background-color: var(--third-bluegrey-color);
  padding: 8px 0;
  margin: 10px 0 15px 0;
  font-weight: 700;
  font-size: var(--font-size-tiny);
`;

/*
const CustomSelect = styled(ReactSelect)`
  & .Select__indicator Select__dropdown-indicator {
    border-color: transparent transparent red;
    color: red;
    background: red;
  }

  font-weight: 700;
  font-size: var(--font-size-tiny);

  width: 65%;
  margin: 10px 0 15px 0;
`;
*/

const DropDownOptions = styled.option<{ active: boolean }>`
  color: var(--sec-purple-color);
  text-align-last: left;
`;

const CardTop = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
`;

const Button = styled.button<{ danger: boolean }>`
  &:hover {
    background: var(--sec-purple-color);
    color: var(--third-bluegrey-color);
  }
  width: 16px;
  height: 16px;
  padding: 0;
  font-size: 12px;
  margin: auto;
  border: 1.5px var(--sec-purple-color) solid;
  color: var(--sec-purple-color);
  background-color: var(--third-bluegrey-color);
`;

const DangerButton = styled.button<{ danger: boolean }>`
  &:hover {
    background: #b00020;
    color: var(--third-bluegrey-color);
  }
  width: 16px;
  height: 16px;
  padding: 0;
  font-size: 12px;
  margin: auto;
  border: 1.5px #b00020 solid;
  color: #b00020;
  background-color: var(--third-bluegrey-color);
`;

const Text = styled.div<{ active: boolean }>`
  font-size: var(--font-size-xtiny);
  font-weight: 600;
`;
