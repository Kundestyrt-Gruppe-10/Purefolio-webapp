import React from 'react';
import styled from 'styled-components';
import logo from '../../img/NT_Logo_original_primaer_negativ_RGB.svg';
import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBarComponent';

export const HeaderComponent: React.FC = () => {
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
            <Link to="/chartpage" style={{ textDecoration: 'none' }}>
              <NavButton active={false}>ChartPage</NavButton>
            </Link>
            <Link
              to="/chartpage/25,1;25,5;25,11/emissionPerYear/2015/2017/1"
              style={{ textDecoration: 'none' }}
            >
              <NavButton active={false}>Norway Emissions</NavButton>
            </Link>
            <Link to="/chartpage/2,1;1,1;13,1;7,1/fatalAccidentsAtWork/2015/2018/1">
              <NavButton active={false}>EU Agriculture</NavButton>
            </Link>
          </Nav>
        </NavArea>
        <SearchBar onChartPage={false} regionList={[]} naceList={[]} />
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
  color: #f7f8f6;
  text-decoration: none;
`;

const LogoContainer = styled.a<{ active: boolean }>`
  width: 70%;
  font: Roboto, sans-serif;
`;

const Logo = styled.img<{ active: boolean }>`
  width: 300px;
`;

const PresetContainer = styled.div`
  display: flex;
  grid-column-start: 1;
  flex-direction: column;
  justify-content: center;
  color: var(--sec-purple-color);
  font-size: var(--font-size-tiny);
  padding-left: 30px;
`;
