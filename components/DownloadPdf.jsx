"use client";

import { useState } from "react";
import { downloadReportPdf } from "@/lib/generatePdf";

export default function DownloadPdf({ code, identity, person }) {
  const [busy, setBusy] = useState(false);
  async function make() {
    setBusy(true);
    try { await downloadReportPdf(code, identity, person); }
    catch (e) { alert("Sorry — the PDF couldn't be generated. Please try again."); }
    finally { setBusy(false); }
  }
  return (
    <button className="btn btn--primary no-print" onClick={make} disabled={busy}>
      {busy ? "Building your PDF…" : "⬇ Download full report (PDF)"}
    </button>
  );
}
