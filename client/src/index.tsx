import React from 'react';
import ReactDOM from 'react-dom';
import './setup/index.css';
import App from './setup/App';
import store from './setup/redux-store';
import { Provider } from "react-redux"
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(

    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  ,
  document.getElementById('root')
);
