import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { Redirect } from 'react-router-dom';

const cardList = [1, 2, 3, 4];

const data = [
  { regionId: 1, value: 'Norway', label: 'Norway' },
  { regionId: 2, value: 'Sweden', label: 'Sweden' },
  { regionId: 3, value: 'Denmark', label: 'Denmark' },
  { regionId: 4, value: 'Finland', label: 'Finland' },
  { regionId: 5, value: 'United Kingdom', label: 'United Kingdom' },
  { regionId: 6, value: 'Germany', label: 'Germany' },
  { regionId: 7, value: 'France', label: 'France' },
  { regionId: 8, value: 'Spain', label: 'Spain' },
  { regionId: 9, value: 'Italy', label: 'Italy' },
  { regionId: 10, value: 'Switzerland', label: 'Switzerland' },
];

interface NaceRegionCardInterface {
  id: number;
  deleteCard(id: number): void;
  addCard(): void;
}

export const NaceRegionCard: React.FC<NaceRegionCardInterface> = (
  props: NaceRegionCardInterface,
) => {
  return (
    <>
      <CardBackground active={true}>
        <CardBar colorId={props.id} />
        <CardTop active={true}>
          <Select
            className="country-select"
            classNamePrefix="react-select"
            active={true}
            options={data}
          />
          <Button
            danger={false}
            onClick={() => {
              props.addCard();
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
            options={data}
          />
        </div>
        <Text active={true}>Sub-sector:</Text>
        <div style={{ border: '2px solid var(--sec-purple-color)' }}>
          <Select
            width="100%"
            classNamePrefix="react-select"
            active={true}
            options={data}
          />
        </div>
      </CardBackground>
    </>
  );
};

export const NaceRegionCardContainer: React.FC = () => {
  const [list, setList] = useState(cardList); // integer state
  let newList = [...list];

  useEffect(() => {
    setList(newList);
  }, [newList]);

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

  return (
    <Background active={true}>
      {list.map((item) => (
        <NaceRegionCard
          deleteCard={deleteCard}
          addCard={addCard}
          key={item}
          id={item}
        />
      ))}
    </Background>
  );
};

const handleColorType = (colorID: number) => {
  switch (colorID) {
    case 1:
      return 'var( --sec-orange-color)';
    case 2:
      return 'var(--third-turquoise-color)';
    case 3:
      return 'var(--sec-purple-color)';
    case 4:
      return 'var(--third-paleorange-color)';
    case 5:
      return 'var(--thrid-teal-color)';
  }
};

const Background = styled.div<{ active: boolean }>`
  margin: 0;
  background-color: var(--main-white-color);
  padding: 100px;
  display: flex;
  flex-direction: row;
`;

const CardBackground = styled.div<{ active: boolean }>`
  width: 200px;
  padding: 0px 20px 20px 20px;
  margin: 10px;
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

const DropDownOptions = styled.option<{ active: boolean }>`
  color: var(--sec-purple-color);
  text-align-last: left;
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
