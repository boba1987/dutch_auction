import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import userConstants from './constants/userConstants';

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem(userConstants.tokenKey);
    if (token) config.headers['x-access-token'] = `Bearer ${token}`;
    config.headers['Content-Type'] = 'application/json'
    // Do something before request is sent
    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    if (error.response.status === 403) window.location.replace("/login");
    return Promise.reject(error);
  });

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
