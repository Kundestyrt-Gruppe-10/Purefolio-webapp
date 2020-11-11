import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { EuroStatTable, NaceRegion, NaceRegionData } from '../../types';
import { UrlParamsInterface } from '../../pages/ChartPage/ChartPage';
import info_logo from '../../img/info_img.svg';

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
    | 'totalWaste'
    | 'totalHazardousWaste'
    | 'totalNonHazardousWaste'
    | 'environmentalProtectionPollution'
    | 'environmentalProtectionTech'
    | 'seasonalWork'
    | 'supplyEnergyProducts'
    | 'supplyEnergyResiduals'
    | 'useNaturalEnergyInputs'
    | 'useEnergyProducts'
    | 'useEnergyResiduals';
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
  const percentageListList: number[][] = naceRegionData.map((naceRegion, idx) =>
    naceRegion.map((naceRegionDataElement, idy) => {
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
        }
        return 0;
      } else {
        return 1.337;
      }
    }),
  );

  return (
    <OuterContainer>
      <TableContainer>
        <TableTitleContainer>
          <UpperBox>
            {/* TODO: Use real data            */}
            <TitleBox>{esgFactor}</TitleBox>
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
          <TableRow>
            <EuBox>EU avarage over all naces</EuBox>
            {euData.map((euDataYear, idx) => {
              return <EuBox key={idx}>{euDataYear[esgFactor]}</EuBox>;
            })}
          </TableRow>
          {naceRegionData.map((naceRegion, idx) => {
            return (
              <TableRow key={idx}>
                <TableBox>
                  {naceRegion[0].region.regionName +
                    ' - ' +
                    naceRegion[0].nace.naceCode}
                </TableBox>
                {percentageListList[idx]
                  ? percentageListList[idx].map(
                      (percentageValue, i: number) => {
                        return (
                          <TableBox
                            key={percentageValue + i + idx}
                            id={String(percentageValue)}
                            onMouseEnter={() => {
                              setHoverId(percentageValue + i + idx),
                                setHover(true);
                            }}
                            onMouseLeave={() => setHover(false)}
                          >
                            <HoverContainer
                              key2={percentageValue + i + idx}
                              hoverId={hoverId}
                              hover={hover}
                            >
                              Deviation from EU average for given industry, in
                              percent(%).
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
      <TextBox active={false}>
        <InfoTableTitleContainer active={false}>
          <InfoTitleBox active={false}>Percentage Table</InfoTitleBox>
          <UnitOfMeasureBox active={false}>
            {esgFactorInfo.unit}
          </UnitOfMeasureBox>
        </InfoTableTitleContainer>
        <LargeDescriptionBox active={false}>
          <Logo src={info_logo} alt="Info" />
          {esgFactorInfo.description}
        </LargeDescriptionBox>
        <SmallDescriptionBox active={false}>
          <LinkContainer href={esgFactorInfo.href} active={false}>
            {esgFactorInfo.href}
          </LinkContainer>
        </SmallDescriptionBox>
      </TextBox>
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
  &:nth-child(1) {
    font-weight: 700;
  }
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

const TableBox = styled.div`
  display: flex;
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

/*
<TableBox>Sweden</TableBox>
          <TableBox>
            <PositivePercentageNumber positive={true}>
              50%
            </PositivePercentageNumber>
            <NegativePercentageContainer
              positive={true}
              percentageValue={0.5}
            />
            <DelimiterLine />
            <PositivePercentageContainer
              positive={true}
              percentageValue={0.5}
            />
            <NegativePercentageNumber positive={true}>
              50%
            </NegativePercentageNumber>
          </TableBox>
          <TableBox>
            <NegativePercentageContainer
              positive={false}
              percentageValue={-0.4}
            />
            <DelimiterLine />
            <PositivePercentageContainer positive={true} percentageValue={50} />
          </TableBox>
          <TableBox>
            <NegativePercentageContainer
              positive={false}
              percentageValue={-0.4}
            />
            <DelimiterLine />
            <PositivePercentageContainer positive={true} percentageValue={50} />
          </TableBox>
          <TableBox>
            <NegativePercentageContainer
              positive={false}
              percentageValue={-0.4}
            />
            <DelimiterLine />
            <PositivePercentageContainer positive={true} percentageValue={50} />
          </TableBox>
        </TableRow>

        */

//Metadata area:

const TextBox = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  width: 90%;
  justify-content: space-between;
  align-items: start;
  margin-left: 5%;
  margin-right: 0;
  flex-wrap: wrap;
`;

const InfoTableTitleContainer = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  margin-left: 3%;
  margin-right: 15%;
  margin-top: 2%;
`;
const InfoTitleBox = styled.div<{ active: boolean }>`
  font-size: 20px;
  font-weight: 700;
  margin-right: auto;
  text-align: center;
  padding-top: 2px;
  padding-bottom: 2px;
`;

const UnitOfMeasureBox = styled.div<{ active: boolean }>`
  font-size: 14px;
  font-weight: 100;
  text-indent: 4%;
`;

const LargeDescriptionBox = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  font-size: var(--font-size-tiny);
  width: 40%;
  padding: 15px;
  margin-left: auto;
`;

const SmallDescriptionBox = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  width: 36%;
  margin-left: auto;
  font-size: var(--font-size-xtiny);
  color: var(--main-black-color);
`;

const LinkContainer = styled.a<{ active: boolean }>``;

const Logo = styled.img``;
