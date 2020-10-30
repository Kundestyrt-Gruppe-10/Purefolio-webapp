import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import styled from 'styled-components';
export const LoadingComponent: React.FC = () => {
  return (
    <>
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    </>
  );
};

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
