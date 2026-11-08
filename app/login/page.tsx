
"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!url || !key) {
        throw new Error(
          "Konfigurasi Supabase belum tersedia. Periksa Environment Variables."
        );
      }

      const supabase = createClient(url, key);

      const { error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) throw error;

      window.location.href = "/dashboard";
    } catch (error) {
      setMsg(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat login."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="formPage">
      <form className="panel" onSubmit={submit}>
        <a href="/" className="brand">
          OTP<span>-IN</span>
        </a>

        <h1>Masuk</h1>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn" disabled={loading}>
          {loading ? "Memproses..." : "Masuk"}
        </button>

        <p>{msg}</p>

        <small>
          Belum punya akun? <a href="/register">Daftar</a>
        </small>
      </form>
    </main>
  );
}
