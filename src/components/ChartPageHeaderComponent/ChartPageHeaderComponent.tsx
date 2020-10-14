import React from 'react';
import styled from 'styled-components';

export const ChartPageHeaderComponent: React.FC = () => {
  return (
    <>
      <HeaderContainer active={false}>
        <NavArea active={false}>
          <Nav active={false}>
            <NavButton active={false}>Test</NavButton>
            <NavButton active={false}>Test</NavButton>
            <NavButton active={false}>Test</NavButton>
            <NavButton active={false}>Test</NavButton>
          </Nav>
        </NavArea>
      </HeaderContainer>
    </>
  );
};

const HeaderContainer = styled.div<{ active: boolean }>`
  margin: 0;
  background-color: var(--sec-purple-color);
  padding: 0 30px 30px 30px;
  color: white;
`;

const NavArea = styled.div<{ active: boolean }>`
  margin: 0;
  padding: 20px 0;
  display: flex;
  flex-direction: row;
`;

const Nav = styled.nav<{ active: boolean }>`
  width: 50%;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0;
`;

const NavButton = styled.a<{ active: boolean }>`
  font: Roboto, sans-serif;
  color: var(--main-color-white);
  text-decoration: none;
`;
