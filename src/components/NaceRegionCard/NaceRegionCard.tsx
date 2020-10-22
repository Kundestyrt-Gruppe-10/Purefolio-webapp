import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
//import { Redirect } from 'react-router-dom';
//import {ChartPage} from '../../pages/ChartPage/ChartPage';
import { Nace, Region } from '../../types';
import { NaceRegionCardInterface, SelectItemInterface } from './types';

export const NaceRegionCard: React.FC<NaceRegionCardInterface> = (
  props: NaceRegionCardInterface,
) => {
  const [regionId, setRegionId] = useState<number>(props.regionId);
  const [naceId, setNaceId] = useState<number>(props.naceId);
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

  //TODO: Fix eslint type
  /*eslint-disable*/
  const handleChangeRegion = (selectedOption: any) => {
    const newRegionId = selectedOption.value; // Convert 1-indexed value to 0-indexed array
    setRegionId(newRegionId);
    props.setNaceRegionId(newRegionId, naceId, props.id);
  };

  const handleChangeNace = (selectedOption: any) => {
    const newNaceId = selectedOption.value; // Convert 1-indexed value to 0-indexed array
    setNaceId(newNaceId);
    props.setNaceRegionId(regionId, newNaceId, props.id);
  };
  /*eslint-enable*/

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
            defaultValue={selectRegion[props.regionId - 1]}
            onChange={handleChangeRegion}
          />
          <Button
            danger={false}
            onClick={() => {
              props.addCard(props.naceId, props.regionId);
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
              props.deleteCard(props.id);
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
            defaultValue={selectNace[props.naceId - 1]}
            onChange={handleChangeNace}
          />
        </div>
        {/*
        <Text active={true}>Sub-sector:</Text>
        <div style={{ border: '2px solid var(--sec-purple-color)' }}>
          <Select
            width="100%"
            classNamePrefix="react-select"
            active={true}
            options={selectNace}
          />
        </div>
        */}
      </CardBackground>
    </>
  );
};

// TODO: Used other places, should be moved to an util file
export const handleColorType = (colorID: number): string => {
  colorID = colorID % 5;
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
    default:
      return 'var( --sec-orange-color)';
  }
};

const CardBackground = styled.div<{ active: boolean }>`
  z-index: 2;
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
