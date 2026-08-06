"use client";
export default function PrintButton() {
  return (
    <button className="btn btn--ghost no-print" onClick={() => window.print()}>
      🖨️ Save / Print report (PDF)
    </button>
  );
}
