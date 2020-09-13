import React from 'react';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import './index.css';

//export const App: React.FC = () => <WelcomeMessage />;
export class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Footer />
      </>
    );
  }
}
