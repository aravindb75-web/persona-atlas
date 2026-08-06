"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSupabase } from "@/lib/supabase";
import Report from "@/components/Report";
import DownloadPdf from "@/components/DownloadPdf";

export default function ReportGate({ code, identity }) {
  const [step, setStep] = useState("email"); // email | otp | verified
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [note, setNote] = useState("");

  // Already logged in (via the nav Log-in)? Unlock the report automatically.
  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) { setEmail(data.session.user.email || ""); setStep("verified"); }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user) { setEmail(session.user.email || ""); setStep("verified"); }
      else setStep("email");
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function sendCode(e) {
    e.preventDefault();
    setErr(""); setNote(""); setBusy(true);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true },
      });
      if (error) throw error;
      setStep("otp");
      setNote("We emailed a 6-digit code to " + email + ". Enter it below. (Check spam — codes can take a minute.)");
    } catch (e2) {
      setErr(e2.message || "Could not send the code. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function verify(e) {
    e.preventDefault();
    setErr(""); setBusy(true);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.verifyOtp({ email, token: otp.trim(), type: "email" });
      if (error) throw error;
      // capture the lead (best-effort, non-blocking on failure)
      try {
        await supabase.from("personova_leads").insert({ email, type_code: `${code}-${identity}` });
      } catch (_) {}
      setStep("verified");
    } catch (e2) {
      setErr(e2.message || "That code didn't match. Please re-check and try again.");
    } finally {
      setBusy(false);
    }
  }

  if (step === "verified") {
    return (
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="verified-banner">✅ Verified — here's your complete report, {email.split("@")[0]}.</div>
        <div className="no-print" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
          <DownloadPdf code={code} identity={identity} />
        </div>
        <Report code={code} identity={identity} />
      </motion.div>
    );
  }

  return (
    <div className="gate">
      <div className="gate__lock">🔒</div>
      <h2>Unlock your full life report</h2>
      <p className="gate__sub">
        Your in-depth report — career paths, education, finances, and relationship compatibility —
        is ready. Verify your email to reveal it. No spam, ever.
      </p>

      <AnimatePresence mode="wait">
        {step === "email" && (
          <motion.form
            key="email" onSubmit={sendCode}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            className="gate__form"
          >
            <input
              type="email" required placeholder="you@example.com" value={email}
              onChange={(e) => setEmail(e.target.value)} className="gate__input" autoFocus
            />
            <button className="btn btn--primary btn--lg" disabled={busy}>
              {busy ? "Sending…" : "Email me a code →"}
            </button>
          </motion.form>
        )}
        {step === "otp" && (
          <motion.form
            key="otp" onSubmit={verify}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="gate__form"
          >
            <input
              inputMode="numeric" pattern="[0-9]*" maxLength={6} required
              placeholder="123456" value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="gate__input gate__input--otp" autoFocus
            />
            <button className="btn btn--primary btn--lg" disabled={busy || otp.length < 6}>
              {busy ? "Verifying…" : "Verify & reveal report ✨"}
            </button>
            <button type="button" className="linklike" onClick={() => { setStep("email"); setErr(""); }}>
              ← Use a different email
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {note && <p className="gate__note">{note}</p>}
      {err && <p className="gate__err">{err}</p>}
      <p className="gate__fine">
        Verification is powered by Supabase Auth. We store only your email and result type.
      </p>
    </div>
  );
}
