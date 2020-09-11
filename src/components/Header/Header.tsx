import React from 'react';
import styled from 'styled-components';

/* Write component */

export const Header: React.FC = () => {
  return (
    <>
      <Background>
        <NavArea>
          <Logo>Nordic Trustee</Logo>
          <Nav>
            <NavButton>Test</NavButton>
            <NavButton>Test</NavButton>
            <NavButton>Test</NavButton>
            <NavButton>Test</NavButton>
          </Nav>
        </NavArea>
        <HRule />
      </Background>
    </>
  );
};

const Background = styled.div<{ active: boolean }>`
    margin: 0;
    background-color: var(--sec-purple-color);
    padding 0 50px;
`;

const NavArea = styled.div<{ active: boolean }>`
  margin: 0;
  padding: 50px 0;
  display: flex;
  flex-direction: row;
`;

const Nav = styled.nav<{ active: boolean }>`
  width: 50%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0;
`;

const NavButton = styled.a<{ active: boolean }>`
  color: white;
  font: Roboto, sans-serif;
`;

const Logo = styled.a<{ active: boolean }>`
  width: 50%;
  color: white;
  font: Roboto, sans-serif;
`;

const HRule = styled.hr<{ active: boolean }>`
  color: white;
  background-color: white;
  height: 1px;
`;

const HeaderInfo = styled.div<{ active: boolean }>``;
