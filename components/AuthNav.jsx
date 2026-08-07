"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSupabase } from "@/lib/supabase";
import GoogleButton from "@/components/GoogleButton";

export default function AuthNav() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      if (session?.user) setOpen(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

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
        <button className="btn btn--ghost btn--sm" onClick={() => setOpen(true)}>Sign in</button>
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
              <h2 className="modal__title">Sign in or sign up</h2>
              <p className="modal__sub">
                Continue with Google — one tap, no password. New here? Your account is created automatically.
              </p>
              <GoogleButton />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
