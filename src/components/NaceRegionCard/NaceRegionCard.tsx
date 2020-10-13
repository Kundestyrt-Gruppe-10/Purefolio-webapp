import React from 'react';
import styled from 'styled-components';

export const NaceRegionCard: React.FC = () => {
  return (
    <>
      <CardBackground active={true}>
        <CardBar active={true} />
        <CountryDropDown active={true}>
          Norway
          <DropDownOptions active={true}>Norway</DropDownOptions>
        </CountryDropDown>
        <div>Industry:</div>
        <DropDownMenu active={true}>Industry</DropDownMenu>
        <div>Sub-sector:</div>
        <DropDownMenu active={true}> Subsector</DropDownMenu>
      </CardBackground>
    </>
  );
};

export const NaceRegionCardContainer: React.FC = () => {
  return (
    <Background active={true}>
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
  padding: 3px 70px;
  margin: 0;
  background-color: var(--sec-orange-color);
`;

const DropDownMenu = styled.select<{ active: boolean }>`
  border-color: var(--sec-purple-color);
  border-width: 3px;
  background-color: var(--third-bluegrey-color);
  padding: 8px 70px;
  margin: 10px;
`;

const CountryDropDown = styled.select<{ active: boolean }>`
  border: none;
  background-color: var(--third-bluegrey-color);
  padding: 8px 70px;
  margin: 10px;
  text-align-last: left;
`;

const DropDownOptions = styled.option<{ active: boolean }>`
  color: var(--sec-purple-color);
  text-align-last: left;
`;
