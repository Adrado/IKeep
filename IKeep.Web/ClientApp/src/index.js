import React from 'react';
import ReactDOM from 'react-dom';
import { Router} from "react-router-dom";
import { createBrowserHistory } from 'history';
import Layout2 from './components/Layout2';

import registerServiceWorker from './registerServiceWorker';

const history = createBrowserHistory();

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Router history={history}>
      <Layout2></Layout2>
    </Router>,
  rootElement);

registerServiceWorker();
