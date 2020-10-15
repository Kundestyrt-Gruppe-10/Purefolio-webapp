import React from 'react';
import styled from 'styled-components';

export const ChartPageHeaderComponent: React.FC = () => {
  return (
    <>
      <HeaderContainer active={false}>
        <SearchBox active={false}>Search</SearchBox>
        <DropDownBox active={false}>ESG drop down box</DropDownBox>
        <YearBox active={false}>2014</YearBox>
        <YearLineBox active={false} />
        <YearBox active={false}>2018</YearBox>
      </HeaderContainer>
    </>
  );
};

const HeaderContainer = styled.div<{ active: boolean }>`
  margin: 0;
  background-color: var(--sec-purple-color);
  padding: 10px 30px 10px 30px;
  color: white;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const SearchBox = styled.div<{ active: boolean }>`
  font: Roboto, sans-serif;
  flex-basis: 30%;
  border: 1px solid var(--third-bluegrey-color);
  padding: 10px;
  height: 10px;
  align-items: center;
  justify-content: center;
`;

const DropDownBox = styled.div<{ active: boolean }>`
  font: Roboto, sans-serif;
  flex-basis: 20%;
  border: 1px solid var(--third-bluegrey-color);
  padding: 10px;
`;
const YearBox = styled.div<{ active: boolean }>`
  flex-basis: 10%;
  border: 1px solid var(--third-bluegrey-color);
`;

const YearLineBox = styled.div<{ active: boolean }>`
  flex-basis: 12%;
  height: 2px;
  border: 0;
  border-top: 1px solid var(--third-bluegrey-color);
  margin: 20px 0;
  padding: 0;
`;
