/**
 * Signature visual: a layered "intelligence core" built from CSS/SVG only —
 * orbital rings, a neural lattice and a glass orb. GPU-friendly transforms.
 */
export default function SignatureCore() {
  const nodes = [
    [50, 8], [82, 26], [92, 60], [70, 88], [34, 92], [10, 62], [16, 26], [50, 50],
    [36, 32], [66, 38], [62, 68], [38, 66],
  ];
  const links = [
    [0, 8], [0, 9], [8, 7], [9, 1], [8, 7], [7, 11], [11, 5], [9, 2], [10, 3], [11, 4],
    [8, 7], [8, 10], [9, 11], [10, 2], [7, 6], [8, 9], [10, 11], [7, 8],
  ];

  return (
    <div className="signature-core" aria-hidden="true">
      <div className="core-ring core-ring-a" />
      <div className="core-ring core-ring-b" />
      <div className="core-ring core-ring-c" />
      <div className="core-orb" />
      <svg className="core-lattice" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {links.map(([a, b], index) => (
          <line
            key={`l-${index}`}
            x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
            style={{ animationDelay: `${index * 0.14}s` }}
          />
        ))}
        {nodes.map(([x, y], index) => (
          <circle key={`n-${index}`} cx={x} cy={y} r={index === 7 ? 2.4 : 1.1} style={{ animationDelay: `${index * 0.18}s` }} />
        ))}
      </svg>
    </div>
  );
}
