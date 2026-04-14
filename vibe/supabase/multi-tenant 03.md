Kalau hanya **admin yang boleh mendaftarkan user** di aplikasi multi-tenant Supabase, arsitekturnya bisa dibuat seperti ini:

---

## 🔑 Prinsip Dasar
1. **Matikan self-signup**: Jangan izinkan user mendaftar langsung lewat Supabase Auth default.
2. **Gunakan admin flow**: Hanya akun dengan role `admin` yang bisa membuat user baru.
3. **Simpan tenant_id di metadata user**: Saat admin mendaftarkan user, otomatis tambahkan `tenant_id` agar user langsung terikat ke tenant yang benar.
4. **Gunakan RLS untuk isolasi data**: Pastikan semua query user dibatasi berdasarkan `tenant_id`.

---

## ⚙️ Implementasi Teknis

### 1. Batasi Signup
- Di Supabase Auth, gunakan **Edge Function** atau backend API untuk intercept signup.
- Hanya izinkan signup jika request datang dari admin.

```js
// Contoh Edge Function untuk signup
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

  const { email, password, tenant_id, admin_token } = req.body

  // Validasi admin token
  if (admin_token !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({ error: "Hanya admin yang bisa mendaftarkan user" })
  }

  // Buat user baru dengan metadata tenant
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    user_metadata: { tenant_id }
  })

  if (error) return res.status(400).json({ error })
  return res.status(200).json({ user: data })
}
```

> Di sini, admin menggunakan **service role key** (bukan public key) untuk membuat user.

---

### 2. Role Management
- Tambahkan kolom `role` di metadata user (`admin`, `member`, dll).
- Gunakan RLS untuk membatasi aksi tertentu hanya untuk `admin`.

```sql
-- Contoh RLS: hanya admin yang bisa insert ke tabel users
CREATE POLICY "Only admins can insert users"
ON users
FOR INSERT
USING (auth.jwt() ->> 'role' = 'admin');
```

---

### 3. Tenant Binding
- Setiap user baru otomatis diberi `tenant_id` sesuai tenant admin yang mendaftarkan.
- Semua query user dibatasi dengan RLS berdasarkan `tenant_id`.

---

## 📌 Alur Kerja
1. Admin login → dapatkan token admin.
2. Admin panggil API/Edge Function → buat user baru.
3. User baru otomatis punya `tenant_id` dan `role`.
4. User login → hanya bisa akses data sesuai tenant.

---

👉 Dengan cara ini, **user tidak bisa mendaftar sendiri**, hanya admin yang punya akses untuk menambahkan user.  

Apakah kamu mau saya tunjukkan **contoh lengkap RLS policy** untuk memastikan user hanya bisa mengakses data sesuai tenant_id yang diberikan admin?