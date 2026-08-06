"use client";
import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => <div className="hero3d__loading">Loading 3D…</div>,
});

export default function Hero3DClient() {
  return (
    <div className="hero3d">
      <Hero3D />
    </div>
  );
}
