import { useEffect, useRef, useState } from 'react';
import { Logo } from '../components/ui.jsx';
import { validToken, verifyEmail } from './api.js';
import './verification.css';

const Messages = {
  missing: 'Abre de nuevo el enlace que recibiste en tu correo.',
  invalid: 'El código no es válido, venció o ya fue utilizado. Si tu cuenta sigue sin verificar, pide otro desde la app.',
  limited: 'Has realizado varios intentos. Espera un momento antes de volver a intentarlo.',
  unavailable: 'El servicio no está disponible por ahora. Inténtalo más tarde.',
  network: 'No pudimos confirmar el resultado. Revisa en la app si tu correo ya aparece verificado antes de intentarlo de nuevo.',
  error: 'No pudimos comprobar la respuesta. Revisa el estado de tu cuenta en la app.',
};

export default function VerifyEmail({ initial }) {
  const hasLinkToken = validToken(initial.token) && !initial.malformed;
  const [token, setToken] = useState(initial.token);
  const [status, setStatus] = useState(initial.malformed ? 'invalid' : 'idle');
  const sending = useRef(false);
  const mounted = useRef(true);
  useEffect(() => {
    document.title = 'Verifica tu correo — PactoGG';
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    if (!hasLinkToken || sending.current || status === 'success') return;
    const value = token.trim();
    if (!validToken(value)) { setStatus('missing'); return; }
    sending.current = true;
    setStatus('loading');
    const result = await verifyEmail(import.meta.env.VITE_API_BASE_URL || 'https://52-3-200-211.sslip.io', value);
    sending.current = false;
    if (!mounted.current) return;
    setStatus(result);
    if (result === 'success' || result === 'invalid') setToken('');
  };

  return <div className="verify-shell">
    <header className="verify-header"><Logo /><a href="/">Ir al inicio</a></header>
    <main id="main" className="verify-main">
      <section className="verify-card" aria-labelledby="verify-title">
        <span className="eyebrow">TU CUENTA PACTOGG</span>
        <h1 id="verify-title">{status === 'success' ? 'Correo verificado' : 'Verifica tu correo'}</h1>
        {!hasLinkToken ? <div className="verify-intro" role="status">
          <p>{initial.malformed ? 'Este enlace está incompleto o tiene un código incorrecto.' : 'Para verificar tu correo, abre el enlace que recibiste en tu correo electrónico.'}</p>
          <p>Si no lo encuentras, revisa spam o solicita uno nuevo desde la app.</p>
          <a className="btn btn-primary verify-submit" href="/">Volver al inicio</a>
        </div> : status === 'success' ? <div role="status" className="verify-success">
          <span className="verify-check" aria-hidden="true">✓</span>
          <p>Tu correo quedó confirmado. Ya puedes volver a PactoGG y continuar.</p>
          <p>Si la app todavía muestra el aviso, actualiza tu perfil.</p>
        </div> : <>
          <p className="verify-intro">Confirma que este correo es tuyo para continuar con tu cuenta.</p>
          <form onSubmit={submit} aria-busy={status === 'loading'}>
            <p className="verify-help">No necesitas escribir ningún código. Pulsa el botón para confirmar tu correo.</p>
            <div id="verify-message" className="verify-message" role="status" aria-live="polite">
              {status === 'loading' ? 'Comprobando tu código…' : Messages[status] || ''}
            </div>
            <button className="btn btn-primary verify-submit" type="submit" disabled={status === 'loading' || status === 'invalid'}>
              {status === 'loading' ? 'Verificando…' : 'Verificar correo'}
            </button>
          </form>
          <p className="verify-footnote">¿No recibiste el mensaje? Revisa spam o solicita un nuevo correo desde la app.</p>
        </>}
      </section>
      <p className="verify-note">No necesitas iniciar sesión en esta página. Tu código solo se envía al servicio de PactoGG al confirmar.</p>
    </main>
  </div>;
}
