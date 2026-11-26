import { useState } from 'react';
import { Icon } from './ui.jsx';

const scenes = [
  { icon: 'flag', name: 'Pactar', kicker: '01 / ACUERDO', title: 'Primero, las reglas.', detail: 'Dos personas aceptan el reto antes de jugar.', art: <><div className="scene-versus"><span>JUGADOR 01</span><b>VS</b><span>JUGADOR 02</span></div><div className="scene-pill"><Icon name="check" /> Reto acordado</div></> },
  { icon: 'upload', name: 'Jugar', kicker: '02 / EVIDENCIA', title: 'La partida habla.', detail: 'La evidencia muestra lo que pasó.', art: <><div className="scene-file"><Icon name="upload" /><span>Captura de partida</span><Icon name="check" /></div><div className="scene-pill">Lista para revisión</div></> },
  { icon: 'scale', name: 'Resolver', kicker: '03 / COMUNIDAD', title: 'El pacto se resuelve.', detail: 'El jurado revisa según las reglas aceptadas.', art: <><div className="scene-verdict"><Icon name="scale" /><span>Revisión de la comunidad</span></div><div className="scene-pill">Resultado por definir</div></> },
];

export function ExplorePanel() {
  const [active, setActive] = useState(0);
  const item = scenes[active];
  return (
    <div className="explore">
      <div className="scene-tabs" role="group" aria-label="Momentos de un reto">
        {scenes.map((scene, index) => <button key={scene.name} type="button" aria-pressed={active === index} onClick={() => setActive(index)}><Icon name={scene.icon} /><span>{scene.name}</span></button>)}
      </div>
      <section className="scene" key={active} aria-live="polite">
        <div className="scene-copy"><span className="eyebrow">{item.kicker}</span><h3>{item.title}</h3><p>{item.detail}</p></div>
        <div className="scene-art" aria-label={`Vista del momento: ${item.name}`}>{item.art}</div>
      </section>
      <p className="scene-note">El acuerdo define la partida · La comunidad respalda el resultado</p>
    </div>
  );
}
