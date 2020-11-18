import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { EuroStatTable, NaceRegion, NaceRegionData } from '../../types';
import { UrlParamsInterface } from '../../pages/ChartPage/ChartPage';
import info_logo from '../../img/info_img.svg';
import { handleColorType } from '../../pages/ChartPage/helper-functions';

interface Props {
  naceRegionData: NaceRegionData[][];
  naceRegionList: NaceRegion[];
  esgFactorInfo: EuroStatTable;
  euDataForAllChosenNaces: NaceRegionData[][];
  euData: NaceRegionData[];
  urlParams: UrlParamsInterface;
  esgFactor:
    | 'emissionPerYear'
    | 'workAccidentsIncidentRate'
    | 'genderPayGap'
    | 'environmentTaxes'
    | 'fatalAccidentsAtWork'
    | 'temporaryemployment'
    | 'employeesPrimaryEducation'
    | 'employeesSecondaryEducation'
    | 'employeesTertiaryEducation'
    | 'employeesLowWage'
    | 'hoursPaidAndNot'
    | 'hoursWorkWeek'
    | 'jobVacancyRate'
    | 'trainingParticipation'
    | 'co2';
}

export const PercentageTableComponent: React.FC<Props> = ({
  naceRegionData,
  naceRegionList,
  euData,
  esgFactor,
  esgFactorInfo,
  euDataForAllChosenNaces,
  urlParams,
}) => {
  const [hover, setHover] = useState<boolean>(false);
  const [hoverId, setHoverId] = useState<number>(0);
  const shouldShowRawData = () =>
    euDataForAllChosenNaces[0][0][esgFactor] == undefined &&
    esgFactorInfo.unit === 'Percentage'
      ? true
      : false;
  // If unit is in percentage, and we lack EU data its better to show raw data rather than nothing
  const [showRawData, setShowRawData] = useState<boolean>(shouldShowRawData());
  useEffect(() => {
    setShowRawData(shouldShowRawData());
  }, [esgFactor, urlParams]);

  // Number matrix used to make unique keys for hover box.
  const numberMatrix: number[][] = [
    Array.from(Array(15).keys()),
    Array.from(Array.from({ length: 15 }, (_, i) => i + 15)),
    Array.from(Array.from({ length: 15 }, (_, i) => i + 30)),
    Array.from(Array.from({ length: 15 }, (_, i) => i + 45)),
    Array.from(Array.from({ length: 15 }, (_, i) => i + 60)),
    Array.from(Array.from({ length: 15 }, (_, i) => i + 75)),
    Array.from(Array.from({ length: 15 }, (_, i) => i + 90)),
    Array.from(Array.from({ length: 15 }, (_, i) => i + 105)),
    Array.from(Array.from({ length: 15 }, (_, i) => i + 120)),
    Array.from(Array.from({ length: 15 }, (_, i) => i + 135)),
    Array.from(Array.from({ length: 15 }, (_, i) => i + 150)),
  ];
  const percentageListList: number[][] = naceRegionData.map((naceRegion, idx) =>
    naceRegion.map((naceRegionDataElement, idy): number => {
      if (euDataForAllChosenNaces[idx][idy]) {
        if (
          naceRegionDataElement[esgFactor] &&
          euDataForAllChosenNaces[idx][idy][esgFactor]
        ) {
          return (
            1 -
            (euDataForAllChosenNaces[idx][idy][esgFactor] || 1) /
              (naceRegionDataElement[esgFactor] || 1)
          );
        } else if (
          naceRegionDataElement[esgFactor] &&
          !euDataForAllChosenNaces[idx][idy][esgFactor] && // No EU data for given esgFactor
          esgFactorInfo.unit === 'Percentage'
        ) {
          return (naceRegionDataElement[esgFactor] || 0) / 100;
        }
        return 0;
      } else {
        return 0;
      }
    }),
  );

  return (
    <OuterContainer>
      <TableContainer>
        <TableTitleContainer>
          <UpperBox>
            {/* TODO: Use real data            */}
            <TitleBox>{esgFactorInfo.datasetName}</TitleBox>
            <PeriodBox>
              Period: {urlParams.yearStart}-{urlParams.yearEnd}
            </PeriodBox>
          </UpperBox>
          <LowerBox>
            {/* TODO: Iterate over a year object instead?? */}
            <YearBox>Year</YearBox>
            {naceRegionData && naceRegionData[0]
              ? naceRegionData[0].map((year, idx) => {
                  return <YearBox key={idx}>{year.year}</YearBox>;
                })
              : null}
          </LowerBox>
        </TableTitleContainer>
        <TableDataContainer>
          {naceRegionData.map((naceRegion, idx) => {
            return (
              <TableRow key={idx}>
                <TableBox>
                  <ColorBox id="colorBox" colorId={idx} />
                  {naceRegion[0].region.regionName +
                    ' - ' +
                    naceRegion[0].nace.naceCode}
                </TableBox>
                {percentageListList[idx]
                  ? percentageListList[idx].map(
                      (percentageValue, i: number) => {
                        return (
                          <TableBox
                            key={numberMatrix[idx][i]}
                            id={String(percentageValue)}
                            onMouseEnter={() => {
                              setHoverId(numberMatrix[idx][i]), setHover(true);
                            }}
                            onMouseLeave={() => setHover(false)}
                          >
                            <HoverContainer
                              key2={numberMatrix[idx][i]}
                              hoverId={hoverId}
                              hover={hover}
                            >
                              {showRawData === false ? (
                                <p>
                                  {naceRegion[0].region.regionName}&apos;s
                                  deviation from EU, within &nbsp;
                                  {naceRegion[0].nace.naceName}.
                                </p>
                              ) : (
                                <p>Percentage</p>
                              )}
                            </HoverContainer>
                            <PositivePercentageNumber
                              positive={percentageValue > 0 ? true : false}
                            >
                              {percentageValue === 0
                                ? 'No Data'
                                : String(Math.floor(percentageValue * 100)) +
                                  '%'}
                            </PositivePercentageNumber>
                            <NegativePercentageContainer
                              positive={percentageValue > 0 ? true : false}
                              percentageValue={percentageValue}
                            />
                            <DelimiterLine />
                            <PositivePercentageContainer
                              positive={percentageValue > 0 ? true : false}
                              percentageValue={percentageValue}
                            />
                            <NegativePercentageNumber
                              positive={percentageValue > 0 ? true : false}
                            >
                              {percentageValue === 0
                                ? 'No Data'
                                : String(Math.ceil(percentageValue * 100)) +
                                  '%'}
                            </NegativePercentageNumber>
                          </TableBox>
                        );
                      },
                    )
                  : null}
              </TableRow>
            );
          })}
        </TableDataContainer>
      </TableContainer>
      <BottomContainer active={false}>
        <InfoTableTitleContainer active={false}>
          <InfoTitleBox active={false}>Percentage table</InfoTitleBox>
          <UnitOfMeasureBox active={false}>
            Deviation from EU average for given industry
          </UnitOfMeasureBox>
        </InfoTableTitleContainer>
        <InfoBox active={false}>
          <Logo src={info_logo} alt="Info" />
          <DescriptionBox active={false}>
            <p>
              <span
                style={{ color: 'var(--sec-purple-color)', fontWeight: 'bold' }}
              >
                Information:{' '}
              </span>
              {esgFactorInfo.description}
            </p>
            <p>
              For more information on this data, see the following link: <br />
              <LinkContainer href={esgFactorInfo.href} active={false}>
                {esgFactorInfo.href}
              </LinkContainer>
            </p>
          </DescriptionBox>
        </InfoBox>
      </BottomContainer>
    </OuterContainer>
  );
};
const OuterContainer = styled.div`
  margin: auto;
  margin: 45px 0 30px 0;
  width: 90%;
`;

