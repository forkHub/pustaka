Bagus, mari kita bahas bagaimana **struktur database untuk ABAC (Attribute-Based Access Control)**.  

ABAC berbeda dengan RBAC karena hak akses tidak ditentukan lewat *role* saja, melainkan lewat **atribut** (user, resource, environment) dan **policy** (aturan). Jadi database ABAC harus bisa menyimpan atribut-atribut tersebut serta aturan yang menghubungkannya.  

---

## 🗄️ Struktur Database ABAC

### 1. **Tabel Users**
- `user_id` (PK)  
- `username`  
- `password_hash`  
- `department` (misalnya: Sales, Gudang)  
- `location` (misalnya: Jakarta, Surabaya)  
- `job_title`  
- `created_at`  

👉 Atribut user disimpan langsung di tabel ini.  

---

### 2. **Tabel Resources**
- `resource_id` (PK)  
- `resource_name` (misalnya: stok_gudang, laporan_penjualan)  
- `resource_type` (misalnya: table, API, file)  
- `description`  

👉 Menyimpan objek yang ingin dikontrol aksesnya.  

---

### 3. **Tabel Environment**
- `env_id` (PK)  
- `attribute_name` (misalnya: time, ip_address, device_type)  
- `attribute_value` (misalnya: 09:00–17:00, 192.168.1.*, mobile)  

👉 Menyimpan kondisi lingkungan yang bisa memengaruhi akses.  

---

### 4. **Tabel Policies**
- `policy_id` (PK)  
- `policy_name`  
- `description`  
- `effect` (ALLOW / DENY)  

👉 Menyimpan aturan utama.  

---

### 5. **Tabel Policy_Rules**
- `rule_id` (PK)  
- `policy_id` (FK → Policies.policy_id)  
- `subject_attribute` (misalnya: department, location)  
- `operator` (misalnya: =, !=, IN, BETWEEN)  
- `value` (misalnya: "Gudang", "09:00–17:00")  
- `resource_id` (FK → Resources.resource_id)  
- `action` (misalnya: READ, WRITE, DELETE)  

👉 Menyimpan detail aturan: siapa (berdasarkan atribut), boleh melakukan apa, terhadap resource mana, dalam kondisi apa.  

---

## 🔗 Contoh Relasi ABAC
- **Users** punya atribut (department, location).  
- **Resources** adalah objek yang dikontrol.  
- **Policies** berisi aturan.  
- **Policy_Rules** menghubungkan atribut user + resource + environment → menentukan apakah akses diizinkan.  

---

## 🎯 Contoh Kasus di Inventory System
- Policy: *“Staff gudang hanya boleh UPDATE stok di gudang tempat dia bekerja, dan hanya di jam kerja (09:00–17:00).”*  
  - Subject attribute: `department = Gudang`  
  - Resource: `stok_gudang`  
  - Action: `UPDATE`  
  - Environment: `time BETWEEN 09:00–17:00`  
  - Effect: `ALLOW`  

---

👉 Jadi, database ABAC lebih kompleks daripada RBAC karena harus menyimpan **atribut** dan **policy rules** yang fleksibel.  

Apakah kamu ingin saya buatkan **ERD teks** untuk struktur ABAC ini supaya lebih mudah divisualisasikan?