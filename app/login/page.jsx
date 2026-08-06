"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getSupabase } from "@/lib/supabase";
import GoogleButton from "@/components/GoogleButton";

function nextUrl() {
  if (typeof window === "undefined") return "/test";
  const n = new URLSearchParams(window.location.search).get("next");
  return n && n.startsWith("/") ? n : "/test";
}

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) router.replace(nextUrl());
    });
    // handles the return from Google OAuth (session established from the URL code)
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user) router.replace(nextUrl());
    });
    return () => sub.subscription.unsubscribe();
  }, [router]);

  async function sendCode(e) {
    e.preventDefault(); setErr(""); setNote(""); setBusy(true);
    try {
      const { error } = await getSupabase().auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
      if (error) throw error;
      setStep("otp");
      setNote(`We emailed a 6-digit code to ${email}. Check spam if it's slow.`);
    } catch (e2) { setErr(e2.message || "Could not send the code. Please try again."); }
    finally { setBusy(false); }
  }

  async function verify(e) {
    e.preventDefault(); setErr(""); setBusy(true);
    try {
      const { error } = await getSupabase().auth.verifyOtp({ email, token: otp.trim(), type: "email" });
      if (error) throw error;
      router.replace(nextUrl());
    } catch (e2) {
      setErr("Incorrect OTP. Please check the 6-digit code and try again.");
      setBusy(false);
    }
  }

  return (
    <main className="container container--narrow" style={{ padding: "60px 22px 90px", maxWidth: 520 }}>
      <div className="gate">
        <div className="modal__brand" style={{ justifyContent: "center" }}>
          <span className="brand__dot">◆</span> Personova
        </div>
        <h2 style={{ marginTop: 14 }}>{step === "email" ? "Sign in to continue" : "Enter your code"}</h2>
        <p className="gate__sub">
          {step === "email"
            ? "We use a passwordless one-time code. New here? Your account is created automatically."
            : `We sent a 6-digit code to ${email}. It expires in 1 hour.`}
        </p>

        {step === "email" && (
          <>
            <GoogleButton redirectTo={typeof window !== "undefined" ? `${window.location.origin}/login?next=${encodeURIComponent(nextUrl())}` : undefined} />
            <div className="or-div"><span>or use email</span></div>
          </>
        )}

        <AnimatePresence mode="wait">
          {step === "email" ? (
            <motion.form key="e" onSubmit={sendCode} className="gate__form"
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}>
              <input type="email" required autoFocus placeholder="you@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)} className="gate__input" />
              <button className="btn btn--primary btn--lg" disabled={busy}>
                {busy ? "Sending…" : "Email me a code →"}
              </button>
            </motion.form>
          ) : (
            <motion.form key="o" onSubmit={verify} className="gate__form"
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
              <input inputMode="numeric" pattern="[0-9]*" maxLength={6} required autoFocus placeholder="123456"
                value={otp} onChange={(e) => { setErr(""); setOtp(e.target.value.replace(/\D/g, "")); }}
                className="gate__input gate__input--otp" />
              <button className="btn btn--primary btn--lg" disabled={busy || otp.length < 6}>
                {busy ? "Verifying…" : "Verify & continue ✨"}
              </button>
              <button type="button" className="linklike" onClick={() => { setStep("email"); setErr(""); setOtp(""); }}>
                ← Use a different email
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {note && <p className="gate__note">{note}</p>}
        {err && <p className="gate__err">⚠ {err}</p>}
        <p className="gate__fine">Secured by Supabase Auth. We only store your email.</p>
      </div>
    </main>
  );
}
