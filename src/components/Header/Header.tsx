import React from 'react';
import styled from 'styled-components';

/* Write component */

export const Header: React.FC = () => {
  return (
    <>
      <Background active={false}>
        <NavArea active={false}>
          <Logo active={false}>Nordic Trustee</Logo>
          <Nav active={false}>
            <NavButton active={false}>Test</NavButton>
            <NavButton active={false}>Test</NavButton>
            <NavButton active={false}>Test</NavButton>
            <NavButton active={false}>Test</NavButton>
          </Nav>
        </NavArea>
        <HRule active={false} />
        <HeaderInfo active={false}>
          <Headline active={false}>ESG Risk Rating</Headline>
          <HeaderText active={false}>
            Proin condimentum accumsan velit, sed fermentum sapien mollis non.
            Donec id lorem eu ipsum dignissim maximus vitae non lorem. Nam
            dictum odio ut dui scelerisque, eu mattis felis egestas. Ut aliquam
            nisl id pharetra pellentesque. Nam ac auctor ipsum, dapibus gravida
            quam. Nam id ultricies arcu. Donec aliquet malesuada volutpat.
          </HeaderText>
        </HeaderInfo>
      </Background>
    </>
  );
};

const Background = styled.div<{ active: boolean }>`
    margin: 0;
    background-color: var(--sec-purple-color);
    padding 0 50px;
    color: white;
`;

const NavArea = styled.div<{ active: boolean }>`
  margin: 0;
  padding: 50px 0;
  display: flex;
  flex-direction: row;
`;

const Nav = styled.nav<{ active: boolean }>`
  width: 40%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0;
`;

const NavButton = styled.a<{ active: boolean }>`
  font: Roboto, sans-serif;
`;

const Logo = styled.a<{ active: boolean }>`
  width: 60%;
  font: Roboto, sans-serif;
`;

const HRule = styled.hr<{ active: boolean }>`
  background-color: white;
  height: 0.8px;
  border: none;
`;

const HeaderInfo = styled.div<{ active: boolean }>`
  margin: 0;
  padding: 40px 0;
  display: flex;
  flex-direction: row;
  jusify-content: space-between;
`;

const Headline = styled.h1<{ active: boolean }>`
  width: 60%;
  font-size: 24px;
  font-weight: 900;
`;

const HeaderText = styled.p<{ active: boolean }>`
  width: 40%;
`;
