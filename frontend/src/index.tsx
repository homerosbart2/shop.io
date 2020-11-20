import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Shop } from './shop';
import reportWebVitals from './reportWebVitals';
import { FontAwesomeLibrary } from './util/font-awesome-library';

FontAwesomeLibrary.initializeFontAwesomeLibrary();

ReactDOM.render(
    <React.StrictMode>
        <Shop />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
