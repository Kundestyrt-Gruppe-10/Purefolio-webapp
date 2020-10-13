import React from 'react';
import { FooterComponent } from './components/FooterComponent/FooterComponent';
import { HeaderComponent } from './components/HeaderComponent/HeaderComponent';
import { FrontPage } from './pages/FrontPage/FrontPage';
import { SearchResultsPage } from './pages/SearchResultsPage/SearchResultsPage';
import './index.css';
import { GlobalProvider } from './pages/GlobalProvider/GlobalProvider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
  Redirect,
} from 'react-router-dom';
import { ChartPage } from './pages/ChartPage/ChartPage';
import { NotFoundPage } from './pages/NotFoundPage/NoutFoundPage';

export class App extends React.Component {
  render() {
    return (
      <>
        <GlobalProvider>
          <BrowserRouter>
            <HeaderComponent />
            <Switch>
              {/* TODO: Add url params */}
              <Route path="/chartpage/" exact>
                <ChartPage />
              </Route>
              <Route path="/chartpage/:id/">
                <ChartPage />
              </Route>
              <Route path="/results/">
                <SearchResultsPage />
              </Route>
              <Route exact path="/">
                <FrontPage />
              </Route>
              <Route path="/404">
                <NotFoundPage />
              </Route>
              <Redirect to="/404" />
            </Switch>
            <FooterComponent />
          </BrowserRouter>
        </GlobalProvider>
      </>
    );
  }
}
