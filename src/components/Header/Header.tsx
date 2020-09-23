import React from 'react';
import styled from 'styled-components';
import Search from './Search';
import logo from '../../img/NT_Logo_original_primaer_negativ_RGB.svg';

export const Header: React.FC = () => {
  return (
    <>
      <Background active={false}>
        <NavArea active={false}>
          <LogoContainer active={false}>
            <Logo src={logo} alt="Title" active={false} />
          </LogoContainer>
          <Nav active={false}>
            <NavButton active={false}>Test</NavButton>
            <NavButton active={false}>Test</NavButton>
            <NavButton active={false}>Test</NavButton>
            <NavButton active={false}>Test</NavButton>
          </Nav>
        </NavArea>
        <Search />
      </Background>
    </>
  );
};

const Background = styled.div<{ active: boolean }>`
  margin: 0;
  background-color: var(--sec-purple-color);
  padding: 0 50px 50px 50px;
  color: white;
`;

const NavArea = styled.div<{ active: boolean }>`
  margin: 0;
  padding: 50px 0;
  display: flex;
  flex-direction: row;
`;

const Nav = styled.nav<{ active: boolean }>`
  width: 30%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0;
`;

const NavButton = styled.a<{ active: boolean }>`
  font: Roboto, sans-serif;
`;

const LogoContainer = styled.a<{ active: boolean }>`
  width: 70%;
  font: Roboto, sans-serif;
`;

const Logo = styled.img<{ active: boolean }>`
  width: 300px;
`;