const TableContainer = styled.div`
  background-color: var(--third-bluegrey-color);
  width: 100%;
  margin: auto;
  position: relative;
  border-radius: 5px;
  padding-top: 20px;
  z-index: 1;
`;
const TableTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--sec-purple-color);
  width: 95%;
  height: 96px;
  left: 2.5%;
  top: -44px;
  position: absolute;
  border-radius: 5px;
  color: #f7f8f6;
`;

const UpperBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 2.5%;
  margin-right: 2.5%;
  font-size: 20px;
  border-bottom: 0.6px solid #ced8f4;
  font-weight: 700;
  height: 50%;
`;

const LowerBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 2.5%;
  margin-right: 2.5%;
  height: 50%;
`;

const TitleBox = styled.div`
  margin-right: auto;
  text-align: center;
`;

const PeriodBox = styled.div``;

const YearBox = styled.div`
  width: 260px;
  text-align: center;
  &:nth-child(1) {
    text-align: left;
  }
`;

const TableDataContainer = styled.div`
  position: relative;
  padding: 32px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: -1;
  width: 90%;
  margin: auto;
  font-weight: 400;
`;

const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 2px dotted #abbdd7;
  height: 40px;
  font-size: 14px;
  &:nth-last-child(1) {
    border: none;
  }
`;

