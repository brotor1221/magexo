import React from 'react';
// import ReactDOM from 'react-dom'; 
import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient'; // Ensure the path is correct
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';


const root = document.getElementById('root');
const appRoot = createRoot(root);


appRoot.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
