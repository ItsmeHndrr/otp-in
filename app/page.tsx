import Link from "next/link";
export default function Home() {
  return <main className="shell">
    <nav className="nav"><Link className="brand" href="/">OTP<span>-IN</span></Link><div><Link href="/login">Masuk</Link><Link className="btn small" href="/register">Daftar</Link></div></nav>
    <section className="hero">
      <div className="eyebrow">SIMPLE • CEPAT • PRAKTIS</div>
      <h1>Nomor OTP,<br/><span>lebih mudah.</span></h1>
      <p>Beli nomor virtual untuk menerima kode verifikasi dari layanan yang tersedia.</p>
      <div className="actions"><Link className="btn" href="/register">Mulai Sekarang</Link><Link className="btn ghost" href="/login">Login</Link></div>
      <div className="stats"><div><b>24/7</b><small>Akses platform</small></div><div><b>Saldo</b><small>Deposit manual</small></div><div><b>Praktis</b><small>Dashboard sederhana</small></div></div>
    </section>
    <footer>© {new Date().getFullYear()} OTP-IN. Gunakan layanan sesuai ketentuan platform terkait.</footer>
  </main>;
}
