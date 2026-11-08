import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { createOtpOrder } from "@/lib/otpkan";

export async function POST(req: Request) {
  try {
    await requireUser();
    const body = await req.json();
    if (!body.service || !body.country) return NextResponse.json({error:"service dan country wajib diisi."},{status:400});
    // Jangan mengurangi saldo atau membuat pesanan sampai adapter supplier,
    // harga, dan transaksi saldo atomik selesai diverifikasi.
    const result = await createOtpOrder({service:String(body.service),country:String(body.country)});
    return NextResponse.json({result});
  } catch (e: any) {
    const status = e.message === "UNAUTHORIZED" ? 401 : 503;
    return NextResponse.json({error:e.message || "Layanan supplier belum siap."},{status});
  }
}
