import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter as Router } from "react-router-dom"

// React-Redux
import { Provider } from 'react-redux';
import store from './redux/store';


// for importing Ant design css // 
import 'antd/dist/antd.css'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


