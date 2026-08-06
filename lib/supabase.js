"use client";
import { createClient } from "@supabase/supabase-js";

// Public, browser-safe values (publishable key + project URL).
const SUPABASE_URL = "https://fzouhjpqgqycsgbtdedu.supabase.co";
const SUPABASE_KEY = "sb_publishable_EdHNLvRvrtl9z0hcbeegXw_68i57Lq0";

let _client = null;
export function getSupabase() {
  if (!_client) {
    _client = createClient(SUPABASE_URL, SUPABASE_KEY, {
      // persistSession keeps a user signed in on THEIR OWN device only (localStorage).
      // detectSessionInUrl handles the Google OAuth redirect return. It only acts when
      // the URL carries an auth code/token (i.e. right after login) — a plain shared
      // landing link has none, so recipients still land fresh & logged-out.
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: "pkce" },
    });
  }
  return _client;
}
