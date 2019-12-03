import React from 'react';
import ReactDOM from 'react-dom';
import { Router} from "react-router-dom";
import { createBrowserHistory } from 'history';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const history = createBrowserHistory();

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Router history={history}>
      <App />
    </Router>,
  rootElement);

registerServiceWorker();
