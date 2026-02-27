Berikut **jenis‑jenis autentikasi (auth) mulai dari yang paling sederhana** sampai yang lebih kuat dan kompleks:

***

## 🟩 **1. Password / Static Credentials (Paling Sederhana)**

Autentikasi dasar menggunakan:

*   **Username + password**
*   **PIN**
*   **Kode akses statis**

✔️ Mudah dibuat  
❌ Rentan terhadap pencurian password, brute force, phishing

***

## 🟨 **2. Token Berbasis Waktu / One-Time Password (OTP)**

Biasanya digunakan sebagai tambahan password.

Contoh:

*   SMS OTP
*   Email OTP
*   Authenticator app (Google Authenticator, Microsoft Authenticator)

✔️ Lebih aman dari password saja  
❌ SMS OTP bisa disadap / SIM swap

***

## 🟧 **3. Two-Factor Authentication (2FA)**

Menggabungkan **dua faktor berbeda**, misalnya:

*   *Something you know* (password)
*   *Something you have* (HP untuk OTP)
*   *Something you are* (biometrik)

✔️ Sangat meningkatkan keamanan  
❌ Masih tergantung faktor lain seperti password

***

## 🟦 **4. Multi-Factor Authentication (MFA)**

Lebih komprehensif dari 2FA—menggunakan beberapa faktor sekaligus.  
Kadang memakai:

*   OTP
*   Biometrik
*   Device trust

✔️ Lebih sulit ditembus  
❌ Bisa mengganggu kenyamanan pengguna

***

## 🟪 **5. OAuth 2.0 (Authorization Delegation)**

Bukan hanya autentikasi, tapi delegasi akses. Banyak dipakai untuk “Login with Google/Facebook/Microsoft”.

✔️ Pengguna tidak perlu membuat akun baru  
❌ Perlu integrasi lebih kompleks

***

## 🟫 **6. OpenID Connect (OIDC)**

Lapisan di atas OAuth 2.0 yang menambahkan autentikasi.  
Digunakan oleh:

*   Google Sign-in
*   Microsoft Identity Platform
*   AWS Cognito

✔️ Modern, aman, dan mendukung token berbasis JWT  
❌ Perlu pemahaman protokol

***

## 🟥 **7. SAML (Security Assertion Markup Language)**

Biasanya untuk aplikasi enterprise (SSO).  
Menggunakan XML untuk membuat "assertion" identitas.

✔️ Cocok untuk perusahaan besar  
❌ Lebih kompleks dan berat daripada OIDC

***

## 🟫 **8. Certificate-Based Authentication**

Menggunakan sertifikat digital (X.509) yang tersimpan di device.

✔️ Tingkat keamanan tinggi  
❌ Pengelolaan sertifikat rumit

***

## ⚫ **9. Passwordless Authentication (Modern)**

Auth tanpa password:

*   Magic link
*   Biometrik
*   Hardware key (FIDO2, YubiKey)
*   Windows Hello

✔️ Paling aman & nyaman  
❌ Implementasi butuh infrastruktur tambahan

***

Kalau kamu mau, aku bisa:

🔹 Bikin tabel perbandingan  
🔹 Bantu pilih tipe auth sesuai use case  
🔹 Tunjukkan contoh implementasi (Node.js, Python, .NET, dsb.)

Mau penjelasan lebih teknis atau yang ringan saja?
