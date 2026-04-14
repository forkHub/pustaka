Tentu, berikut penjelasan lengkap mengenai **Category** pada entity **AccountType** dalam modul Finance & Accounting.

***

# ✅ **Apa itu “Category” di AccountType?**

Pada entity **AccountType**, biasanya kita punya 2 level pengelompokan:

1.  **AccountType** = Tipe akun berdasarkan sifatnya  
    (Asset, Liability, Equity, Revenue, Expense)

2.  **Category** = Mengelompokkan tipe akun untuk tujuan **laporan keuangan**  
    (Balance Sheet vs Profit & Loss)

Jadi **Category** digunakan sebagai *class utama* untuk laporan:

*   **Balance Sheet (Neraca)**  
    Untuk akun posisi keuangan (aset, kewajiban, modal).

*   **Profit & Loss (Income Statement / Laba Rugi)**  
    Untuk akun yang menghasilkan profit/loss (pendapatan dan biaya).

***

# ✅ **Kategori Umum pada AccountType**

| AccountType   | Category      | Penjelasan                                              |
| ------------- | ------------- | ------------------------------------------------------- |
| **Asset**     | Balance Sheet | Aset yang dimiliki perusahaan (kas, piutang, inventory) |
| **Liability** | Balance Sheet | Kewajiban perusahaan (hutang usaha, hutang bank)        |
| **Equity**    | Balance Sheet | Modal dan laba ditahan                                  |
| **Revenue**   | Profit & Loss | Pendapatan dari penjualan                               |
| **Expense**   | Profit & Loss | Biaya dan beban operasional                             |

Dengan pemisahan ini, sistem bisa otomatis tahu akun harus masuk ke laporan mana.

***

# ✅ **Contoh Implementasi Category**

Misal tabel AccountType:

| AccountTypeID | Name      | Category      |
| ------------- | --------- | ------------- |
| 1             | Asset     | Balance Sheet |
| 2             | Liability | Balance Sheet |
| 3             | Equity    | Balance Sheet |
| 4             | Revenue   | Profit & Loss |
| 5             | Expense   | Profit & Loss |

Dengan struktur ini:

*   Sistem bisa menyusun laporan **Neraca** dengan mengambil semua akun category = *Balance Sheet*.
*   Sistem bisa menyusun **Laba/Rugi** dengan mengambil category = *Profit & Loss*.

***

# ✅ Kenapa Category Penting?

Dalam aplikasi accounting, Category membantu:

### ✅ 1. **Generate laporan otomatis**

Tanpa perlu mapping manual, karena sudah jelas:

*   BS → Asset + Liability + Equity
*   P\&L → Revenue + Expense

### ✅ 2. **Menentukan perhitungan saldo**

Contoh:

*   Aset dan Biaya biasanya saldo normal **debit**
*   Kewajiban, Modal, Pendapatan saldo normal **credit**

Category → membantu sistem menentukan logika saldo normal.

### ✅ 3. **Memudahkan pembuatan template laporan**

Jika kategori jelas, maka struktur laporan otomatis terbangun.

***

# ✅ Contoh Query Menggunakan Category

### **Neraca (Balance Sheet)**

```sql
SELECT * FROM ChartOfAccount COA
JOIN AccountType AT ON COA.AccountTypeID = AT.AccountTypeID
WHERE AT.Category = 'Balance Sheet';
```

### **Laba Rugi (Profit & Loss)**

```sql
SELECT * FROM ChartOfAccount COA
JOIN AccountType AT ON COA.AccountTypeID = AT.AccountTypeID
WHERE AT.Category = 'Profit & Loss';
```

***

# ✅ Kesimpulan

**Category** pada entity AccountType adalah **pengelompokan level tinggi** untuk memudahkan sistem memisahkan akun ke dalam laporan keuangan utama:

*   **Balance Sheet** → Asset, Liability, Equity
*   **Profit & Loss** → Revenue, Expense

Tanpa Category ini, sistem akan sulit menghasilkan laporan Neraca dan Laba Rugi secara otomatis.

***

Kalau mau, saya bisa lanjutkan dengan:  
✅ struktur tabel SQL lengkap untuk AccountType + CoA  
✅ hubungan AccountType ke Financial Statement Template  
✅ contoh data awal (seed)

Mau lanjut ke bagian mana?
