import React from 'react';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { FrontPage } from './components/FrontPage/FrontPage';
import { SearchResults } from './components/SearchResults/SearchResults';
import './index.css';
import { GlobalProvider } from './components/GlobalProvider/GlobalProvider';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export class App extends React.Component {
  render() {
    return (
      <>
        <GlobalProvider>
          <Router>
            <Header />
            <Switch>
              <Route path="/result">
                <SearchResults />
              </Route>
              <Route path="/">
                <FrontPage />
              </Route>
            </Switch>
            <Footer />
          </Router>
        </GlobalProvider>
      </>
    );
  }
}
