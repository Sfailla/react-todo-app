import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './layout/Layout';

import './styles/index.scss';
import registerServiceWorker from './registerServiceWorker';

const App = () => (
	<Router>
		<Layout />
	</Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
