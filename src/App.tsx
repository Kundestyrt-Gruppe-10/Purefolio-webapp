import React from 'react';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { FrontPage } from './components/FrontPage/FrontPage';
import './index.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

//export const App: React.FC = () => <WelcomeMessage />;
export class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route path="/test">Test test</Route>
            <Route path="/">
              <FrontPage />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}
