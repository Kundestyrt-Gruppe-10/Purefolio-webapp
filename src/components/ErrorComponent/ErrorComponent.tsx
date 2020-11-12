import React from 'react';
import styled from 'styled-components';
interface ErrorComponentProps {
  error: Error;
}
export const ErrorComponent: React.FC<ErrorComponentProps> = (props) => {
  if (props.error.message === 'OK')
    props.error.message = 'No data exist for this combination';
  return (
    <>
      <ErrorContainer>
        <div>
          <h1>Something went wrong</h1>
        </div>
        <p>{props.error.name}</p>
        <p>{props.error.message}</p>
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
