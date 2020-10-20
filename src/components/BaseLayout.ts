import styled from 'styled-components';

export const BaseLayoutContainer = styled.div`
  display: grid;
  grid-template-rows:
    [header-start] 245px [header-stop content-start] minmax(900px, auto)
    [content-stop footer-start] 200px [footer-stop];
  grid-template-columns: [left-pad-start] 20px [left-pad-stop main-start] auto [main-stop right-pad-start] 20px[right-pad-stop];
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
