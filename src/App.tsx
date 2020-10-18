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
import { NaceRegionCardContainer } from './components/NaceRegionCard/NaceRegionCard';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Switch>
          <Route exact path="/chartpage">
            {/* TODO: redirect to different default page?*/}
            <Redirect to="/chartpage/1/1" />
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
          <Route path="/naceregion/">
            <NaceRegionCardContainer />
          </Route>
          <Route exact path="/">
            <HeaderComponent />
            <FrontPage />
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
