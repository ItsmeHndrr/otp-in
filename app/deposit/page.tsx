"use client";
import { useState } from "react";
export default function Deposit(){
 const [amount,setAmount]=useState("10000"); const [reference,setReference]=useState(""); const [file,setFile]=useState<File|null>(null); const [msg,setMsg]=useState("");
 async function submit(e:React.FormEvent){e.preventDefault();setMsg("Fitur unggah bukti memerlukan storage Supabase. Ikuti SQL dan konfigurasi di README sebelum digunakan.");}
 return <main className="formPage"><form className="panel" onSubmit={submit}><a href="/dashboard">← Dashboard</a><h1>Deposit GoPay</h1><p>Transfer manual ke nomor GoPay resmi yang ditampilkan admin. Saldo masuk setelah diverifikasi.</p><label>Nominal (Rupiah)</label><input type="number" min="1000" step="1000" value={amount} onChange={e=>setAmount(e.target.value)} required/><label>Nomor referensi / catatan transfer</label><input value={reference} onChange={e=>setReference(e.target.value)} placeholder="Contoh: nama pengirim"/><label>Bukti transfer</label><input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)}/><button className="btn">Kirim permintaan</button><p>{msg}</p></form></main>
}
