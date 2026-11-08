import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase-server";
export const dynamic = "force-dynamic";
export default async function Dashboard() {
  let user;
  try { user = await requireUser(); } catch { return <main className="formPage"><section className="panel"><h1>Silakan login</h1><Link href="/login" className="btn">Masuk</Link></section></main>; }
  const db=supabaseAdmin();
  const {data:wallet}=await db.from("wallets").select("balance").eq("user_id",user.id).maybeSingle();
  const {data:deposits}=await db.from("deposit_requests").select("id,amount,status,created_at").eq("user_id",user.id).order("created_at",{ascending:false}).limit(10);
  const goPay=process.env.GO_PAY_NUMBER || "Hubungi admin";
  return <main className="shell"><nav className="nav"><Link className="brand" href="/">OTP<span>-IN</span></Link><span>{user.email}</span></nav><h1>Dashboard</h1><div className="grid"><section className="panel"><small>Saldo tersedia</small><h2>Rp {Number(wallet?.balance||0).toLocaleString("id-ID")}</h2><Link className="btn" href="/deposit">Deposit saldo</Link></section><section className="panel"><small>Supplier OTP</small><h2>OTPkan</h2><p>Integrasi pembelian diaktifkan setelah dokumentasi API dipasang.</p></section></div><section className="panel"><h2>Deposit terbaru</h2>{(deposits||[]).length? <div className="table">{deposits!.map(d=><p key={d.id}>Rp {Number(d.amount).toLocaleString("id-ID")} — {d.status}</p>)}</div>:<p>Belum ada transaksi deposit.</p>}</section><p className="muted">Pembayaran GoPay: {goPay}</p></main>;
}
