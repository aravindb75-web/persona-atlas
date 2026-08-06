import { TYPES, ROLES } from "@/lib/types";

// Per-type "look": skin, hair color/style, outfit shades, accessory, prop.
// Outfit base comes from the family; we shade it into facets for the low-poly feel.
const LOOKS = {
  INTJ: { skin: "#e8b98f", hair: "#3a2e4d", style: "short", acc: "glasses", prop: "♟️" },
  INTP: { skin: "#f0c9a0", hair: "#5b4a6e", style: "messy", acc: "glasses", prop: "💡" },
  ENTJ: { skin: "#d9a273", hair: "#2e2536", style: "slick", acc: "none", prop: "👑" },
  ENTP: { skin: "#e8b98f", hair: "#6b4a7a", style: "spiky", acc: "none", prop: "💬" },
  INFJ: { skin: "#eec59c", hair: "#2f5d50", style: "long", acc: "none", prop: "🕯️" },
  INFP: { skin: "#f2cba4", hair: "#3f7d63", style: "wavy", acc: "none", prop: "🌸" },
  ENFJ: { skin: "#d99f74", hair: "#26564a", style: "slick", acc: "none", prop: "📣" },
  ENFP: { skin: "#f0c9a0", hair: "#41916f", style: "curly", acc: "none", prop: "✨" },
  ISTJ: { skin: "#e0ac7e", hair: "#2b4457", style: "short", acc: "none", prop: "📋" },
  ISFJ: { skin: "#f0c6a0", hair: "#33566b", style: "bun", acc: "none", prop: "🛡️" },
  ESTJ: { skin: "#d9a273", hair: "#233a49", style: "slick", acc: "none", prop: "⚖️" },
  ESFJ: { skin: "#eec59c", hair: "#3b6076", style: "wavy", acc: "none", prop: "🎀" },
  ISTP: { skin: "#dca97a", hair: "#6b5326", style: "messy", acc: "none", prop: "🔧" },
  ISFP: { skin: "#f2cba4", hair: "#8a6a2f", style: "wavy", acc: "none", prop: "🎨" },
  ESTP: { skin: "#d9a273", hair: "#4a3a1f", style: "spiky", acc: "shades", prop: "⚡" },
  ESFP: { skin: "#eec59c", hair: "#7a5a2a", style: "curly", acc: "none", prop: "🎤" },
};

// darken/lighten a hex by amount (-1..1)
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const f = (c) => Math.max(0, Math.min(255, Math.round(c + amt * 255)));
  return `#${((1 << 24) + (f(r) << 16) + (f(g) << 8) + f(b)).toString(16).slice(1)}`;
}

function Hair({ style, c, c2 }) {
  switch (style) {
    case "long":
      return (<>
        <polygon points="72,64 60,150 84,150 92,80" fill={c2} />
        <polygon points="168,64 180,150 156,150 148,80" fill={c} />
        <polygon points="76,40 120,26 164,40 168,86 120,58 72,86" fill={c} />
        <polygon points="120,26 164,40 168,86 120,58" fill={c2} />
      </>);
    case "bun":
      return (<>
        <circle cx="120" cy="30" r="15" fill={c} />
        <circle cx="120" cy="30" r="15" fill={c2} opacity="0.4" />
        <polygon points="74,44 120,30 166,44 168,80 120,54 72,80" fill={c} />
        <polygon points="120,30 166,44 168,80 120,54" fill={c2} />
      </>);
    case "curly":
      return (<>
        <circle cx="80" cy="52" r="14" fill={c} /><circle cx="104" cy="40" r="15" fill={c2} />
        <circle cx="136" cy="40" r="15" fill={c} /><circle cx="160" cy="52" r="14" fill={c2} />
        <polygon points="74,56 120,40 166,56 166,84 74,84" fill={c} />
      </>);
    case "spiky":
      return (<>
        <polygon points="72,80 78,34 96,60 108,28 120,58 132,28 144,60 162,34 168,80 120,54" fill={c} />
        <polygon points="120,58 132,28 144,60 168,80 120,54" fill={c2} />
      </>);
    case "wavy":
      return (<>
        <polygon points="70,84 66,44 92,54 120,34 148,54 174,44 170,84 120,56" fill={c} />
        <polygon points="120,34 148,54 174,44 170,84 120,56" fill={c2} />
      </>);
    case "messy":
      return (<>
        <polygon points="70,82 74,40 90,58 106,36 120,56 134,36 150,58 166,40 170,82 120,52" fill={c} />
        <polygon points="120,56 134,36 150,58 170,82 120,52" fill={c2} />
      </>);
    case "slick":
      return (<>
        <polygon points="74,78 78,44 120,34 162,44 166,78 120,50" fill={c} />
        <polygon points="120,34 162,44 166,78 120,50" fill={c2} />
      </>);
    default: // short
      return (<>
        <polygon points="74,80 80,42 120,32 160,42 166,80 120,52" fill={c} />
        <polygon points="120,32 160,42 166,80 120,52" fill={c2} />
      </>);
  }
}

