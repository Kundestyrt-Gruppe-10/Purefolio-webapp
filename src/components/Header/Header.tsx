import React from 'react';
import styled from 'styled-components';
import { SearchBar } from './SearchBar';
import logo from '../../img/NT_Logo_original_primaer_negativ_RGB.svg';
import { BrowserRouter as Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <>
      <Background active={false}>
        <NavArea active={false}>
          <LogoContainer active={false}>
            <Link to="/">
              <Logo src={logo} alt="Title" active={false} />
            </Link>
          </LogoContainer>
          <Nav active={false}>
            <Link to="/test" style={{ textDecoration: 'none', color: 'white' }}>
              <NavButton active={false}>Test</NavButton>
            </Link>
            <NavButton active={false}>Test</NavButton>
            <NavButton active={false}>Test</NavButton>
            <NavButton active={false}>Test</NavButton>
          </Nav>
        </NavArea>
        <SearchBar />
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
  color: var(--main-color-white);
  text-decoration: none;
`;

const LogoContainer = styled.a<{ active: boolean }>`
  width: 70%;
  font: Roboto, sans-serif;
`;

const Logo = styled.img<{ active: boolean }>`
  width: 300px;
`;