const EuBox = styled.div`
  text-align: center;
  align-self: center;
  width: 260px;
  &:nth-child(1) {
    text-align: left;
  }
`;
const ColorBox = styled.div<{ colorId: number }>`
  height: 11px;
  width: 8px;
  margin-top: 0px;
  margin-right: 2px;
  border-radius: 4px;
  background-color: ${({ colorId }) => handleColorType(colorId)};
`;

const TableBox = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-self: center;
  align-items: center;
  width: 260px;
  &:nth-child(1) {
    text-align: left;
  }
`;

const DelimiterLine = styled.div`
  flex-basis: 1%;
  background-color: var(--main-black-color);
  height: 25px;
`;

const NegativePercentageContainer = styled.div<{
  positive: boolean;
  percentageValue: number;
}>`
  flex-basis: ${(props) =>
    Math.abs(props.percentageValue) < 1.0
      ? String(Math.abs(props.percentageValue) * 49.5) + '%'
      : '49.5%'};
  height: 15px;
  background-color: var(--sec-orange-color);
  border-radius: 2px 0px 0px 2px;
  display: ${(props) => (props.positive ? 'none' : 'block')};
  margin-left: auto;
`;

const PositivePercentageContainer = styled.div<{
  positive: boolean;
  percentageValue: number;
}>`
  flex-basis: ${(props) =>
    Math.abs(props.percentageValue) < 1.0
      ? String(Math.abs(props.percentageValue) * 49.5) + '%'
      : '49.5%'};
  height: 15px;
  background-color: var(--sec-orange-color);
  border-radius: 0px 2px 2px 0px;
  display: ${(props) => (props.positive ? 'block' : 'none')};
  margin-right: auto;
`;

const PositivePercentageNumber = styled.div<{ positive: boolean }>`
  flex-basis: 46.5%;
  height: 15px;
  display: ${(props) => (props.positive ? 'block' : 'none')};
  text-align: right;
  padding: 0 3% 0 0;
`;

const NegativePercentageNumber = styled.div<{ positive: boolean }>`
  flex-basis: 46.5%;
  height: 15px;
  display: ${(props) => (props.positive ? 'none' : 'block')};
  text-align: left;
  padding: 0 0 0 3%;
`;

const HoverContainer = styled.div<{
  key2: number;
  hoverId: number;
  hover: boolean;
}>`
  background-color: var(--main-white-color);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: absolute;
  width: 110px;
  transform: translate(34px, 66px);
  padding: 5px;
  border-radius: 2px;
  font-weight: 400;
  visibility: ${(props) =>
    props.hover && props.hoverId == props.key2 ? 'visible' : 'hidden'};
`;

const InfoTableTitleContainer = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  margin-top: 20px;
`;

const InfoTitleBox = styled.div<{ active: boolean }>`
  font-size: 20px;
  font-weight: 700;
  padding-top: 2px;
  padding-bottom: 2px;
`;

const UnitOfMeasureBox = styled.div<{ active: boolean }>`
  font-size: 14px;
  font-weight: 100;
  width: 205px;
  margin-left: 20px;
`;
const LinkContainer = styled.a<{ active: boolean }>``;

const Logo = styled.img``;

const BottomContainer = styled.div<{ active: boolean }>`
  width: 100%;
  margin: 10px auto 0 auto;
  display: flex;
  justify-content: space-between;
`;

const DescriptionBox = styled.div<{ active: boolean }>`
  font-size: var(--font-size-tiny);
  width: 450px;
  color: var(--main-black-color);
`;

const InfoBox = styled.div<{ active: boolean }>`
  display: flex;
  align-self: center;
`;
