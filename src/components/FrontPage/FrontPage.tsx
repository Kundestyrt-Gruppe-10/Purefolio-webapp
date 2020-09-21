import React from 'react';
import styled from 'styled-components';

//var MainImage = require('../../img/nordic-illustrasjon-1920x1491.jpg');

export const FrontPage: React.FC = () => {
  return (
    <>
      <Layout active={false}>
        <ImageArea active={false}>
          {/*<Image src={MainImage} active={false}/>*/}
        </ImageArea>
        <TextArea active={false}>
          <Headline active={false}>PureFolio</Headline>
          <HeaderText active={false}>
            PureFolio is a ESG rating system for bond loans.
          </HeaderText>
        </TextArea>
      </Layout>
    </>
  );
};

const Layout = styled.div<{ active: boolean }>`
  margin: 0;
  padding: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TextArea = styled.div<{ active: boolean }>`
  flex-direction: column;
  display: flex;
  width: 50%;
  margin: 0;
`;

const ImageArea = styled.div<{ active: boolean }>`
  width: 50%;
  margin: 0;
`;

const Image = styled.img<{ active: boolean }>`
  width: 100%;
`;

const Headline = styled.h1<{ active: boolean }>`
  width: 60%;
  font-size: 24px;
  font-weight: 900;
`;

const HeaderText = styled.p<{ active: boolean }>`
  width: 40%;
`;
