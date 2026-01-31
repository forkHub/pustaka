Baik, mari saya tunjukkan **contoh query SQL** untuk mengecek apakah seorang user boleh melakukan aksi tertentu pada resource tertentu berdasarkan aturan ABAC yang sudah kita buat.  

---

## 🗄️ Contoh Query SQL ABAC

### 1. Ambil semua atribut user
```sql
SELECT user_id, username, department, location, job_title
FROM users
WHERE user_id = 5;
```
👉 Misalnya user dengan `user_id = 5` adalah **Staff Gudang Jakarta**.  

---

### 2. Cek policy yang relevan untuk resource tertentu
```sql
SELECT p.policy_id, p.policy_name, pr.action, pr.subject_attribute, pr.operator, pr.value, p.effect
FROM policies p
JOIN policy_rules pr ON p.policy_id = pr.policy_id
WHERE pr.resource_id = 2   -- misalnya resource stok_gudang
  AND pr.action = 'UPDATE';
```
👉 Ini akan menampilkan semua aturan yang berlaku untuk resource **stok_gudang** dengan aksi **UPDATE**.  

---

### 3. Cocokkan atribut user dengan aturan policy
```sql
SELECT p.policy_id, p.policy_name, p.effect
FROM policies p
JOIN policy_rules pr ON p.policy_id = pr.policy_id
JOIN users u ON (
    (pr.subject_attribute = 'department' AND u.department = pr.value)
 OR (pr.subject_attribute = 'location' AND u.location = pr.value)
 OR (pr.subject_attribute = 'job_title' AND u.job_title = pr.value)
)
WHERE u.user_id = 5
  AND pr.resource_id = 2
  AND pr.action = 'UPDATE';
```
👉 Query ini akan mengembalikan **policy yang cocok** dengan atribut user. Jika `effect = ALLOW`, maka user diizinkan. Jika `DENY`, maka ditolak.  

---

### 4. Tambahkan kondisi environment (misalnya jam kerja)
```sql
SELECT p.policy_id, p.policy_name, p.effect
FROM policies p
JOIN policy_rules pr ON p.policy_id = pr.policy_id
JOIN users u ON (
    (pr.subject_attribute = 'department' AND u.department = pr.value)
)
JOIN environment e ON pr.env_id = e.env_id
WHERE u.user_id = 5
  AND pr.resource_id = 2
  AND pr.action = 'UPDATE'
  AND e.attribute_name = 'time'
  AND CURRENT_TIME BETWEEN '09:00:00' AND '17:00:00';
```
👉 Dengan tambahan ini, sistem hanya mengizinkan akses jika **waktu saat ini berada dalam jam kerja**.  

---

## 🎯 Kesimpulan
- **Step 1**: Ambil atribut user.  
- **Step 2**: Ambil aturan policy untuk resource + action.  
- **Step 3**: Cocokkan atribut user dengan aturan policy.  
- **Step 4**: Tambahkan kondisi environment jika ada.  

---

Apakah kamu ingin saya buatkan **contoh skenario lengkap** (misalnya: User Staff Gudang Jakarta mencoba update stok di Gudang Surabaya → hasilnya DENY)?