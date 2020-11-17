import React from 'react';
import styled from 'styled-components';
import MainImage from '../../img/nordic-illustrasjon-1920x1491.jpg';

//var MainImage = require('../../img/nordic-illustrasjon-1920x1491.jpg');

export const FrontPage: React.FC = () => {
  return (
    <>
      <Layout active={false}>
        <ImageArea active={false}>
          <Image src={MainImage} alt="FrontpageImage" active={false} />
        </ImageArea>
        <TextArea active={false}>
          <Headline active={false}>PureFolio</Headline>
          <HeaderText active={false}>
            Purefolio is a tool that is both practical, simple, accurate, and of
            course great to look at. Purefolio provides unprecedented
            opportunities when it comes to ESG analysis within different
            countries and industries. Proudly we present PureFolio - a tool for
            comparing and analyzing ESG data, powering better investments, for a
            better world.
          </HeaderText>
        </TextArea>
      </Layout>
    </>
  );
};

const Layout = styled.div<{ active: boolean }>`
  margin: 50px 0;
  padding: 0 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TextArea = styled.div<{ active: boolean }>`
  flex-direction: column;
  display: flex;
  width: 50%;
  margin: 0;
  padding: 75px;
`;

const ImageArea = styled.div<{ active: boolean }>`
  width: 50%;
  margin: 0;
  padding: 75px;
`;

const Image = styled.img<{ active: boolean }>`
  width: 100%;
`;

const Headline = styled.h1<{ active: boolean }>`
  width: 100%;
  font-size: 24px;
  font-weight: 900;
`;

const HeaderText = styled.p<{ active: boolean }>`
  width: 100%;
`;
