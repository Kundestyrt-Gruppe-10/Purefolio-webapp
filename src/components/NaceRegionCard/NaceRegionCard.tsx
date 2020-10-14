import { fontsize } from '*.svg';
import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

const data = [
  { regionId: 1, regionName: 'Norway', label: 'Norway' },
  { regionId: 2, regionName: 'Sweden', label: 'Sweden' },
  { regionId: 3, regionName: 'Denmark' },
  { regionId: 4, regionName: 'Finland' },
  { regionId: 5, regionName: 'United Kingdom' },
  { regionId: 6, regionName: 'Germany' },
  { regionId: 7, regionName: 'France' },
  { regionId: 8, regionName: 'Spain' },
  { regionId: 9, regionName: 'Italy' },
  { regionId: 10, regionName: 'Switzerland' },
];

export const NaceRegionCard: React.FC = () => {
  return (
    <>
      <CardBackground active={true}>
        <CardBar active={true} />
        <CardTop active={true}>
          <CustomSelect active={true} options={data} />
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
        <DropDownMenu active={true}>Industry</DropDownMenu>
        <Text active={true}>Sub-sector:</Text>
        <DropDownMenu active={true}> Subsector</DropDownMenu>
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

const CustomSelect = styled(Select)`
  /*.react-select__indicators {
    background-color: red;
    border: solid red 2px;
    background-color: black;
  }
  & .Select__dropdown-indicator{
    color: red;
  }*/
  &.Select--multi {
    .Select-value {
      display: inline-flex;
      align-items: center;
    }
  }

  & .Select-placeholder {
    font-size: smaller;
  }

  width: 65%;
  padding: 8px 0;
  margin: 10px 0 15px 0;
  font-weight: 700;
  font-size: var(--font-size-tiny);
  background-color: var(--third-bluegrey-color);
`;

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
