"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
export default function Login() {
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [msg,setMsg]=useState("");
  async function submit(e:React.FormEvent){e.preventDefault();const {error}=await supabase.auth.signInWithPassword({email,password});if(error)setMsg(error.message);else location.href="/dashboard";}
  return <main className="formPage"><form className="panel" onSubmit={submit}><a href="/" className="brand">OTP<span>-IN</span></a><h1>Masuk</h1><label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/><label>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/><button className="btn">Masuk</button><p>{msg}</p><small>Belum punya akun? <a href="/register">Daftar</a></small></form></main>;
}
