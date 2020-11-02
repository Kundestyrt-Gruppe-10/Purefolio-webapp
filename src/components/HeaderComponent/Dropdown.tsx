import React from 'react';
import { Nace, Region } from '../../types';
import styled from 'styled-components';

type Props = {
  naceList: Nace[];
  regionList: Region[];
  findNace(naceRegionString: string): Nace | undefined;
  findRegion(naceRegionString: string): Region | undefined;
  setChosenNaceRegion(naceRegionString: string): void;
  setUserInput(naceRegionString: string): void;
  redirectToPage(naceRegionString: string): void;
  userInput: string;
  chosenNaceRegion: string;
};

export const Dropdown: React.FC<Props> = (props) => {
  const naceRegionStringList = props.naceList
    .map((nace) => nace.naceName)
    .concat(props.regionList.map((region) => region.regionName));

  return (
    <>
      {naceRegionStringList
        .filter((naceRegion) => naceRegion.includes(props.userInput))
        .slice(0, 10)
        .map((naceRegionString: string) => (
          <ResultRow
            key={naceRegionString}
            id={naceRegionString}
            active={naceRegionString === props.chosenNaceRegion ? true : false}
            onClick={() => {
              props.setChosenNaceRegion(naceRegionString);
              props.setUserInput(naceRegionString);
              props.redirectToPage(naceRegionString);
            }}
          >
            <NameBox
              active={
                naceRegionString === props.chosenNaceRegion ? true : false
              }
            >
              {naceRegionString}
            </NameBox>
            <CategoryBox
              active={
                naceRegionString === props.chosenNaceRegion ? true : false
              }
            >
              {props.findNace(naceRegionString) ? (
                <>Nace</>
              ) : props.findRegion(naceRegionString) ? (
                <>Region</>
              ) : (
                <>String</>
              )}
            </CategoryBox>
          </ResultRow>
        ))}
    </>
  );
};

const ResultRow = styled.div<{ active: boolean }>`
  padding: 0 16px;
  display: flex;
  height: 35px;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  min-height: 35px;
  border: none;
  color: ${(props) =>
    props.active ? 'var(--third-blue-color)' : 'var(--main-black-color)'};
  background-color: ${(props) =>
    props.active ? 'rgba(206, 216, 244, 0.7);' : 'var(--main-white-color)'};
  &:hover {
    cursor: pointer;
    background: rgb(240, 240, 240);
  }
`;

const NameBox = styled.div<{ active: boolean }>`
  color: ${(props) =>
    props.active ? 'var(--third-blue-color)' : 'var(--main-black-color)'};
  font-size: 14px;
  font-weight: 500;
  flex-basis: 80%;
  text-align: left;
  align-self: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CategoryBox = styled.div<{ active: boolean }>`
  font-size: 10px;
  color: ${(props) =>
    props.active ? 'var(--third-blue-color)' : 'var(--sec-purple-color)'};
  flex-basis: 20%;
  text-align: right;
  align-self: center;
`;
