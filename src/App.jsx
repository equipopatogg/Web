import { useEffect, useRef, useState } from 'react';
import './styles.css';
import { Modal } from './components/ui.jsx';
import { Footer, Header, Hero } from './components/sections.jsx';
import { ExplorePanel } from './components/explore.jsx';
import { GA_MEASUREMENT_ID } from './content.js';

function AnalyticsConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('pactogg-analytics-consent');
    if (consent === 'accepted' && GA_MEASUREMENT_ID) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);
      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args) => window.dataLayer.push(args);
      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
      return;
    }
    if (!consent && GA_MEASUREMENT_ID) setVisible(true);
  }, []);

  if (!visible) return null;
  const decide = (value) => {
    localStorage.setItem('pactogg-analytics-consent', value);
    setVisible(false);
    window.location.reload();
  };
  return <aside className="consent" aria-label="Consentimiento de analítica">
    <p>Usamos analítica anónima para mejorar esta página. No activamos nada sin tu permiso.</p>
    <div className="consent-actions">
      <button type="button" className="consent-secondary" onClick={() => decide('rejected')}>No gracias</button>
      <button type="button" className="consent-primary" onClick={() => decide('accepted')}>Aceptar</button>
    </div>
  </aside>;
}

export default function App() {
  const [open, setOpen] = useState(false);
  const opener = useRef(null);
  const show = () => { opener.current = document.activeElement; setOpen(true); };
  const close = () => { setOpen(false); setTimeout(() => opener.current?.focus(), 0); };
  return (
    <div className="app">
      <a className="skip" href="#main">Saltar al contenido</a>
      <Header />
      <main id="main"><Hero onOpen={show} /></main>
      <Footer />
      {open && <Modal title="PactoGG en tres momentos" eyebrow="FLUJO PACTOGG" onClose={close}><ExplorePanel /></Modal>}
      <AnalyticsConsent />
    </div>
  );
}
