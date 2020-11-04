import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NaceRegionCard } from './NaceRegionCard';
import { NaceRegionContainerInterface } from './types';
import { naceRegionIdListToString } from '../../pages/ChartPage/helper-functions';
import { naceRegionIdStringToList } from '../../pages/ChartPage/helper-functions';
import { Link } from 'react-router-dom';

export const NaceRegionCardContainer: React.FC<NaceRegionContainerInterface> = (
  props: NaceRegionContainerInterface,
) => {
  const [naceRegionIdList, setNaceRegionIdList] = useState<number[][]>(
    naceRegionIdStringToList(props.urlParams.naceRegionIdString),
  );

  // Function passes as prop to NaceRegionCard, so that it can update the NaceRegionIdList
  function setNaceRegionId(regionId: number, naceId: number, cardId: number) {
    const naceRegion = [regionId, naceId]; // Set naceID and regionID pair
    const newNaceRegionIdList = naceRegionIdList;
    newNaceRegionIdList[cardId] = naceRegion;
    setNaceRegionIdList(newNaceRegionIdList);
    const newUrlString = naceRegionIdListToString(naceRegionIdList);
    props.urlParams.setUrlParams(
      newUrlString,
      props.urlParams.esgFactor,
      props.urlParams.yearStart,
      props.urlParams.yearEnd,
      props.urlParams.chosenTab,
    );
  }

  function addCard(regionId: number, naceId: number) {
    const newNaceRegionIdList = naceRegionIdList;
    newNaceRegionIdList.push([regionId, naceId]);
    setNaceRegionIdList(newNaceRegionIdList);
    const newUrlString = naceRegionIdListToString(naceRegionIdList);
    props.urlParams.setUrlParams(
      newUrlString,
      props.urlParams.esgFactor,
      props.urlParams.yearStart,
      props.urlParams.yearEnd,
      props.urlParams.chosenTab,
    );
  }

  function deleteCard(id: number) {
    let newNaceRegionIdList = naceRegionIdList;
    newNaceRegionIdList = newNaceRegionIdList
      .filter(function (item) {
        return newNaceRegionIdList.indexOf(item) !== id;
      })
      .map((num) => num);
    // setNaceRegionIdList(newNaceRegionIdList);
    setNaceRegionIdList(
      naceRegionIdStringToList(props.urlParams.naceRegionIdString),
    );
    const newUrlString = naceRegionIdListToString(newNaceRegionIdList);
    props.urlParams.setUrlParams(
      newUrlString,
      props.urlParams.esgFactor,
      props.urlParams.yearStart,
      props.urlParams.yearEnd,
      props.urlParams.chosenTab,
    );
  }
  useEffect(() => {
    setNaceRegionIdList(
      naceRegionIdStringToList(props.urlParams.naceRegionIdString),
    );
  }, [props.urlParams.naceRegionIdString]);

  return (
    <>
      <Container>
        <Background active={true}>
          {naceRegionIdList.map((item, index) => (
            <NaceRegionCard
              addCard={addCard}
              deleteCard={deleteCard}
              key={index}
              id={index}
              esgFactorInfo={props.esgFactorInfo}
              regionList={props.regionList}
              naceList={props.naceList}
              naceId={naceRegionIdList[index][1]}
              regionId={naceRegionIdList[index][0]}
              setNaceRegionId={setNaceRegionId}
            />
          ))}
          <AddCardButton
            active={true}
            onClick={() => {
              addCard(1, 1);
            }}
          >
            {' '}
            <i className="material-icons">add</i>
          </AddCardButton>
        </Background>
        <PresetContainer>
          <h3>Presets:</h3>
          <Link
            to="/chartpage/25,1;25,5;25,11/emissionPerYear/2015/2017/1"
            style={{
              textDecoration: 'none',
              backgroundColor: 'var(--third-bluegrey-color)',
              width: '10%',
              margin: '3px',
            }}
          >
            Norway: Emission
          </Link>
          <Link
            to="/chartpage/2,1;1,1;13,1;7,1/fatalAccidentsAtWork/2015/2018/1"
            style={{
              textDecoration: 'none',
              backgroundColor: 'var(--third-bluegrey-color)',
              width: '10%',
              margin: '3px',
            }}
          >
            EU: Agriculture
          </Link>
        </PresetContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 50px;
`;
const PresetContainer = styled.div`
  display: flex;
  grid-column-start: 1;
  flex-direction: column;
  justify-content: center;
  color: var(--sec-purple-color);
  font-size: var(--font-size-tiny);
  padding-left: 30px;
`;

const Background = styled.div<{ active: boolean }>`
  grid-column-start: 1;
  grid-column-end: 2;
  margin: 0;
  background-color: var(--main-white-color);
  padding: 20px 20px 5px 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const AddCardButton = styled.button<{ active: boolean }>`
  background-color: var(--third-bluegrey-color);
  color: var(--sec-purple-color);
  border: none;
  height: 40px;
`;
