import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Privacy from './privacy/Privacy.jsx';
import { PRIVACY_PATH } from './content.js';
import VerifyEmail from './verification/VerifyEmail.jsx';
import { readVerificationLink } from './verification/api.js';

const verification = readVerificationLink(window.location, window.history);
const privacy = window.location.pathname.replace(/\/+$/, '') === PRIVACY_PATH;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {verification ? <VerifyEmail initial={verification} /> : privacy ? <Privacy /> : <App />}
  </StrictMode>,
);
