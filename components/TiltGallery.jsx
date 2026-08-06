"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TYPES, ROLES } from "@/lib/types";
import Character from "@/components/Character";

function TiltCard({ code }) {
  const t = TYPES[code];
  const color = ROLES[t.role].color;
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 15 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 200, damping: 15 });

  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() { mx.set(0); my.set(0); }

  return (
    <motion.div
      ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 800 }}
      whileHover={{ scale: 1.04 }}
      className="tilt"
    >
      <Link href={`/result?type=${code}-A`} className="tilt__link" style={{ borderTopColor: color }}>
        <div style={{ transform: "translateZ(40px)" }}>
          <Character code={code} size={150} />
        </div>
        <div className="tilt__code" style={{ color }}>{code}</div>
        <div className="tilt__name">{t.name}</div>
      </Link>
    </motion.div>
  );
}

export default function TiltGallery() {
  return (
    <div className="type-grid">
      {Object.keys(TYPES).map((code) => <TiltCard key={code} code={code} />)}
    </div>
  );
}
