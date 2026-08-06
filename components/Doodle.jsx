import { TYPES, ROLES } from "@/lib/types";

// Per-type "prop" emoji the doodle character holds/floats — its identity token.
const PROPS = {
  INTJ: "♟️", INTP: "💡", ENTJ: "👑", ENTP: "💬",
  INFJ: "🕯️", INFP: "🖋️", ENFJ: "📣", ENFP: "✨",
  ISTJ: "📋", ISFJ: "🛡️", ESTJ: "⚖️", ESFJ: "🎀",
  ISTP: "🔧", ISFP: "🎨", ESTP: "⚡", ESFP: "🎤",
};

/**
 * Animated hand-drawn doodle "action figure" for a given type.
 * size: pixel width/height. animated: adds bob/wave/blink loops.
 */
export default function Doodle({ code, size = 220, animated = true }) {
  const t = TYPES[code] || TYPES.INTJ;
  const role = ROLES[t.role];
  const color = role.color;
  const soft = role.soft;
  const prop = PROPS[code] || "⭐";
  const cls = animated ? "doodle doodle--animated" : "doodle";

  return (
    <div className={cls} style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 200 200" width={size} height={size} className="doodle__svg">
        {/* soft shadow */}
        <ellipse className="doodle__shadow" cx="100" cy="182" rx="46" ry="9" fill="rgba(0,0,0,0.10)" />

        {/* floating prop token */}
        <g className="doodle__prop">
          <circle cx="155" cy="46" r="20" fill="#fff" stroke={color} strokeWidth="3" />
          <text x="155" y="46" fontSize="22" textAnchor="middle" dominantBaseline="central">{prop}</text>
        </g>

        {/* body group (bobs) */}
        <g className="doodle__body">
          {/* legs */}
          <rect x="82" y="150" width="12" height="26" rx="6" fill={color} />
          <rect x="106" y="150" width="12" height="26" rx="6" fill={color} />
          {/* torso blob */}
          <path
            d="M100 58
               C 62 58 52 96 56 128
               C 59 156 78 162 100 162
               C 122 162 141 156 144 128
               C 148 96 138 58 100 58 Z"
            fill={soft}
            stroke={color}
            strokeWidth="5"
          />
          {/* left waving arm */}
          <g className="doodle__arm-left">
            <path d="M60 104 C 40 96 30 78 34 62" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" />
            <circle cx="33" cy="60" r="7" fill={color} />
          </g>
          {/* right arm */}
          <path d="M140 104 C 158 100 166 118 162 136" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" />
          <circle cx="163" cy="138" r="7" fill={color} />

          {/* head */}
          <circle cx="100" cy="72" r="34" fill="#fff" stroke={color} strokeWidth="5" />
          {/* hair tuft */}
          <path d="M74 54 C 84 40 116 40 126 54" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
          {/* eyes (blink) */}
          <g className="doodle__eyes">
            <circle cx="89" cy="70" r="4.5" fill="#2b2b3a" />
            <circle cx="111" cy="70" r="4.5" fill="#2b2b3a" />
          </g>
          {/* cheeks */}
          <circle cx="82" cy="82" r="5" fill={color} opacity="0.35" />
          <circle cx="118" cy="82" r="5" fill={color} opacity="0.35" />
          {/* smile */}
          <path d="M88 84 Q 100 96 112 84" fill="none" stroke="#2b2b3a" strokeWidth="3.5" strokeLinecap="round" />
          {/* type badge on chest */}
          <text x="100" y="130" fontSize="15" fontWeight="800" textAnchor="middle" fill={color} fontFamily="inherit">
            {code}
          </text>
        </g>
      </svg>
    </div>
  );
}
