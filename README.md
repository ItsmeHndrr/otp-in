# OTP-IN — starter project

Starter Next.js + Supabase untuk platform OTP-IN. Tampilan, registrasi/login, skema database, pengajuan deposit manual, dan kerangka integrasi supplier sudah disiapkan.

## Penting sebelum dipakai
- API key yang pernah dikirim lewat chat sebaiknya di-rotate/revoke di dashboard OTPkan. Masukkan hanya key baru di environment server.
- API OTPkan **belum diaktifkan** karena dokumentasi endpoint, parameter, autentikasi, dan format respons belum tersedia. `lib/otpkan.ts` sengaja menjadi adapter aman dan tidak menebak endpoint.
- Halaman deposit saat ini merupakan kerangka UI. Endpoint `POST /api/deposits` sudah membuat permintaan pending, tetapi unggah bukti ke Supabase Storage dan proses persetujuan atomik perlu diselesaikan sebelum menerima pembayaran nyata.
- Halaman admin hanya menampilkan daftar permintaan. Jangan menganggap deposit terkonfirmasi hanya karena user mengirim formulir.

## Menjalankan
1. `npm install`
2. Salin `.env.example` menjadi `.env.local`, isi Supabase URL dan anon key.
3. Jalankan `supabase/schema.sql` di Supabase SQL Editor.
4. Isi `ADMIN_EMAIL` dengan email akun admin.
5. `npm run dev`

## Environment Vercel
Tambahkan variabel dari `.env.example` di Project Settings → Environment Variables. `SUPABASE_SERVICE_ROLE_KEY` dan `OTPKAN_API_KEY` wajib server-only; jangan pernah memakai prefix `NEXT_PUBLIC_`.

## Deposit manual
Nomor GoPay tujuan diatur melalui `GO_PAY_NUMBER` dan nama penerima melalui `GO_PAY_NAME`. Alur produksi yang disarankan:
1. User membuat permintaan deposit.
2. User mengunggah bukti ke bucket Storage private.
3. Admin memeriksa transaksi masuk pada aplikasi GoPay Merchant.
4. Backend admin menyetujui deposit dengan satu transaksi database atomik: ubah status hanya jika masih `pending`, tambah saldo, dan masukkan ledger. Jangan pernah menambah saldo dari browser.
5. Simpan audit admin dan idempotency key untuk mencegah kredit ganda.

## Integrasi OTPkan
Kirim dokumentasi resmi OTPkan (URL/file), khususnya:
- base URL dan endpoint order nomor;
- endpoint cek status/ambil OTP;
- endpoint cancel/refund;
- format autentikasi dan contoh response;
- harga/markup dan daftar negara/layanan.
Setelah itu implementasikan adapter di `lib/otpkan.ts`, validasi harga dari server, dan transaksi saldo atomik sebelum fitur pembelian diaktifkan.

## Status
Ini starter source, **belum layak menerima uang atau dipakai publik sebagai layanan produksi** sampai alur upload bukti, persetujuan deposit yang atomik, pengamanan admin, dan integrasi API supplier selesai diuji.
