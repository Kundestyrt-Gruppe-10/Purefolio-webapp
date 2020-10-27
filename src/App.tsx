import React from 'react';
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
import {
  BaseLayoutContainer,
  ContentContainer,
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
              <Redirect to="/chartpage/1,1/emissionPerYear/1" />
            </Route>
            <Route
              path="/chartpage/:naceRegionIdString/:esgFactorIdString/:chosenTab"
              render={(
                props: RouteComponentProps<{
                  naceRegionIdString: string;
                  esgFactorIdString:
                    | 'emissionPerYear'
                    | 'workAccidentsIncidentRate'
                    | 'genderPayGap'
                    | 'environmentTaxes'
                    | 'fatalAccidentsAtWork'
                    | 'temporaryemployment'
                    | 'employeesPrimaryEducation'
                    | 'employeesSecondaryEducation'
                    | 'employeesTertiaryEducation';
                  chosenTab: string;
                }>,
              ) => (
                <ChartPage
                  naceRegionIdString={props.match.params.naceRegionIdString}
                  esgFactor={props.match.params.esgFactorIdString}
                  chosenTab={props.match.params.chosenTab}
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
        </BaseLayoutContainer>
      </GlobalProvider>
    </Router>
  );
};
