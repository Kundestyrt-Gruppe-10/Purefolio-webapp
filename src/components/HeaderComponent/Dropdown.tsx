import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

type Props = {
  results: {
    id: number;
    name: string;
    label: string;
  }[];
  setUserInput(input: string): void;
};

export const Dropdown: React.FC<Props> = (props) => {
  const history = useHistory();
  function handleClick(id: number, label: string) {
    props.setUserInput('');
    let path = '';
    if (label === 'region') {
      path = `/chartpage/${id.toString()},1/emissionPerYear/2015/2018/1`;
    } else {
      path = `/chartpage/1,${id.toString()}/emissionPerYear/2015/2018/1`;
    }
    history.push(path);
  }

  return (
    <>
      {props.results.slice(0, 8).map((result) => (
        <ResultRow
          key={result.id.toString() + ' ' + result.label}
          onClick={() => handleClick(result.id, result.label)}
          active={false}
        >
          <NameBox active={false}>{result.name}</NameBox>
          <CategoryBox active={false}>
            {
              result.label.replace(/^\w/, (c) =>
                c.toUpperCase(),
              ) /* Convert the first letter of the string to uppercase */
            }
          </CategoryBox>
        </ResultRow>
      ))}
    </>
  );
};

const ResultRow = styled.div<{ active: boolean }>`
  padding: 10px 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  color: ${(props) =>
    props.active ? 'var(--third-blue-color)' : 'var(--main-black-color)'};
  background-color: ${(props) =>
    props.active ? 'rgba(206, 216, 244, 0.7)' : 'var(--main-white-color)'};
  &:hover {
    cursor: pointer;
    background: rgba(206, 216, 244, 0.7);
  }
`;

const NameBox = styled.div<{ active: boolean }>`
  color: ${(props) =>
    props.active ? 'var(--third-blue-color)' : 'var(--main-black-color)'};
  font-size: 14px;
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CategoryBox = styled.div<{ active: boolean }>`
  font-size: 10px;
  color: ${(props) =>
    props.active ? 'var(--third-blue-color)' : 'var(--sec-purple-color)'};
`;
