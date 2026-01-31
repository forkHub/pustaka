Baik, berikut adalah **ERD dalam bentuk teks** untuk struktur **ABAC (Attribute-Based Access Control)** yang tadi kita bahas:  

```
[USERS]
   user_id (PK)
   username
   password_hash
   department
   location
   job_title
   created_at
        |
        | (atribut user digunakan dalam policy)
        v

[RESOURCES]
   resource_id (PK)
   resource_name
   resource_type
   description
        |
        | (resource dikontrol oleh policy)
        v

[ENVIRONMENT]
   env_id (PK)
   attribute_name
   attribute_value
        |
        | (atribut lingkungan digunakan dalam policy)
        v

[POLICIES]
   policy_id (PK)
   policy_name
   description
   effect (ALLOW/DENY)
        |
        | 1-to-many
        v

[POLICY_RULES]
   rule_id (PK)
   policy_id (FK → POLICIES.policy_id)
   subject_attribute (misalnya: department, location)
   operator (=, !=, IN, BETWEEN)
   value (misalnya: "Gudang", "09:00–17:00")
   resource_id (FK → RESOURCES.resource_id)
   action (READ, WRITE, DELETE)
   env_id (FK → ENVIRONMENT.env_id)
```

---

## 🔗 Relasi Utama
- **Users → Policy_Rules**: atribut user (department, location, dll.) dipakai untuk mencocokkan aturan.  
- **Resources → Policy_Rules**: menentukan objek apa yang dikontrol.  
- **Environment → Policy_Rules**: kondisi lingkungan (waktu, IP, device) ikut menentukan izin.  
- **Policies → Policy_Rules**: setiap policy bisa punya banyak aturan detail.  

---

📌 Dengan ERD ini, sistem bisa mengevaluasi:  
1. **Siapa** (user dengan atribut tertentu).  
2. **Resource apa** yang ingin diakses.  
3. **Aksi apa** (READ, WRITE, DELETE).  
4. **Dalam kondisi apa** (jam kerja, lokasi, device).  
5. **Efeknya** (ALLOW atau DENY).  

---

Apakah kamu ingin saya buatkan **contoh query SQL** untuk mengecek apakah seorang user boleh melakukan aksi tertentu pada resource tertentu berdasarkan policy ABAC ini?