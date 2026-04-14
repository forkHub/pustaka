Untuk membatasi user agar hanya bisa mendaftar di tenant tertentu di Supabase, ada beberapa strategi yang bisa dipakai tergantung model multi-tenant yang kamu pilih:

---

## 🔑 Strategi Utama

### 1. **Gunakan Metadata Tenant di Auth**
- Saat user mendaftar, tambahkan **`tenant_id`** ke metadata user (misalnya di `auth.users` atau `auth.user_metadata`).
- Validasi `tenant_id` ini di backend sebelum mengizinkan pendaftaran.
- Contoh: hanya izinkan pendaftaran jika `tenant_id` cocok dengan tenant yang sedang aktif.

```sql
-- Contoh kebijakan RLS di tabel users
CREATE POLICY "Tenant signup restriction"
ON users
FOR INSERT
USING (tenant_id = current_setting('app.tenant_id')::uuid);
```

> `current_setting('app.tenant_id')` bisa di-set dari aplikasi saat proses signup.

---

### 2. **Gunakan Invite-Only / Token**
- Tenant membuat **invite link** atau **token khusus**.
- User hanya bisa mendaftar jika memiliki token tersebut.
- Token berisi `tenant_id` yang otomatis ditulis ke metadata user saat signup.

---

### 3. **Validasi Email Domain**
- Jika tenant punya domain email khusus (misalnya `@perusahaan.com`), batasi signup hanya untuk domain tersebut.
- Bisa dilakukan dengan **Supabase Function** atau **Edge Function** yang intercept proses signup.

```js
// Contoh di Edge Function
if (!email.endsWith("@perusahaan.com")) {
  throw new Error("Signup hanya untuk domain perusahaan.com");
}
```

---

### 4. **Gunakan Clerk atau Sistem External**
- Jika integrasi dengan **Clerk** atau sistem manajemen organisasi lain, tenant bisa mengatur workspace sendiri.
- Supabase hanya menyimpan data dengan `tenant_id` yang sudah divalidasi dari sistem eksternal.

---

## ⚖️ Perbandingan

| Metode              | Kelebihan | Kekurangan | Cocok Untuk |
|---------------------|-----------|------------|-------------|
| Metadata tenant_id  | Sederhana, fleksibel | Perlu kontrol di backend | SaaS umum |
| Invite token        | Aman, kontrol penuh | Perlu sistem token | Tenant dengan akses terbatas |
| Email domain check  | Mudah, cepat | Tidak fleksibel | Tenant berbasis perusahaan |
| Integrasi Clerk     | Lengkap, enterprise-ready | Tambahan biaya/kompleksitas | B2B SaaS besar |

---

👉 Jadi, cara paling aman adalah **menggunakan metadata tenant_id + RLS**, lalu menambahkan mekanisme **invite token** atau **validasi domain** sesuai kebutuhan tenant.  

Apakah kamu ingin saya tunjukkan **contoh implementasi lengkap** (signup flow + RLS policy) untuk kasus “user hanya bisa daftar lewat invite token”?