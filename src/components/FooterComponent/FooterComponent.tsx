import React from 'react';
import styled from 'styled-components';

export const FooterComponent: React.FC = () => {
  return (
    <>
      <Background active={false}>
        <FooterInfo active={false}>
          This project is developed by students for Nordic Trustee, for the
          course TDT4290 at Norwegian University of Science and Technology.
        </FooterInfo>
        <FooterLinks active={false}>
          {/*           <Link active={false}>Test</Link>
          <Link active={false}>Test</Link>
          <Link active={false}>Test</Link>
          <Link active={false}>Test</Link> */}
        </FooterLinks>
      </Background>
    </>
  );
};

const Background = styled.div<{ active: boolean }>`
  margin: 0;
  background-color: var(--main-black-color);
  padding: 50px;
  color: white;
  display: flex;
  flex-direction: row wrap;
`;

const FooterInfo = styled.p<{ active: boolean }>`
  margin: 0;
  padding-right: 100px;
  width: 60%;
`;

const FooterLinks = styled.div<{ active: boolean }>`
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
