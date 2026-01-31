Untuk mendukung **fitur minimum** dari sebuah aplikasi inventory system, kita perlu merancang struktur database yang sederhana namun cukup fleksibel. Berikut adalah contoh rancangan **tabel utama** beserta relasi dasarnya:  

---

## 🗄️ Struktur Database Inventory System (Fitur Minimum)

### 1. **Tabel Produk (items/products)**
- `product_id` (PK, INT, AUTO_INCREMENT) → ID unik produk  
- `product_code` (VARCHAR) → Kode barang (bisa barcode/QR)  
- `name` (VARCHAR) → Nama barang  
- `category` (VARCHAR) → Kategori barang  
- `unit` (VARCHAR) → Satuan (pcs, box, kg, dll.)  
- `price` (DECIMAL) → Harga per unit  
- `created_at` (DATETIME)  
- `updated_at` (DATETIME)  

---

### 2. **Tabel Stok (stock)**
- `stock_id` (PK, INT, AUTO_INCREMENT)  
- `product_id` (FK → products.product_id)  
- `warehouse_id` (FK → warehouses.warehouse_id)  
- `quantity` (INT) → Jumlah stok tersedia  
- `updated_at` (DATETIME)  

---

### 3. **Tabel Gudang/Lokasi (warehouses)**
- `warehouse_id` (PK, INT, AUTO_INCREMENT)  
- `name` (VARCHAR) → Nama gudang/lokasi  
- `address` (TEXT) → Alamat gudang  
- `created_at` (DATETIME)  

---

### 4. **Tabel Transaksi (transactions)**
- `transaction_id` (PK, INT, AUTO_INCREMENT)  
- `product_id` (FK → products.product_id)  
- `warehouse_id` (FK → warehouses.warehouse_id)  
- `transaction_type` (ENUM: 'IN', 'OUT', 'TRANSFER')  
- `quantity` (INT)  
- `transaction_date` (DATETIME)  
- `user_id` (FK → users.user_id)  
- `notes` (TEXT)  

---

### 5. **Tabel User (users)**
- `user_id` (PK, INT, AUTO_INCREMENT)  
- `username` (VARCHAR)  
- `password_hash` (VARCHAR)  
- `role` (ENUM: 'ADMIN', 'STAFF', 'VIEWER')  
- `created_at` (DATETIME)  

---

## 🔗 Relasi Antar Tabel
- **products ↔ stock** → satu produk bisa ada di banyak gudang.  
- **warehouses ↔ stock** → satu gudang menyimpan banyak produk.  
- **transactions ↔ products & warehouses** → setiap transaksi terkait produk dan lokasi.  
- **users ↔ transactions** → transaksi dicatat oleh user tertentu.  

---

📌 Dengan struktur ini, aplikasi sudah bisa:  
- Menyimpan data produk.  
- Melacak stok per gudang.  
- Mencatat transaksi masuk/keluar/transfer.  
- Membuat laporan stok dan riwayat transaksi.  
- Mengatur hak akses user.  

Apakah kamu ingin saya buatkan **diagram ERD (Entity Relationship Diagram)** sederhana untuk memvisualisasikan relasi antar tabel ini?