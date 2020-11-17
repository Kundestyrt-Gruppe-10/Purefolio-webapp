import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { Nace, NaceHasData, Region, RegionHasData } from '../../types';
import { NaceRegionCardInterface } from './types';
import { ApiGet } from '../../utils/api';
import { handleColorType } from '../../pages/ChartPage/helper-functions';

interface SelectItem {
  label: string;
  value: number;
  isDisabled: boolean;
}
export const NaceRegionCard: React.FC<NaceRegionCardInterface> = (
  props: NaceRegionCardInterface,
) => {
  const [regionId, setRegionId] = useState<number>(props.regionId);
  const [naceId, setNaceId] = useState<number>(props.naceId);
  const [selectRegion, setSelectRegion] = useState<SelectItem[]>(
    props.regionList.map((region: Region) => ({
      label: region.regionName,
      value: region.regionId,
      isDisabled: false,
    })),
  );
  const [selectNace, setSelectNace] = useState<SelectItem[]>(
    props.naceList.map((nace: Nace) => ({
      label: nace.naceName,
      value: nace.naceId,
      isDisabled: false,
    })),
  );

  // TODO: Use custom CSS style instead of 'No Data' text?
  const filterRegionOptions = () => {
    // TODO: Pass down esgFactor object insted of hard coding esgFactor 1
    ApiGet<RegionHasData[]>(
      `/regions/hasdata/${naceId}/${props.esgFactorInfo.tableId}`,
    )
      .then((res) =>
        setSelectRegion(
          res.map((region) => {
            return {
              label: `${region.regionName} ${
                !region.hasData ? '(No Data)' : ''
              }`,
              value: region.regionId,
              isDisabled: false, // TODO: Remove?
            };
          }),
        ),
      )
      .catch((err) => console.log(err));
  };
  // TODO: Use custom CSS style instead of isDisabled prop
  const filterNaceOptions = () => {
    // TODO: Pass down esgFactor object insted of hard coding esgFactor 1
    ApiGet<NaceHasData[]>(
      `/naces/hasdata/${regionId}/${props.esgFactorInfo.tableId}`,
    )
      .then((res) =>
        setSelectNace(
          res.map((nace) => {
            return {
              label: `${nace.naceName} ${!nace.hasData ? '(No Data)' : ''}`,
              value: nace.naceId,
              isDisabled: false, // TODO: Remove? Not used
            };
          }),
        ),
      )
      .catch((err) => console.log(err));
  };
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
  useEffect(() => {
    setRegionId(props.regionId);
    setNaceId(props.naceId);
  }, [props.naceId, props.regionId]);

  return (
    <>
      <CardBackground active={true}>
        <CardBar colorId={props.id} />
        <CardTop active={true}>
          <Select
            data-test="RegionSelect"
            className="country-select"
            classNamePrefix="react-select"
            onMenuOpen={filterRegionOptions}
            active={true}
            value={selectRegion[regionId - 1]}
            options={selectRegion}
            defaultValue={selectRegion[regionId - 1]}
            onChange={handleChangeRegion}
          />
          <ButtonContainer active={false}>
            <Button
              danger={false}
              className="add-nacecard-button"
              onClick={() => {
                props.addCard(regionId, naceId);
              }}
            >
              <i
                className="material-icons"
                style={{ fontSize: 'inherit', fontWeight: 'bold' }}
              >
                add
              </i>
            </Button>
            {/*
          <Button danger={false}>
            <i
              className="material-icons"
              style={{ fontSize: 'inherit', fontWeight: 'bold' }}
            >
              minimize
            </i>
          </Button>
          */}
            <DangerButton
              danger={true}
              className="deleteNaceCard"
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
          </ButtonContainer>
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
            className="NaceSelect"
            classNamePrefix="react-select"
            active={true}
            onMenuOpen={filterNaceOptions}
            value={selectNace[naceId - 1]}
            options={selectNace}
            defaultValue={selectNace[naceId - 1]}
            onChange={handleChangeNace}
          />
        </div>
      </CardBackground>
    </>
  );
};

const CardBackground = styled.div<{ active: boolean }>`
  z-index: 2;
  width: 200px;
  padding: 0px 20px 20px 20px;
  margin: 0 10px 12px 10px;
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
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ButtonContainer = styled.div<{ active: boolean }>`
  width: 40px;
  display: flex;
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
