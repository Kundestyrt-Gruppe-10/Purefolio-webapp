import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
//import { Redirect } from 'react-router-dom';
//import {ChartPage} from '../../pages/ChartPage/ChartPage';
import { Nace, Region } from '../../types';

// Interfaces:
interface NaceRegionCardInterface {
  id: number;
  regionList: Region[];
  naceList: Nace[];
  naceId: number;
  regionId: number;
  setNaceRegionId(naceId: number, regionId: number, cardId: number): void;
  /*
  deleteCard(id: number): void;
  addCard(): void;
  */
}

interface NaceRegionContainerInterface {
  regionList: Region[];
  naceList: Nace[];
  setUrlParams(naceRegionIdList: string, esgFactor: string): void;
  naceRegionIdList: number[][];
}

interface SelectItemInterface {
  label: string;
  value: number;
}

// Components:
export const NaceRegionCard: React.FC<NaceRegionCardInterface> = (
  props: NaceRegionCardInterface,
) => {
  const [regionId, setRegionId] = useState<number>(props.regionId);
  const [naceId, setNaceId] = useState<number>(props.naceId);
  //console.log("Regions: ", props.regionList);
  //console.log("Naces: ", props.naceList);
  const selectRegion: SelectItemInterface[] = props.regionList.map(
    (region: Region) => ({
      label: region.regionName,
      value: region.regionId,
    }),
  );

  const selectNace: SelectItemInterface[] = props.naceList.map(
    (nace: Nace) => ({
      label: nace.naceName,
      value: nace.naceId,
    }),
  );

  /*eslint-disable*/
  const handleChangeRegion = (selectedOption: any) => {
    setRegionId(selectedOption.value-1);  // Convert 1-indexed value to 0-indexed array
    props.setNaceRegionId(naceId, regionId, props.id);
  };

  const handleChangeNace = (selectedOption: any) =>{
    setNaceId(selectedOption.value-1);  // Convert 1-indexed value to 0-indexed array
    props.setNaceRegionId(naceId, regionId, props.id);
  };
  /*eslint-enable*/
  console.log('RegionId: ', regionId);
  console.log('NaceId: ', naceId);

  /*
      velger RegionId = 2
      velger NaceId = 2
      "2,2"
      Dytter opp til NaceRegionCardContainer
      "2,2;3,3"
      setUrlParam("2,2;3;3")
    */
  return (
    <>
      <CardBackground active={true}>
        <CardBar colorId={props.id} />
        <CardTop active={true}>
          <Select
            className="country-select"
            classNamePrefix="react-select"
            active={true}
            options={selectRegion}
            defaultValue={selectRegion[props.regionId]}
            onChange={handleChangeRegion}
          />
          <Button
            danger={false}
            onClick={() => {
              // props.addCard();
            }}
          >
            <i
              className="material-icons"
              style={{ fontSize: 'inherit', fontWeight: 'bold' }}
            >
              add
            </i>
          </Button>
          <Button danger={false}>
            <i
              className="material-icons"
              style={{ fontSize: 'inherit', fontWeight: 'bold' }}
            >
              minimize
            </i>
          </Button>
          <DangerButton
            danger={true}
            onClick={() => {
              // props.deleteCard(props.id);
            }}
          >
            <i
              className="material-icons"
              style={{ fontSize: 'inherit', fontWeight: 'bold' }}
            >
              close
            </i>
          </DangerButton>
        </CardTop>
        <Text active={true}>Industry:</Text>
        <div
          style={{
            border: '2px solid var(--sec-purple-color)',
            marginBottom: '10px',
          }}
        >
          <Select
            width="100%"
            height="5px"
            classNamePrefix="react-select"
            active={true}
            options={selectNace}
            defaultValue={selectNace[props.naceId]}
            onChange={handleChangeNace}
          />
        </div>
        <Text active={true}>Sub-sector:</Text>
        <div style={{ border: '2px solid var(--sec-purple-color)' }}>
          <Select
            width="100%"
            classNamePrefix="react-select"
            active={true}
            options={selectNace}
          />
        </div>
      </CardBackground>
    </>
  );
};

