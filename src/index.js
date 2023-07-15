import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-2mgbgxm3b0scb3xq.us.auth0.com"
    clientId="ygFFa9zzCPQPAqsABx1QAy0VP7Vwpqjb"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
);

