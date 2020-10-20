import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles/variables.css';

import { App } from './App';

import { FooterComponent } from './components/FooterComponent/FooterComponent';

ReactDOM.render(
  [<App key="1" />, <FooterComponent key="2" />],
  document.getElementById('root'),
);
