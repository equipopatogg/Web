import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import VerifyEmail from './verification/VerifyEmail.jsx';
import { readVerificationLink } from './verification/api.js';

const verification = readVerificationLink(window.location, window.history);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {verification ? <VerifyEmail initial={verification} /> : <App />}
  </StrictMode>,
);
