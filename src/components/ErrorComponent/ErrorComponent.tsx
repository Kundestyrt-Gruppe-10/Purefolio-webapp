import React from 'react';
import styled from 'styled-components';
interface ErrorComponentProps {
  error: Error;
  errorHeader?: string;
}
export const ErrorComponent: React.FC<ErrorComponentProps> = ({
  errorHeader = 'Something went wrong',
  error,
}) => {
  if (error.message === 'OK')
    error.message = 'No data exist for this combination';
  return (
    <>
      <ErrorContainer>
        <div>
          <h1>{errorHeader}</h1>
        </div>
        <p>{error.message}</p>
      </ErrorContainer>
    </>
  );
};

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
`;