export const NaceRegionCardContainer: React.FC<NaceRegionContainerInterface> = (
  props: NaceRegionContainerInterface,
) => {
  const [naceRegionIdList, setNaceRegionIdList] = useState<number[][]>(
    props.naceRegionIdList,
  );
  // const [list /*setList*/] = useState(cardList); // integer state
  //const newList = [...list];

  // Function passes as prop to NaceRegionCard, so that it can update the NaceRegionIdList
  function setNaceRegionId(regionId: number, naceId: number, cardId: number) {
    const naceRegion = [naceId, regionId];
    const newNaceRegionIdList = naceRegionIdList;
    newNaceRegionIdList[cardId] = naceRegion;
    setNaceRegionIdList(newNaceRegionIdList);
  }

  //TODO: Fix add/remove card functions
  /*
  useEffect(() => {
    setList(newList);
  }, [newList]);
  */
  /*
  const deleteCard = (id: number) => {
    newList = newList
      .filter(function (item) {
        return item !== id;
      })
      .map((num) => num);
    console.log(newList);
    return () => {
      setList(newList);
    }; // update the state to force render
  };

  const addCard = () => {
    console.log('Test');
    let i;
    for (i = 1; i < 6; i++) {
      if (!list.includes(i)) {
        newList.push(i);
        break;
      }
    }
    console.log(newList);
    return () => {
      setList(newList);
    };
  };
  */
  /*
  Prop: setURLParam
  function sendToNaceRegionCard
 */

  return (
    <Background active={true}>
      {props.naceRegionIdList.map((item, index) => (
        <NaceRegionCard
          /*deleteCard={deleteCard}
          addCard={addCard}*/
          key={index}
          id={index}
          regionList={props.regionList}
          naceList={props.naceList}
          naceId={props.naceRegionIdList[index][0]}
          regionId={props.naceRegionIdList[index][1]}
          setNaceRegionId={setNaceRegionId}
        />
      ))}
      <AddCardButton active={true}>
        {' '}
        <i className="material-icons">add</i>
      </AddCardButton>
    </Background>
  );
};

const handleColorType = (colorID: number) => {
  switch (colorID) {
    case 0:
      return 'var( --sec-orange-color)';
    case 1:
      return 'var(--third-turquoise-color)';
    case 2:
      return 'var(--sec-purple-color)';
    case 3:
      return 'var(--third-paleorange-color)';
    case 4:
      return 'var(--thrid-teal-color)';
  }
};

const Background = styled.div<{ active: boolean }>`
  margin: 0;
  background-color: var(--main-white-color);
  padding: 0 100px;
  display: flex;
  flex-direction: row;
`;

const CardBackground = styled.div<{ active: boolean }>`
  width: 200px;
  padding: 0px 20px 20px 20px;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--third-bluegrey-color);
  color: var(--sec-purple-color);
  font-size: var(--font-size-tiny);
`;

const CardBar = styled.div<{ colorId: number }>`
  padding: 5px 70px;
  margin: 0;
  background-color: ${({ colorId }) => handleColorType(colorId)};
`;

const CardTop = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
`;

const Button = styled.button<{ danger: boolean }>`
  &:hover {
    background: var(--sec-purple-color);
    color: var(--third-bluegrey-color);
  }
  width: 16px;
  height: 16px;
  padding: 0;
  font-size: 12px;
  margin: auto;
  border: 1.5px var(--sec-purple-color) solid;
  color: var(--sec-purple-color);
  background-color: var(--third-bluegrey-color);
`;

const DangerButton = styled.button<{ danger: boolean }>`
  &:hover {
    background: #b00020;
    color: var(--third-bluegrey-color);
  }
  width: 16px;
  height: 16px;
  padding: 0;
  font-size: 12px;
  margin: auto;
  border: 1.5px #b00020 solid;
  color: #b00020;
  background-color: var(--third-bluegrey-color);
`;

const Text = styled.div<{ active: boolean }>`
  font-size: var(--font-size-xtiny);
  font-weight: 600;
`;

const AddCardButton = styled.button<{ active: boolean }>`
  background-color: var(--third-bluegrey-color);
  color: var(--sec-purple-color);
  border: none;
  height: 40px;
`;
