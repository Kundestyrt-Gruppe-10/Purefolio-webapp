import React, { useState } from 'react';
import styled from 'styled-components';
import { NaceRegionCard } from './NaceRegionCard';
import { NaceRegionContainerInterface } from './types';

export const NaceRegionCardContainer: React.FC<NaceRegionContainerInterface> = (
  props: NaceRegionContainerInterface,
) => {
  const [naceRegionIdList, setNaceRegionIdList] = useState<number[][]>(
    props.naceRegionIdList,
  );
  // const [list /*setList*/] = useState(cardList); // integer state
  // const newList = [...list];

  // Function passes as prop to NaceRegionCard, so that it can update the NaceRegionIdList
  function setNaceRegionId(regionId: number, naceId: number, cardId: number) {
    const naceRegion = [regionId, naceId]; // Set naceID and regionID pair
    const newNaceRegionIdList = naceRegionIdList;
    newNaceRegionIdList[cardId] = naceRegion;
    setNaceRegionIdList(newNaceRegionIdList);
    const newUrlString = naceRegionIdListToString(naceRegionIdList);
    props.setUrlParams(newUrlString, props.esgFactor, props.chosenTab);
  }

  // Convert naceRegionIdList to a string that can be used to set URL params
  function naceRegionIdListToString(naceRegionIdList: number[][]) {
    let naceRegionIdString = '';
    let naceIt, regionIt;
    for (naceIt = 0; naceIt < naceRegionIdList.length; naceIt++) {
      for (
        regionIt = 0;
        regionIt < naceRegionIdList[naceIt].length;
        regionIt++
      ) {
        naceRegionIdString += naceRegionIdList[naceIt][regionIt].toString();
        if (regionIt + 1 != naceRegionIdList[naceIt].length) {
          naceRegionIdString += ',';
        }
      }
      if (naceIt + 1 != naceRegionIdList.length) {
        naceRegionIdString += ';';
      }
    }
    return naceRegionIdString;
  }

  function addCard(regionId: number, naceId: number) {
    const newNaceRegionIdList = naceRegionIdList;
    newNaceRegionIdList.push([regionId, naceId]);
    setNaceRegionIdList(newNaceRegionIdList);
    const newUrlString = naceRegionIdListToString(naceRegionIdList);
    props.setUrlParams(newUrlString, props.esgFactor, props.chosenTab);
  }

  function deleteCard(id: number) {
    let newNaceRegionIdList = naceRegionIdList;
    newNaceRegionIdList = newNaceRegionIdList
      .filter(function (item) {
        return newNaceRegionIdList.indexOf(item) !== id;
      })
      .map((num) => num);
    setNaceRegionIdList(newNaceRegionIdList);
    const newUrlString = naceRegionIdListToString(newNaceRegionIdList);
    props.setUrlParams(newUrlString, props.esgFactor, props.chosenTab);
  }

  //TODO: deleteCard() sets URL correctly, however it does not rerender correctly. Needs fix

  return (
    <Background active={true}>
      {props.naceRegionIdList.map((item, index) => (
        <NaceRegionCard
          addCard={addCard}
          deleteCard={deleteCard}
          key={index}
          id={index}
          regionList={props.regionList}
          naceList={props.naceList}
          naceId={props.naceRegionIdList[index][1]}
          regionId={props.naceRegionIdList[index][0]}
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
  padding: 50px 20px 20px 20px;
  display: flex;
  flex-direction: row;
`;

const AddCardButton = styled.button<{ active: boolean }>`
  background-color: var(--third-bluegrey-color);
  color: var(--sec-purple-color);
  border: none;
  height: 40px;
`;
