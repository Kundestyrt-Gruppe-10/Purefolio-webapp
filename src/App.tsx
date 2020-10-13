import React from 'react';
import { FooterComponent } from './components/FooterComponent/FooterComponent';
import { HeaderComponent } from './components/HeaderComponent/HeaderComponent';
import { FrontPage } from './pages/FrontPage/FrontPage';
import { SearchResultsPage } from './pages/SearchResultsPage/SearchResultsPage';
import './index.css';
import { GlobalProvider } from './pages/GlobalProvider/GlobalProvider';
import { NaceRegionCardContainer } from './components/NaceRegionCard/NaceRegionCard';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export class App extends React.Component {
  render() {
    return (
      <>
        <GlobalProvider>
          <Router>
            <HeaderComponent />
            <NaceRegionCardContainer />
            {/*<Switch>
              <Route path="/results/">
                <SearchResultsPage />
              </Route>
              <Route path="/">
                <FrontPage />
              </Route>
            </Switch>*/}
            <FooterComponent />
          </Router>
        </GlobalProvider>
      </>
    );
  }
}
