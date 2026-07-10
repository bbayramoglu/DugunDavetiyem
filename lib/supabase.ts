import { createClient } from "@supabase/supabase-js";

function getConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) throw new Error("Supabase environment variables are missing.");
  return { url, serviceKey };
}

export function createServiceClient() {
  const { url, serviceKey } = getConfig();
  return createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
}

export function isAdminEmail(email: string | undefined) {
  if (!email) return false;
  const allowlist = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((item) => item.trim().toLocaleLowerCase("tr-TR"))
    .filter(Boolean);
  return allowlist.includes(email.toLocaleLowerCase("tr-TR"));
}
