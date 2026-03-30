Berhasil menemukan konteks awal: repo sudah punya struktur fitur, dan sekarang kita tinggal tambah integrasi Supabase untuk startup. Berikutnya saya cek file Supabase yang sudah ada untuk menyesuaikan scaffold.

Searched for text `supabase` (`**/*.{ts,js,md}`), 19 results

Bagus, saya sudah menemukan penggunaan Supabase di kode. Berikutnya saya konfirmasi implementasi helper `lib/supabase.ts` untuk memastikan scaffold sudah ada atau perlu ditambahkan.

Searched for regex `supabase\.auth|getSession|from\('` (`**/src/**/*.ts`), 9 results

## ✅ Status update
Hebat! Kode inti sudah ketemu (ada dashboard.ts pakai `supabase`), jadi kita dapat scaffold dengan tepat. Langkah berikutnya: saya berikan blueprint lengkap untuk setup Supabase startup awal (tanpa mengubah file langsung karena mode ASK).

---

## 🚀 Tujuan: scaffold Supabase untuk startup awal

1. Setup project Supabase
2. Buat helper global Supabase (`src/lib/supabase.ts`)
3. Tambahkan fungsi domain (users/kelas/attendance/finance/announcements)
4. Definisikan schema tabel sesuai kebutuhan
5. Integrasikan di halaman (misalnya dashboard.ts)

---

## 1) Supabase project + env

- Daftar/login di https://app.supabase.com
- Buat project -> salin:
  - `SUPABASE_URL` (contoh: `https://xxx.supabase.co`)
  - `SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (opsional, backend/admin-only)
- Di lokal (XAMPP):
  - `.env`
    - `VITE_SUPABASE_URL=...`
    - `VITE_SUPABASE_ANON_KEY=...`

> Jika tidak pakai bundler, pakai langsung `https://cdn.jsdelivr.net/npm/@supabase/supabase-js` di script.

---

## 2) `src/lib/supabase.ts` (scaffold helper)

```ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Supabase config missing in env');
}

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const auth = {
  signIn: (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password }),
  signOut: () => supabase.auth.signOut(),
  getSession: () => supabase.auth.getSession(),
  onAuthStateChange: (cb: (event: string, session: any) => void) =>
    supabase.auth.onAuthStateChange(cb),
};

export const userApi = {
  create: (payload: any) => supabase.from('users').insert(payload),
  list: () => supabase.from('users').select('*'),
  update: (id: string, payload: any) => supabase.from('users').update(payload).eq('id', id),
  delete: (id: string) => supabase.from('users').delete().eq('id', id),
};
```

- dashboard.ts bisa import: `import { supabase, auth, userApi } from '../../../lib/supabase'`.

---

## 3) Tabel Supabase minimal (SQL migration / Schema Builder)

Gunakan SQL Editor Supabase:

- `users`
  - id (uuid PK), email, name, role (`admin`, `guru`, `siswa`, `orang_tua`), class_id, parent_id, created_at
- `classes`
  - id, name, guru_id, school_year, created_at
- `school_settings`
  - id, academic_year, semester, school_name
- `attendance`
  - id, student_id, class_id, date, status (`hadir`/`sakit`/`izin`/`alpha`), notes
- `invoices`
  - id, student_id, month, amount, status (`unpaid`/`paid`), due_date, paid_date
- `announcements`
  - id, title, content, role_target, created_by, created_at

---

## 4) Endpoint/Domain wrappers (startup)

Buat di modules atau admin:
- `getDashboardStats()`
- `getTodayAttendance()`
- `getOutstandingInvoices()`
- `getLatestAnnouncements()`
- `createAnnouncement()`, `updateSettings()`, dsb.

Contoh:
```ts
export async function getDashboardStats() {
  const [siswa, guru, kelas, setting] = await Promise.all([
    supabase.from('users').select('id').eq('role','siswa'),
    supabase.from('users').select('id').eq('role','guru'),
    supabase.from('classes').select('id'),
    supabase.from('school_settings').select('*').single(),
  ]);
  return { students: siswa.data?.length ?? 0, teachers: guru.data?.length ?? 0, classes: kelas.data?.length ?? 0, setting: setting.data };
}
```

---

## 5) Integrasi startup awal (pages)

dashboard.ts sudah contoh:
- `supabase.auth.getSession()`
- queries `users/classes/attendance/invoices/announcements`
- optimalkan dengan wrapper sesuai `lib/supabase.ts` / module patterns.

---

## 6) Checklist deploy lokal (startup)

- [x] `npm install @supabase/supabase-js`
- [x] `npx tsc -p tsconfig.json`
- [x] Pastikan path modul sesuai (src + html)
- [x] Uji login (auth) + test fetch data
- [x] CORS / domain di Supabase settings beri `http://localhost`

---

## 🔧 Saran next step langsung

1. Buat file helper `src/lib/supabase.ts`.
2. Buat tabel satu per satu via Supabase UI (untuk startup cepat).
3. Buat services di modules (e.g. `src/modules/admin/dashboard.ts`).
4. Hubungkan dashboard.ts dengan service.
5. Uji “first run”: login sebagai admin → fetch summary.

---

## 💡 Catatan khusus repo ini

- Di dashboard.ts, sudah ada logic siswa/guru/classes/attendance/invoices/announcements, jadi scaffold backend Supabase ini bersinergi sangat cepat.
- Kalau perlu, saya bisa lanjut berikan skrip SQL lengkap untuk semua tabel di atas (untuk copy/paste ke Supabase SQL editor).