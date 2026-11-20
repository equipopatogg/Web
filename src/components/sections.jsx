import { useRef, useState } from 'react';
import { Button, Icon, Logo, reduced } from './ui.jsx';
import { CONTACT_EMAIL, HERO_ALT, HERO_SRC, PLAY_STORE_URL, PRIVACY_PATH } from '../content.js';

export function Header() {
  return <header className="hdr"><Logo /><span className="hdr-note">El juego continúa fuera de la partida.</span></header>;
}

function TournamentVisual() {
  const [failed, setFailed] = useState(false);
  const visual = useRef(null);
  const move = (event) => {
    if (event.pointerType !== 'mouse' || reduced()) return;
    const bounds = visual.current.getBoundingClientRect();
    visual.current.style.setProperty('--move-x', `${((event.clientX - bounds.left) / bounds.width - .5) * -10}px`);
    visual.current.style.setProperty('--move-y', `${((event.clientY - bounds.top) / bounds.height - .5) * -8}px`);
  };
  const reset = () => {
    visual.current?.style.setProperty('--move-x', '0px');
    visual.current?.style.setProperty('--move-y', '0px');
  };
  return (
    <figure className="visual" ref={visual} onPointerMove={move} onPointerLeave={reset}>
      {failed ? <div className="fallback">Una partida entre amigos, un pacto por cumplir.</div> :
        <div className="photo-stage"><img className="hero-photo" src={HERO_SRC} alt={HERO_ALT} fetchPriority="high" onError={() => setFailed(true)} /></div>}
      <span className="photo-corner photo-corner-top" aria-hidden="true" />
      <span className="photo-corner photo-corner-bottom" aria-hidden="true" />
      <span className="photo-rail" aria-hidden="true"><i /><i /><i /></span>
      <figcaption className="photo-caption">PACTOGG / VISTA CONCEPTUAL</figcaption>
    </figure>
  );
}

export function Hero({ onOpen }) {
  return (
    <section className="hero" aria-labelledby="h1">
      <TournamentVisual />
      <div className="copy">
        <span className="eyebrow">PACTOGG / JUEGA EN COMUNIDAD</span>
        <h1 id="h1">Tus retos entre amigos, <em>en juego.</em></h1>
        <p className="lead">Pacten, compitan y demuestren quién cumplió.</p>
        <div className="hero-actions">
          <Button variant="primary" icon="arrow" aria-haspopup="dialog" onClick={onOpen}>Ver cómo funciona</Button>
          {PLAY_STORE_URL ? <a className="play-link" href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
            <span className="play-mark"><Icon name="play" /></span><span><small>DESCARGA EN</small>Google Play</span><b>↗</b>
          </a> : <span className="play-link play-link-disabled" aria-label="Enlace de Google Play pendiente">
            <span className="play-mark"><Icon name="play" /></span><span><small>PRÓXIMAMENTE EN</small>Google Play</span>
          </span>}
        </div>
        <div className="storyline" aria-label="Tres momentos: pactar, jugar y resolver">
          <span><b>01</b> Pactar</span><i /><span><b>02</b> Jugar</span><i /><span><b>03</b> Resolver</span>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="ftr">
      <span className="footer-status">Proyecto académico · Sin dinero real · <a href={PRIVACY_PATH}>Aviso de privacidad</a> · <a href={`${PRIVACY_PATH}#eliminar-cuenta`}>Eliminar cuenta</a></span>
      <nav className="socials" aria-label="Redes y contacto">
        <span className="social-placeholder" title="Instagram próximamente" aria-label="Instagram: próximamente"><img src={`${import.meta.env.BASE_URL}assets/instagram.svg`} alt="" /></span>
        <span className="social-placeholder" title="TikTok próximamente" aria-label="TikTok: próximamente"><img src={`${import.meta.env.BASE_URL}assets/tiktok.svg`} alt="" /></span>
        <span className="social-placeholder" title="Discord próximamente" aria-label="Discord: próximamente"><img src={`${import.meta.env.BASE_URL}assets/discord.svg`} alt="" /></span>
        <a href="https://github.com/equipopatogg" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        <a href={`mailto:${CONTACT_EMAIL}`}>Contacto ↗</a>
      </nav>
    </footer>
  );
}
