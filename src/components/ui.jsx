import { useCallback, useEffect, useRef, useState } from 'react';

const PATHS = {
  mic: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3',
  flag: 'M5 21V4M5 4h11l-2 4 2 4H5',
  scale: 'M12 3v18M6 21h12M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z',
  trophy: 'M8 4h8v6a4 4 0 0 1-8 0zM8 6H4v2a3 3 0 0 0 4 2.8M16 6h4v2a3 3 0 0 1-4 2.8M12 14v4M8 21h8',
  upload: 'M12 16V4M7 9l5-5 5 5M4 20h16',
  check: 'M5 12l5 5 9-10',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  close: 'M6 6l12 12M18 6L6 18',
  menu: 'M4 7h16M4 12h16M4 17h16',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4',
  users: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3 3-5 6-5s6 2 6 5M17 6a3 3 0 0 1 0 5M21 20c0-2.5-2-4.3-4-4.8',
};

export const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function Icon({ name, label }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" role={label ? 'img' : undefined}
      aria-label={label} aria-hidden={label ? undefined : true} focusable="false">
      <path d={PATHS[name]} />
    </svg>
  );
}

export function Logo() {
  return (
    <a className="logo" href="#main" aria-label="PactoGG, ir al inicio">
      <svg viewBox="0 0 36 36" width="36" height="36" aria-hidden="true" fill="none">
        <path d="M4 4h28v28H4z" fill="#121A2D" stroke="#FF7A1A" strokeWidth="2" />
        <path d="M10 25V11h8a5 5 0 0 1 0 10h-8m5-5h5" stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="round" />
        <path d="M26 13h-4v11h4v-4h-3" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="round" />
      </svg>
      <span>Pacto<b>GG</b></span>
    </a>
  );
}

// variant: primary | secondary | outline
export function Button({ variant = 'secondary', icon, className = '', children, ...rest }) {
  return (
    <button type="button" className={`btn btn-${variant} ${className}`} {...rest}>
      {children}{icon && <Icon name={icon} />}
    </button>
  );
}

// tone: cyan | violet | soft
export function Badge({ tone = 'soft', icon, dot, children }) {
  return (
    <span className={`badge badge-${tone}`}>
      {dot && <i className="dot" aria-hidden="true" />}
      {icon && <Icon name={icon} />}{children}
    </span>
  );
}

export function FeatureCard({ icon, title, text, step }) {
  return (
    <li className="fcard" style={{ '--i': step }}>
      <span className="fnum">Paso {step}</span>
      <Icon name={icon} />
      <h3>{title}</h3>
      <p>{text}</p>
    </li>
  );
}

export function QuickAccessCard({ icon, title, sub, onClick }) {
  return (
    <button type="button" className="qa" aria-haspopup="dialog" onClick={onClick}>
      <span className="ic"><Icon name={icon} /></span>
      <span><b>{title}</b><small>{sub}</small></span><span className="qa-arrow" aria-hidden="true">↗</span>
    </button>
  );
}

export function ModalHeader({ id, eyebrow, title, onClose }) {
  return (
    <div className="mh">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={id}>{title}</h2>
      </div>
      <Button onClick={onClose} icon="close" aria-label={`Cerrar ventana: ${title}`}>Cerrar</Button>
    </div>
  );
}

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function Modal({ title, eyebrow, onClose, children }) {
  const ref = useRef(null);
  const [out, setOut] = useState(false);
  const close = useCallback(() => {
    if (reduced()) return onClose();
    setOut(true);
    setTimeout(onClose, 160);
  }, [onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.focus();
    return () => { document.body.style.overflow = prev; };
  }, []);

  const onKeyDown = (e) => {
    if (e.key === 'Escape') { e.stopPropagation(); return close(); }
    if (e.key !== 'Tab') return;
    const f = [...ref.current.querySelectorAll(FOCUSABLE)];
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  return (
    <div className={`ov ${out ? 'out' : ''}`} onKeyDown={onKeyDown}
      onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div ref={ref} className="dlg" role="dialog" aria-modal="true" aria-labelledby="dlg-title" tabIndex={-1}>
        <ModalHeader id="dlg-title" eyebrow={eyebrow} title={title} onClose={close} />
        <div className="mb">{children}</div>
      </div>
    </div>
  );
}
