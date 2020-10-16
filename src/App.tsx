import React from 'react';
import { FooterComponent } from './components/FooterComponent/FooterComponent';
import { HeaderComponent } from './components/HeaderComponent/HeaderComponent';
import { FrontPage } from './pages/FrontPage/FrontPage';
import { SearchResultsPage } from './pages/SearchResultsPage/SearchResultsPage';
import './index.css';
import { GlobalProvider } from './pages/GlobalProvider/GlobalProvider';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom';
import { ChartPage } from './pages/ChartPage/ChartPage';
import { NotFoundPage } from './pages/NotFoundPage/NoutFoundPage';
import { OverviewTableComponent } from './components/OverviewTableComponent/OverviewTable';
import {
  BaseLayoutContainer,
  ContentContainer,
  FooterContainer,
  HeaderContainer,
} from './components/BaseLayout';

export const App: React.FC = () => {
  return (
    <Router>
      <GlobalProvider>
        <BaseLayoutContainer>
          <Switch>
            <Route exact path="/chartpage">
              {/* TODO: redirect to different default page? Redirect in component instead?*/}
              <Redirect to="/chartpage/1,1/1" />
            </Route>
            <Route
              path="/chartpage/:naceRegionIdString/:esgFactorIdString"
              render={(
                props: RouteComponentProps<{
                  naceRegionIdString: string;
                  esgFactorIdString: string;
                }>,
              ) => (
                <ChartPage
                  naceRegionIdString={props.match.params.naceRegionIdString}
                  esgFactorIdString={props.match.params.esgFactorIdString}
                />
              )}
            />
            <Route path="/results/">
              <HeaderContainer>
                <HeaderComponent />
              </HeaderContainer>
              <ContentContainer>
                <SearchResultsPage />
              </ContentContainer>
            </Route>
            <Route exact path="/">
              <HeaderContainer>
                <HeaderComponent />
              </HeaderContainer>
              <ContentContainer>
                <FrontPage />
              </ContentContainer>
            </Route>
            <Route path="/overviewtable">
              <OverviewTableComponent />
            </Route>
            <Route path="/404">
              <HeaderContainer>
                <HeaderComponent />
              </HeaderContainer>
              <ContentContainer>
                <NotFoundPage />
              </ContentContainer>
            </Route>
            <Redirect to="/404" />
          </Switch>
          <FooterContainer>
            <FooterComponent />
          </FooterContainer>
        </BaseLayoutContainer>
      </GlobalProvider>
    </Router>
  );
};
