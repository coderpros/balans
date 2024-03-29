import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import 'react-app-polyfill/ie11';
import 'core-js';

import * as ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';
import './css/index.css';

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
