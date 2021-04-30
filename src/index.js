import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const firebase = require('firebase');
require('firebase/firestore');



const firebaseConfig = {
    apiKey: "AIzaSyDY9arWo9EYMuhfvIrx75ZLn80F8QY0Jzc",
    authDomain: "evernote-cb2dd.firebaseapp.com",
    projectId: "evernote-cb2dd",
    storageBucket: "evernote-cb2dd.appspot.com",
    messagingSenderId: "424792905604",
    appId: "1:424792905604:web:41b2a40c26448b78aeafd1",
    measurementId: "G-YRNV3S3K3S"
  };

firebase.initializeApp(firebaseConfig)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
