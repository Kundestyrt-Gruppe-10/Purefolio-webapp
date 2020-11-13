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
            <Route
              exact
              path="/chartpage/:naceRegionIdString/:esgFactorIdString/:yearStart/:yearEnd/:chosenTab"
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
                    | 'co2'
                    | 'useEnergyResiduals';
                  chosenTab: string;
                  yearStart: string;
                  yearEnd: string;
                }>,
              ) => (
                <ChartPage
                  naceRegionIdString={props.match.params.naceRegionIdString}
                  esgFactor={props.match.params.esgFactorIdString}
                  chosenTab={props.match.params.chosenTab}
                  yearStart={props.match.params.yearStart}
                  yearEnd={props.match.params.yearEnd}
                />
              )}
            />
            <Route path="/chartpage">
              {/* TODO: redirect to different default page? Redirect in component instead?*/}
              <Redirect to="/chartpage/1,1/emissionPerYear/2015/2018/1" />
            </Route>
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
