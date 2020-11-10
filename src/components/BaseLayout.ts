import styled from 'styled-components';

export const BaseLayoutContainer = styled.div`
  /*
  #TODO 'Is this needed? Does nothing but making redundant space'
  display: grid;
  grid-template-rows:
    [header-start] 150px [header-chartpage-stop content-chartpage-start] 250px [header-stop content-start] minmax(
      200px,
      auto
    )
    [content-stop ];
  grid-template-columns: [left-pad-start] 20px [left-pad-stop main-start] auto [main-stop right-pad-start] 20px[right-pad-stop];
  */
`;

export const HeaderContainer = styled.div`
  grid-column-start: left-pad-start;
  grid-column-end: right-pad-stop;
  grid-row-start: header-start;
  grid-row-end: header-stop;
`;

export const ContentContainer = styled.div`
  grid-column-start: left-pad-stop;
  grid-column-end: right-pad-start;
  grid-row-start: content-start;
  grid-row-end: content-stop;
`;

export const FooterContainer = styled.div`
  grid-column-start: left-pad-start;
  grid-column-end: right-pad-stop;
  grid-row-start: span 4;
`;
