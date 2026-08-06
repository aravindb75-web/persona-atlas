// Pure-SVG pentagon radar for the 5 dimensions. No dependencies.
// data: [{ label, sub, value }]  value = 0..100
export default function RadarChart({ data, color = "#6d3bf5", size = 320 }) {
  const cx = size / 2, cy = size / 2 + 6;
  const R = size * 0.31;
  const n = data.length;
  const angle = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i, r) => [cx + Math.cos(angle(i)) * r, cy + Math.sin(angle(i)) * r];

  const rings = [0.25, 0.5, 0.75, 1];
  const gridPoly = (f) => data.map((_, i) => pt(i, R * f).join(",")).join(" ");
  const valuePoly = data.map((d, i) => pt(i, R * Math.max(0.12, d.value / 100)).join(",")).join(" ");

  return (
    <div className="radar-wrap">
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ overflow: "visible" }}>
        <defs>
          <radialGradient id="radarFill" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={color} stopOpacity="0.45" />
            <stop offset="100%" stopColor={color} stopOpacity="0.12" />
          </radialGradient>
        </defs>

        {/* grid rings */}
        {rings.map((f, i) => (
          <polygon key={i} points={gridPoly(f)} fill="none" stroke="rgba(120,110,170,0.22)" strokeWidth="1" />
        ))}
        {/* spokes */}
        {data.map((_, i) => {
          const [x, y] = pt(i, R);
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(120,110,170,0.22)" strokeWidth="1" />;
        })}

        {/* value polygon */}
        <polygon points={valuePoly} fill="url(#radarFill)" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
        {data.map((d, i) => {
          const [x, y] = pt(i, R * Math.max(0.12, d.value / 100));
          return <circle key={i} cx={x} cy={y} r="4.5" fill={color} stroke="#fff" strokeWidth="2" />;
        })}

        {/* labels */}
        {data.map((d, i) => {
          const [x, y] = pt(i, R + 26);
          const anchor = Math.abs(x - cx) < 6 ? "middle" : x > cx ? "start" : "end";
          return (
            <g key={i}>
              <text x={x} y={y - 4} textAnchor={anchor} fontSize="13" fontWeight="800" fill="#1c1830" fontFamily="var(--font-display), sans-serif">{d.label}</text>
              <text x={x} y={y + 12} textAnchor={anchor} fontSize="11" fill="#6a6685" fontFamily="var(--font-body), sans-serif">{d.sub}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
