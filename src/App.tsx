import React from 'react';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { FrontPage } from './components/FrontPage/FrontPage';
import './index.css';

//export const App: React.FC = () => <WelcomeMessage />;
export class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <FrontPage />
        <Footer />
      </>
    );
  }
}
