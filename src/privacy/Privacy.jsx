import { PRIVACY } from './content.js';
import { CONTACT_EMAIL, PLAY_STORE_URL } from '../content.js';
import { Logo } from '../components/ui.jsx';

/** Convierte **negritas** del contenido compartido en <strong>. */
export function Rich({ text }) {
  return text.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map((part, index) =>
    part.startsWith('**') ? <strong key={index}>{part.slice(2, -2)}</strong> : <span key={index}>{part}</span>);
}

/** Página pública /privacidad: aviso de privacidad y manejo de datos (requisitos 16 y 17). */
export default function Privacy() {
  return (
    <div className="app privacy-page">
      <a className="skip" href="#main">Saltar al contenido</a>
      <header className="hdr"><a href="/" aria-label="Volver al inicio"><Logo /></a></header>
      <main id="main" className="privacy">
        <h1>Aviso de privacidad de PactoGG</h1>
        <p className="privacy-meta">Versión {PRIVACY.version} · Última actualización: {PRIVACY.updated}</p>
        <p>Este aviso explica qué datos personales trata PactoGG, para qué y cómo puedes ejercer tus derechos.</p>
        <nav aria-label="Secciones del aviso" className="privacy-toc">
          <ol>{PRIVACY.sections.map(([title], index) =>
            <li key={title}><a href={`#seccion-${index + 1}`}>{title.replace(/^\d+\.\s*/, '')}</a></li>)}</ol>
        </nav>
        {PRIVACY.sections.map(([title, paragraphs], index) => (
          <section key={title} id={`seccion-${index + 1}`} aria-labelledby={`titulo-${index + 1}`}>
            <h2 id={`titulo-${index + 1}`}>{title}</h2>
            <ul>{paragraphs.map((text) => <li key={text}><Rich text={text} /></li>)}</ul>
          </section>
        ))}
        <section id="eliminar-cuenta" aria-labelledby="titulo-eliminar">
          <h2 id="titulo-eliminar">Eliminar tu cuenta y tus datos</h2>
          <ul>
            <li>En la app: <strong>Perfil &gt; Eliminar mi cuenta</strong>, confirma con tu contraseña y escribe ELIMINAR.</li>
            <li>Si ya no tienes la app, escribe a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> desde el correo de tu cuenta.</li>
          </ul>
        </section>
        <p className="privacy-actions">
          <a href="/">Volver al inicio</a>
          {PLAY_STORE_URL && <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">PactoGG en Google Play ↗</a>}
        </p>
      </main>
    </div>
  );
}
