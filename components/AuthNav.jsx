"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSupabase } from "@/lib/supabase";
import GoogleButton from "@/components/GoogleButton";

export default function AuthNav() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("email"); // email | otp
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      if (session?.user) { setOpen(false); reset(); }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  function reset() {
    setStep("email"); setEmail(""); setOtp(""); setErr(""); setNote(""); setBusy(false);
  }

  async function sendCode(e) {
    e.preventDefault();
    setErr(""); setNote(""); setBusy(true);
    try {
      const { error } = await getSupabase().auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
      if (error) throw error;
      setStep("otp");
      setNote(`We emailed a 6-digit code to ${email}. Check spam if it's slow.`);
    } catch (e2) {
      setErr(e2.message || "Could not send the code. Try again.");
    } finally { setBusy(false); }
  }

  async function verify(e) {
    e.preventDefault();
    setErr(""); setBusy(true);
    try {
      const { error } = await getSupabase().auth.verifyOtp({ email, token: otp.trim(), type: "email" });
      if (error) throw error;
      // onAuthStateChange closes the modal + sets the user
    } catch (e2) {
      setErr(e2.message || "That code didn't match. Try again.");
      setBusy(false);
    }
  }

  async function signOut() {
    await getSupabase().auth.signOut();
  }

  if (!ready) return <span className="authnav__ph" aria-hidden="true" />;

  return (
    <>
      {user ? (
        <span className="authnav">
          <span className="authnav__email" title={user.email}>{user.email}</span>
          <button className="btn btn--ghost btn--sm" onClick={signOut}>Sign out</button>
        </span>
      ) : (
        <button className="btn btn--ghost btn--sm" onClick={() => { reset(); setOpen(true); }}>Sign in</button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="modal" initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }} transition={{ type: "spring", stiffness: 300, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal__close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
              <div className="modal__brand"><span className="brand__dot">◆</span> Personova</div>
              <h2 className="modal__title">{step === "email" ? "Sign in or sign up" : "Enter your code"}</h2>
              <p className="modal__sub">
                {step === "email"
                  ? "One email, one 6-digit code — no password. New here? This creates your account automatically."
                  : "We sent a 6-digit code to your email. It expires in 1 hour."}
              </p>

              {step === "email" && (
                <>
                  <GoogleButton />
                  <div className="or-div"><span>or use email</span></div>
                </>
              )}

              <AnimatePresence mode="wait">
                {step === "email" ? (
                  <motion.form key="e" onSubmit={sendCode} className="gate__form" style={{ maxWidth: "100%" }}
                    initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}>
                    <input type="email" required autoFocus placeholder="you@example.com" value={email}
                      onChange={(e) => setEmail(e.target.value)} className="gate__input" />
                    <button className="btn btn--primary btn--lg" disabled={busy}>
                      {busy ? "Sending…" : "Email me a code →"}
                    </button>
                  </motion.form>
                ) : (
                  <motion.form key="o" onSubmit={verify} className="gate__form" style={{ maxWidth: "100%" }}
                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                    <input inputMode="numeric" pattern="[0-9]*" maxLength={6} required autoFocus placeholder="123456"
                      value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      className="gate__input gate__input--otp" />
                    <button className="btn btn--primary btn--lg" disabled={busy || otp.length < 6}>
                      {busy ? "Verifying…" : "Verify & log in ✨"}
                    </button>
                    <button type="button" className="linklike" onClick={() => { setStep("email"); setErr(""); }}>
                      ← Use a different email
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              {note && <p className="gate__note">{note}</p>}
              {err && <p className="gate__err">{err}</p>}
              <p className="gate__fine">Secured by Supabase Auth. We only store your email.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
