require('babel-polyfill');

console.log(`Client running in ${process.env.NODE_ENV} mode`);

import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/layout';

import store from './store';
import {Provider} from 'react-redux';

document.addEventListener('DOMContentLoaded', () =>
    ReactDOM.render(
    	<Provider store={store} >
    		<Layout />
    	</Provider>, document.getElementById('app'))
);
