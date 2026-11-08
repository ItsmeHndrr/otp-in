/**
 * Adapter supplier OTPkan.
 * Jangan menebak endpoint/request/response supplier.
 * Lengkapi fungsi ini hanya berdasarkan dokumentasi resmi OTPkan.
 */
function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Konfigurasi ${name} belum diisi.`);
  return value;
}

export async function createOtpOrder(_input: {
  service: string;
  country: string;
}) {
  required("OTPKAN_API_KEY");
  required("OTPKAN_BASE_URL");
  required("OTPKAN_CREATE_ORDER_PATH");
  throw new Error(
    "Adapter OTPkan belum diaktifkan. Isi request dan parsing response sesuai dokumentasi resmi OTPkan."
  );
}

export async function checkOtpOrder(_supplierOrderId: string) {
  required("OTPKAN_API_KEY");
  required("OTPKAN_BASE_URL");
  required("OTPKAN_CHECK_ORDER_PATH");
  throw new Error(
    "Adapter cek OTPkan belum diaktifkan. Isi request dan parsing response sesuai dokumentasi resmi OTPkan."
  );
}
