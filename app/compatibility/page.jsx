import CompatibilityMatrix from "@/components/CompatibilityMatrix";

export const metadata = {
  title: "Type Compatibility Matrix — Personova",
  description: "How all 16 personality types pair up — an interactive compatibility heatmap.",
};

export default function CompatibilityPage() {
  return (
    <main className="container" style={{ padding: "44px 24px 70px" }}>
      <div className="section__head">
        <span className="eyebrow">Relationships</span>
        <h2>The 16-type compatibility matrix</h2>
        <p>How naturally each type meshes with every other — for love, friendship, or teamwork. Higher scores mean an easier natural fit; a lower score just means a pairing takes more intentional understanding.</p>
      </div>
      <CompatibilityMatrix />
    </main>
  );
}
