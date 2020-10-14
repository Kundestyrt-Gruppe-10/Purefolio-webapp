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
            1. Første tab ESG Risk RatingProin condimentum accumsan velit, sed
            fermentum sapien mollis non. Donec id lorem eu ipsum dignissim
            maximus vitae non lorem. Nam dictum odio ut dui scelerisque, eu
            mattis felis egestas. Ut aliquam nisl id pharetra pellentesque. Nam
            ac auctor ipsum, dapibus gravida quam. Nam id ultricies arcu. Donec
            aliquet malesuada volutpat.
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