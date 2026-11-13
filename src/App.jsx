import { useRef, useState } from 'react';
import './styles.css';
import { Modal } from './components/ui.jsx';
import { Footer, Header, Hero } from './components/sections.jsx';
import { ExplorePanel } from './components/explore.jsx';

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
      {open && <Modal title="PactoGG en tres momentos" eyebrow="Vista conceptual" onClose={close}><ExplorePanel /></Modal>}
    </div>
  );
}
