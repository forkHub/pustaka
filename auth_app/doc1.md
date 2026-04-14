Kalau mau bikin **multi-page app dengan Supabase** pakai **vanilla TypeScript + Vite (tanpa framework)**, dan ada fitur **login, logout, register, lupa password**, alurnya bisa seperti ini:

---

## 🔧 Setup Project
1. Buat project baru:
   ```bash
   npm create vite@latest supabase-app -- --template vanilla-ts
   cd supabase-app
   npm install
   ```

2. Install Supabase client:
   ```bash
   npm install @supabase/supabase-js
   ```

3. Buat file `src/supabaseClient.ts`:
   ```ts
   import { createClient } from '@supabase/supabase-js'

   const supabaseUrl = "https://YOUR_PROJECT.supabase.co"
   const supabaseKey = "YOUR_ANON_KEY"

   export const supabase = createClient(supabaseUrl, supabaseKey)
   ```

---

## 📄 Struktur Halaman
Karena tanpa framework, bisa pakai **multi-page** dengan file HTML terpisah:
- `index.html` → login
- `register.html` → register
- `forgot.html` → lupa password
- `dashboard.html` → halaman setelah login

---

## 🔑 Login
`src/login.ts`
```ts
import { supabase } from './supabaseClient'

const form = document.getElementById("login-form") as HTMLFormElement

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  const email = (document.getElementById("email") as HTMLInputElement).value
  const password = (document.getElementById("password") as HTMLInputElement).value

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    alert("Login gagal: " + error.message)
  } else {
    window.location.href = "dashboard.html"
  }
})
```

---

## 📝 Register
`src/register.ts`
```ts
import { supabase } from './supabaseClient'

const form = document.getElementById("register-form") as HTMLFormElement

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  const email = (document.getElementById("email") as HTMLInputElement).value
  const password = (document.getElementById("password") as HTMLInputElement).value

  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) {
    alert("Register gagal: " + error.message)
  } else {
    alert("Cek email untuk verifikasi!")
    window.location.href = "index.html"
  }
})
```

---

## 🔒 Logout
`src/dashboard.ts`
```ts
import { supabase } from './supabaseClient'

const logoutBtn = document.getElementById("logout") as HTMLButtonElement

logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut()
  window.location.href = "index.html"
})
```

---

## 🔑 Lupa Password
`src/forgot.ts`
```ts
import { supabase } from './supabaseClient'

const form = document.getElementById("forgot-form") as HTMLFormElement

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  const email = (document.getElementById("email") as HTMLInputElement).value

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/reset.html"
  })

  if (error) {
    alert("Error: " + error.message)
  } else {
    alert("Cek email untuk reset password!")
  }
})
```

---

## 📌 Catatan Penting
- Supabase akan kirim email verifikasi & reset password otomatis.
- Pastikan **redirect URL** di `Authentication → Settings` Supabase sudah diisi (misalnya `http://localhost:5173/reset.html`).
- Untuk multi-page, setiap halaman bisa punya script masing-masing, di-*bundle* oleh Vite.

---

Mau saya bikinkan **contoh struktur folder + HTML minimal** biar langsung bisa dicoba di browser?