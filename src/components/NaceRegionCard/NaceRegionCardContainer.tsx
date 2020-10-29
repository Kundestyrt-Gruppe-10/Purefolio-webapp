import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NaceRegionCard } from './NaceRegionCard';
import { NaceRegionContainerInterface } from './types';
import { naceRegionIdListToString } from '../../pages/ChartPage/helper-functions';
import { naceRegionIdStringToList } from '../../pages/ChartPage/helper-functions';

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
      props.urlParams.chosenTab,
    );
  }
  useEffect(() => {
    setNaceRegionIdList(
      naceRegionIdStringToList(props.urlParams.naceRegionIdString),
    );
  }, [props.urlParams.naceRegionIdString]);

  //TODO: deleteCard() sets URL correctly, however it does not rerender correctly. Needs fix

  return (
    <Background active={true}>
      {naceRegionIdList.map((item, index) => (
        <NaceRegionCard
          addCard={addCard}
          deleteCard={deleteCard}
          key={index}
          id={index}
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
  );
};

const Background = styled.div<{ active: boolean }>`
  margin: 0;
  background-color: var(--main-white-color);
  padding: 20px 20px 5px 20px;
  display: flex;
  flex-direction: row;
`;

const AddCardButton = styled.button<{ active: boolean }>`
  background-color: var(--third-bluegrey-color);
  color: var(--sec-purple-color);
  border: none;
  height: 40px;
`;
