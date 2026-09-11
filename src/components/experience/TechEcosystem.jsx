import { useState } from "react";
import { skillGroups } from "../../data/content";

/**
 * Technology ecosystem: existing skill groups laid out as connected nodes.
 * No new claims — labels and items come straight from content.js.
 */
export default function TechEcosystem() {
  const [active, setActive] = useState(0);
  const group = skillGroups[active];

  const positions = [
    { x: 12, y: 24 }, { x: 38, y: 12 }, { x: 62, y: 30 },
    { x: 86, y: 18 }, { x: 26, y: 66 }, { x: 58, y: 76 }, { x: 86, y: 60 },
  ];
  const edges = [[0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 2], [5, 6], [3, 6], [1, 4], [2, 6]];

  return (
    <div className="ecosystem">
      <div className="ecosystem-map">
        <svg viewBox="0 0 100 90" preserveAspectRatio="none" aria-hidden="true">
          {edges.map(([a, b], index) => {
            const isActive = a === active || b === active;
            return (
              <line
                key={index}
                x1={positions[a].x} y1={positions[a].y}
                x2={positions[b].x} y2={positions[b].y}
                className={isActive ? "is-active" : ""}
              />
            );
          })}
        </svg>
        {skillGroups.map((item, index) => (
          <button
            type="button"
            key={item.label}
            className={index === active ? "eco-node is-active" : "eco-node"}
            style={{ left: `${positions[index]?.x ?? 50}%`, top: `${positions[index]?.y ?? 50}%`, "--eco-delay": `${index * 0.12}s` }}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
            data-cursor="EXPLORE"
            aria-pressed={index === active}
          >
            <span className="eco-dot" />
            <span className="eco-label">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="ecosystem-detail" key={group.label}>
        <span className="mono-tag">{String(active + 1).padStart(2, "0")} / Node</span>
        <h3>{group.label}</h3>
        <div className="eco-items">
          {group.items.map((skill) => <span key={skill}>{skill}</span>)}
        </div>
      </div>
    </div>
  );
}
