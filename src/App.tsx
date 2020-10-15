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
  BrowserRouter,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom';
import { ChartPage } from './pages/ChartPage/ChartPage';
import { NotFoundPage } from './pages/NotFoundPage/NoutFoundPage';
import { OverviewTableComponent } from './components/OverviewTableComponent/OverviewTable';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Switch>
          <Route exact path="/chartpage">
            {/* TODO: redirect to different default page?*/}
          </Route>
          <Route
            path="/chartpage/:naceRegionIdString/:esgFactor"
            render={(
              props: RouteComponentProps<{
                naceRegionIdString: string;
                esgFactor: string;
              }>,
            ) => (
              <ChartPage
                naceRegionIdString={props.match.params.naceRegionIdString}
                esgFactor={props.match.params.esgFactor}
              />
            )}
          />
          <Route path="/results/">
            <SearchResultsPage />
          </Route>
          <Route exact path="/">
            <HeaderComponent />
            <FrontPage />
          </Route>
          <Route path="/overviewtable">
            <OverviewTableComponent />
          </Route>
          <Route path="/404">
            <NotFoundPage />
          </Route>
          <Redirect to="/404" />
        </Switch>
        <FooterComponent />
      </GlobalProvider>
    </BrowserRouter>
  );
};
