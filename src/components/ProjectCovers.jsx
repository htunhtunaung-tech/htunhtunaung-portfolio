import { useRef, useState } from 'react';

/*
 * Built-in animated covers. Each project picks one with `cover` in
 * src/data/site.js — or replaces it with a real screenshot via `image`.
 */

const REWARD_EVERY = 10;

/** A working miniature of the ClickJoy idea: tap, earn points, unlock rewards. */
export function ClickJoyDemo() {
  const [points, setPoints] = useState(0);
  const [bursts, setBursts] = useState([]);
  const nextId = useRef(0);

  const rewards = Math.floor(points / REWARD_EVERY);
  const toNext = points % REWARD_EVERY;

  const tap = () => {
    setPoints((p) => p + 1);
    const id = nextId.current++;
    const drift = Math.round((Math.random() - 0.5) * 60);
    setBursts((list) => [...list.slice(-6), { id, drift }]);
    window.setTimeout(() => setBursts((list) => list.filter((b) => b.id !== id)), 800);
  };

  return (
    <div className="cover cover--clickjoy">
      <span className="cover__caption">Live concept demo — tap it</span>
      <span className="clickjoy__ring clickjoy__ring--outer" aria-hidden="true" />
      <span className="clickjoy__ring clickjoy__ring--inner" aria-hidden="true" />
      <button type="button" className="clickjoy__button" onClick={tap} aria-label="Tap to earn a point">
        <span key={points} className="clickjoy__label">
          TAP
        </span>
      </button>
      {bursts.map((burst) => (
        <span key={burst.id} className="clickjoy__burst" style={{ '--drift': `${burst.drift}px` }} aria-hidden="true">
          +1
        </span>
      ))}
      <div className="clickjoy__stat clickjoy__stat--points" aria-live="polite">
        <span className="clickjoy__stat-label">Points</span>
        <span className="clickjoy__stat-value" key={points}>
          {points}
        </span>
      </div>
      <div className="clickjoy__stat clickjoy__stat--reward">
        <span className="clickjoy__stat-label clickjoy__stat-label--split">
          <span>Next reward</span>
          <span>{rewards} earned</span>
        </span>
        <span className="clickjoy__meter" aria-hidden="true">
          <span style={{ transform: `scaleX(${toNext / REWARD_EVERY})` }} />
        </span>
      </div>
    </div>
  );
}

/** An app-window skeleton: stands in for a screenshot without inventing UI. */
function BrowserCover() {
  const rows = [
    [30, 20, true],
    [24, 26, false],
    [34, 16, false],
    [22, 22, true],
  ];
  return (
    <div className="cover cover--browser" aria-hidden="true">
      <span className="cover__glow" />
      <div className="browser">
        <div className="browser__bar">
          <span className="browser__dots">
            <i />
            <i />
            <i />
          </span>
          <span className="browser__url" />
        </div>
        <div className="browser__body">
          <div className="browser__side">
            <b className="is-accent" style={{ width: '70%' }} />
            <b style={{ width: '86%' }} />
            <b style={{ width: '62%' }} />
            <b style={{ width: '74%' }} />
            <b style={{ width: '50%' }} />
          </div>
          <div className="browser__main">
            <div className="browser__head">
              <b style={{ width: '34%' }} />
              <b className="browser__cta" />
            </div>
            {rows.map(([a, b, accent], i) => (
              <div className="browser__row" key={i} style={{ '--i': i }}>
                <b style={{ flexBasis: `${a}%` }} />
                <b className="is-dim" style={{ flexBasis: `${b}%` }} />
                <span className={`browser__pill ${accent ? 'is-accent' : ''}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Empty axes: charts are only drawn from real project data. */
function ChartCover() {
  return (
    <div className="cover cover--chart" aria-hidden="true">
      <span className="cover__caption">No sample data shown</span>
      <div className="chart">
        <i />
        <i />
        <i />
        <i />
        <span className="chart__scan" />
        <span className="chart__note">Charts appear here from your real dataset</span>
      </div>
    </div>
  );
}

function GalleryCover({ project }) {
  const images = project.gallery || [];
  return (
    <div className="cover cover--gallery" aria-hidden={images.length === 0}>
      {[0, 1, 2].map((i) =>
        images[i] ? (
          <img key={i} className="gallery__tile" src={images[i]} alt={`${project.title} — piece ${i + 1}`} loading="lazy" />
        ) : (
          <span key={i} className="gallery__tile gallery__tile--empty" style={{ '--i': i }}>
            Render {String(i + 1).padStart(2, '0')}
          </span>
        )
      )}
    </div>
  );
}

function WordmarkCover({ project }) {
  return (
    <div className="cover cover--wordmark" aria-hidden="true">
      <span className="cover__glow cover__glow--low" />
      <span className="wordmark__title">{project.title}</span>
      {project.coverLine && <span className="wordmark__line">{project.coverLine}</span>}
    </div>
  );
}

export function ProjectCover({ project }) {
  if (project.image) {
    return (
      <div className="cover cover--image">
        <img src={project.image} alt={`Screenshot of ${project.title}`} loading="lazy" />
      </div>
    );
  }
  switch (project.cover) {
    case 'clickjoy':
      return <ClickJoyDemo />;
    case 'chart':
      return <ChartCover />;
    case 'gallery':
      return <GalleryCover project={project} />;
    case 'wordmark':
      return <WordmarkCover project={project} />;
    default:
      return <BrowserCover />;
  }
}
