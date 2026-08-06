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
      // detectSessionInUrl:false ensures a shared link never carries a session — a
      // recipient always lands on a fresh, logged-out landing page.
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
    });
  }
  return _client;
}
