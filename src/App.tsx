import React from 'react';
import { WelcomeMessage } from './components/WelcomeMessage/WelcomeMessage';
import { Header } from './components/Header/Header';
import './index.css';

//export const App: React.FC = () => <WelcomeMessage />;
export class App extends React.Component {
  render() {
    return (
      <>
        <Header />
      </>
    );
  }
}
