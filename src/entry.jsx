// Promise polyfill to avoid "Promise is undefined" error in IE
require('es6-promise').polyfill();

// Object.assign() polyfill for IE (used in the reducer)
import './helpers/es6-polyfill.js';

import React from 'react';
import { render } from 'react-dom';
import request from 'axios';

import Root from './Root';
import api from '../config/api';
import { getInitialState } from './projectData';

fetchData()
  .then(data => {
    const state = getInitialState(data);
    startRedux(state);
  });

require('./stylesheets/main.styl');
require('../node_modules/react-select/dist/react-select.css');

// Launch the Redux application once we get data
function startRedux(state) {
  render(
    <Root initialState={state} />,
    window.document.getElementById('app')
  );
}

function fetchData() {
  const isLocal = window.bestofjs && window.bestofjs.projects;
  return isLocal ? fetchLocalData() : fetchServerData();
}

function fetchLocalData() {
  // read data from global `bestofjs` object
  return Promise.resolve(window.bestofjs.projects);
}

function fetchServerData() {
  const url = `${api('GET_PROJECTS')}projects.json`;
  return request(url)
    .then(response => response.data)
    .then(json => new Promise(resolve => {
      window.localStorage.setItem('bestofjs_projects', JSON.stringify(json));
      resolve(json);
    }));
}
