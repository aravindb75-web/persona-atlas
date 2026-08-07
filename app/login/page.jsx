"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import GoogleButton from "@/components/GoogleButton";

function nextUrl() {
  if (typeof window === "undefined") return "/test";
  const n = new URLSearchParams(window.location.search).get("next");
  return n && n.startsWith("/") ? n : "/test";
}

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) router.replace(nextUrl());
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user) router.replace(nextUrl());
    });
    return () => sub.subscription.unsubscribe();
  }, [router]);

  const redirectTo =
    typeof window !== "undefined"
      ? window.location.origin + "/login?next=" + encodeURIComponent(nextUrl())
      : undefined;

  return (
    <main className="container container--narrow" style={{ padding: "60px 22px 90px", maxWidth: 520 }}>
      <div className="gate">
        <div className="modal__brand" style={{ justifyContent: "center" }}>
          <span className="brand__dot">◆</span> Personova
        </div>
        <h2 style={{ marginTop: 14 }}>Sign in to continue</h2>
        <p className="gate__sub">
          Continue with Google — one tap, no password. New here? Your account is created automatically.
        </p>
        <GoogleButton redirectTo={redirectTo} />
      </div>
    </main>
  );
}
