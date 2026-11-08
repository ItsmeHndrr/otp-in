import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase-server";

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = await req.json();
    const amount = Number(body.amount);
    if (!Number.isSafeInteger(amount) || amount < 1000 || amount > 10000000)
      return NextResponse.json({ error: "Nominal deposit tidak valid." }, { status: 400 });
    const db = supabaseAdmin();
    const { data, error } = await db.from("deposit_requests").insert({
      user_id: user.id, amount, payment_method: "gopay_manual", status: "pending",
      transfer_note: String(body.transfer_note || "").slice(0, 160)
    }).select("id,amount,status").single();
    if (error) throw error;
    return NextResponse.json({ deposit: data }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message === "UNAUTHORIZED" ? "Silakan login." : "Gagal membuat deposit." }, { status: e.message === "UNAUTHORIZED" ? 401 : 500 });
  }
}
