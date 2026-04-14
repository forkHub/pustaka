**Untuk melindungi halaman (page) di aplikasi MPA JavaScript dengan Supabase, Anda perlu memanfaatkan fitur *authentication* Supabase. Intinya: sebelum menampilkan konten halaman, lakukan pengecekan apakah user sudah login dan memiliki hak akses. Jika tidak, redirect ke halaman login atau tampilkan pesan “tidak berhak.”**

---

## 🔑 Langkah-Langkah Proteksi Page dengan Supabase

### 1. Setup Supabase Client
Pastikan Anda sudah menginstal library Supabase:
```bash
npm install @supabase/supabase-js
```

Lalu buat instance client:
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://YOUR_PROJECT.supabase.co', 'YOUR_ANON_KEY')
```

---

### 2. Implementasi Login & Session
Gunakan metode `signInWithPassword` atau provider lain:
```javascript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
})
```

Supabase akan menyimpan session di local storage secara otomatis.

---

### 3. Proteksi Halaman
Di setiap halaman MPA, sebelum render konten, cek session user:

```javascript
async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    // User belum login → redirect ke login page
    window.location.href = '/login.html'
  } else {
    // User sudah login → boleh akses
    console.log("User:", session.user)
  }
}

checkAuth()
```

---

### 4. Role-Based Access (Opsional)
Jika Anda ingin membatasi akses berdasarkan role (misalnya admin vs user biasa), simpan role di tabel `profiles` lalu cek sebelum render:

```javascript
async function checkRole() {
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (data.role !== 'admin') {
    window.location.href = '/unauthorized.html'
  }
}
```

---

## 📋 Checklist WhatsApp-Ready
Untuk memudahkan implementasi:

```
[ ] Install @supabase/supabase-js
[ ] Buat client Supabase
[ ] Implementasi login (signInWithPassword)
[ ] Tambahkan checkAuth() di setiap halaman
[ ] Redirect ke login bila tidak ada session
[ ] (Opsional) Tambahkan role-based check
```

---

## ⚠️ Risiko & Catatan Penting
- **Client-side proteksi hanya mencegah tampilan UI.** Data tetap bisa diakses jika API tidak diamankan. Pastikan juga **Row Level Security (RLS)** diaktifkan di database Supabase agar data tidak bocor.
- **Gunakan redirect** agar user tidak bisa langsung mengetik URL halaman yang dilindungi.
- **Session Expiry:** Supabase session bisa kadaluarsa, jadi selalu cek ulang sebelum render halaman.

---

👉 Jadi, untuk aplikasi MPA JavaScript, cukup tambahkan **auth check di setiap halaman** menggunakan `supabase.auth.getSession()`. Jika ingin lebih aman, kombinasikan dengan **RLS di database** agar data tetap terlindungi meskipun ada bypass di sisi client.  

Apakah Anda ingin saya buatkan **contoh struktur folder MPA dengan proteksi Supabase** (misalnya `login.html`, `dashboard.html`, `unauthorized.html`) agar lebih jelas?