/**
 * Low-poly faceted character bust for a personality type.
 * Pure (no hooks) so it renders on the server and in the gallery.
 */
export default function Character({ code, size = 240, animated = true }) {
  const t = TYPES[code] || TYPES.INTJ;
  const look = LOOKS[code] || LOOKS.INTJ;
  const fam = ROLES[t.role].color;
  const cloth = fam;
  const cloth2 = shade(fam, -0.14);
  const cloth3 = shade(fam, 0.1);
  const skin = look.skin;
  const skin2 = shade(skin, -0.1);
  const hair2 = shade(look.hair, -0.12);
  const cls = animated ? "lp lp--animated" : "lp";

  return (
    <div className={cls} style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 240 340" width={size} height={size} className="lp__svg">
        {/* ground shadow */}
        <ellipse className="lp__shadow" cx="120" cy="322" rx="70" ry="12" fill="rgba(20,15,40,0.14)" />

        {/* floating prop badge */}
        <g className="lp__prop">
          <circle cx="196" cy="70" r="24" fill="#fff" stroke={cloth} strokeWidth="3" />
          <text x="196" y="71" fontSize="26" textAnchor="middle" dominantBaseline="central">{look.prop}</text>
        </g>

        <g className="lp__body">
          {/* legs */}
          <polygon points="96,300 96,250 116,250 114,300" fill={cloth2} />
          <polygon points="124,300 126,250 144,250 144,300" fill={shade(fam, -0.2)} />
          {/* shoes */}
          <polygon points="88,300 116,300 116,314 84,314" fill="#2b2b3a" />
          <polygon points="124,300 148,300 152,314 122,314" fill="#1f1f2b" />

          {/* torso — faceted outfit */}
          <polygon points="120,150 74,196 84,262 120,272 156,262 166,196" fill={cloth} />
          <polygon points="120,150 166,196 156,262 120,272" fill={cloth2} />
          <polygon points="120,150 74,196 84,262 120,272" fill={cloth3} />
          {/* collar / neckline */}
          <polygon points="104,150 120,178 136,150 120,146" fill={shade(fam, -0.24)} />

          {/* left arm (down) */}
          <polygon points="74,196 60,244 74,250 86,206" fill={cloth2} />
          <circle cx="66" cy="250" r="9" fill={skin} />
          {/* right arm (raised toward prop) */}
          <polygon points="166,196 182,150 172,120 158,150 154,206" fill={cloth} />
          <circle cx="177" cy="120" r="9" fill={skin} />

          {/* neck */}
          <polygon points="108,132 132,132 130,150 110,150" fill={skin2} />

          {/* head — faceted */}
          <polygon points="120,64 90,84 92,116 120,134 148,116 150,84" fill={skin} />
          <polygon points="120,64 150,84 148,116 120,134" fill={skin2} />
          <polygon points="120,134 108,124 132,124" fill={shade(skin, -0.16)} />

          {/* hair */}
          <Hair style={look.style} c={t.role === "Explorer" ? look.hair : look.hair} c2={hair2} />

          {/* face */}
          <circle cx="107" cy="98" r="3.4" fill="#2b2b3a" />
          <circle cx="133" cy="98" r="3.4" fill="#2b2b3a" />
          <path d="M110 112 Q120 120 130 112" fill="none" stroke="#2b2b3a" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="100" cy="108" r="4" fill={cloth} opacity="0.22" />
          <circle cx="140" cy="108" r="4" fill={cloth} opacity="0.22" />

          {/* accessory */}
          {look.acc === "glasses" && (
            <g stroke="#2b2b3a" strokeWidth="2.6" fill="none">
              <rect x="98" y="92" width="16" height="12" rx="3" />
              <rect x="126" y="92" width="16" height="12" rx="3" />
              <line x1="114" y1="98" x2="126" y2="98" />
            </g>
          )}
          {look.acc === "shades" && (
            <g fill="#1f1f2b">
              <rect x="97" y="92" width="17" height="12" rx="3" />
              <rect x="126" y="92" width="17" height="12" rx="3" />
              <rect x="113" y="96" width="14" height="3" />
            </g>
          )}

          {/* chest type badge */}
          <text x="120" y="224" fontSize="17" fontWeight="800" textAnchor="middle" fill="#fff" fontFamily="inherit">{code}</text>
        </g>
      </svg>
    </div>
  );
}
