"use client";

import { createClient } from "@supabase/supabase-js";
import { FormEvent, useState } from "react";

type Rsvp = { id: string; full_name: string; attendance: "attending" | "not_attending"; guest_count: number; note: string | null; created_at: string };
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = url && anonKey ? createClient(url, anonKey) : null;

export default function AdminPage() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [rsvps, setRsvps] = useState<Rsvp[] | null>(null); const [message, setMessage] = useState(""); const [loading, setLoading] = useState(false);
  async function signIn(event: FormEvent) {
    event.preventDefault(); if (!supabase) { setMessage("Supabase yapılandırması eksik."); return; }
    setLoading(true); setMessage(""); const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.session) { setMessage(error?.message ?? "Giriş yapılamadı."); setLoading(false); return; }
    const response = await fetch("/api/admin", { headers: { Authorization: `Bearer ${data.session.access_token}` } }); const payload = await response.json();
    if (response.ok) setRsvps(payload.rsvps); else setMessage(payload.message ?? "Erişim hatası."); setLoading(false);
  }
  const attending = rsvps?.filter((item) => item.attendance === "attending") ?? [];
  const guestTotal = attending.reduce((total, item) => total + item.guest_count, 0);
  return <main className="admin-page"><div className="admin-card"><p className="eyebrow">İREM &amp; TOLGAHAN</p><h1>Yanıt Yönetimi</h1>
    {!rsvps ? <form onSubmit={signIn} className="admin-login"><label>E-posta<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label><label>Parola<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>{message && <p className="form-error">{message}</p>}<button className="submit-button" disabled={loading}>{loading ? "Giriş yapılıyor…" : "Giriş Yap"}</button></form> : <><div className="admin-stats"><div><strong>{guestTotal}</strong><span>Katılacak kişi</span></div><div><strong>{attending.length}</strong><span>Katılacak yanıt</span></div><div><strong>{rsvps.length - attending.length}</strong><span>Katılamayacak</span></div></div><div className="response-list">{rsvps.map((item) => <article key={item.id}><div><b>{item.full_name}</b><span>{item.attendance === "attending" ? `${item.guest_count} kişi katılacak` : "Katılamayacak"}</span>{item.note && <p>{item.note}</p>}</div><time>{new Intl.DateTimeFormat("tr-TR", { day:"numeric", month:"short" }).format(new Date(item.created_at))}</time></article>)}</div></>}
  </div></main>;
}
