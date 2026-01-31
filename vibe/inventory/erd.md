Baik, berikut adalah contoh **ERD (Entity Relationship Diagram) dalam bentuk teks** untuk struktur database inventory system dengan fitur minimum:  

```
[USERS] ----------------< (user_id) >---------------- [TRANSACTIONS]
   | user_id (PK)                                      | transaction_id (PK)
   | username                                          | product_id (FK)
   | password_hash                                     | warehouse_id (FK)
   | role                                              | user_id (FK)
   | created_at                                        | transaction_type
                                                       | quantity
                                                       | transaction_date
                                                       | notes

[PRODUCTS] ----------------< (product_id) >----------- [STOCK]
   | product_id (PK)                                   | stock_id (PK)
   | product_code                                      | product_id (FK)
   | name                                              | warehouse_id (FK)
   | category                                          | quantity
   | unit                                              | updated_at
   | price
   | created_at
   | updated_at

[WAREHOUSES] ----------------< (warehouse_id) >------- [STOCK]
   | warehouse_id (PK)                                 | stock_id (PK)
   | name                                              | product_id (FK)
   | address                                           | warehouse_id (FK)
   | created_at                                        | quantity
                                                       | updated_at

[PRODUCTS] ----------------< (product_id) >----------- [TRANSACTIONS]
   | product_id (PK)                                   | transaction_id (PK)
   | product_code                                      | product_id (FK)
   | name                                              | warehouse_id (FK)
   | category                                          | user_id (FK)
   | unit                                              | transaction_type
   | price                                             | quantity
   | created_at                                        | transaction_date
   | updated_at                                        | notes

[WAREHOUSES] ----------------< (warehouse_id) >------- [TRANSACTIONS]
   | warehouse_id (PK)                                 | transaction_id (PK)
   | name                                              | product_id (FK)
   | address                                           | warehouse_id (FK)
   | created_at                                        | user_id (FK)
                                                       | transaction_type
                                                       | quantity
                                                       | transaction_date
                                                       | notes
```

---

### 🔗 Penjelasan Relasi
- **Users → Transactions**: setiap transaksi dicatat oleh user tertentu.  
- **Products → Stock**: satu produk bisa ada di banyak gudang dengan jumlah stok berbeda.  
- **Warehouses → Stock**: satu gudang menyimpan banyak produk.  
- **Products → Transactions**: transaksi selalu terkait dengan produk.  
- **Warehouses → Transactions**: transaksi juga terkait dengan lokasi/gudang.  

Dengan teks ERD ini, kamu bisa langsung memvisualisasikan relasi antar tabel tanpa perlu software diagram.  

Apakah kamu ingin saya buatkan **contoh query SQL** sederhana (misalnya untuk menampilkan stok per gudang)?