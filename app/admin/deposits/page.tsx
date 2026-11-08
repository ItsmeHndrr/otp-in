import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase-server";
export const dynamic="force-dynamic";
export default async function AdminDeposits(){
 let user; try{user=await requireUser()}catch{return <main className="formPage"><section className="panel">Login admin diperlukan. <Link href="/login">Masuk</Link></section></main>}
 if(user.email!==process.env.ADMIN_EMAIL)return <main className="formPage"><section className="panel"><h1>Akses ditolak</h1></section></main>;
 const {data}=await supabaseAdmin().from("deposit_requests").select("*").order("created_at",{ascending:false}).limit(100);
 return <main className="shell"><Link href="/dashboard">← Dashboard</Link><h1>Admin — Deposit</h1>{(data||[]).map(d=><section className="panel" key={d.id}><b>Rp {Number(d.amount).toLocaleString("id-ID")}</b><p>User: {d.user_id}</p><p>Status: {d.status}</p><p>Catatan: {d.transfer_note||"-"}</p><small>ID: {d.id}</small><p>Konfirmasi/penolakan dilakukan melalui SQL admin yang dijelaskan di README; jangan konfirmasi sebelum dana benar-benar diterima.</p></section>)}</main>;
}
