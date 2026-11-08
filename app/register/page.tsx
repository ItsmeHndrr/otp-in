"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
export default function Register() {
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [msg,setMsg]=useState("");
  async function submit(e:React.FormEvent){e.preventDefault();const {error}=await supabase.auth.signUp({email,password});setMsg(error?error.message:"Pendaftaran berhasil. Periksa email jika konfirmasi diaktifkan.");}
  return <main className="formPage"><form className="panel" onSubmit={submit}><a href="/" className="brand">OTP<span>-IN</span></a><h1>Buat akun</h1><label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/><label>Password (min. 8 karakter)</label><input type="password" minLength={8} value={password} onChange={e=>setPassword(e.target.value)} required/><button className="btn">Daftar</button><p>{msg}</p><small>Sudah punya akun? <a href="/login">Masuk</a></small></form></main>;
}
