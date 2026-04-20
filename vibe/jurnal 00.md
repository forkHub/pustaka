Berikut adalah **pembagian entity (domain model)** yang umum dipakai untuk aplikasi sederhana **Finance & Accounting Dasar** yang mencakup:

*   General Ledger
*   Chart of Accounts
*   Automatic Journal Entry (dari PO, SO, GR, Invoice)
*   Basic Financial Statements (Neraca & Laba/Rugi)

Tujuannya: **memastikan sistem mampu mencatat transaksi keuangan secara benar**, namun tetap ringan dan sederhana.

***

# ✅ **1. Gambaran Besar Arsitektur Entity**

Secara umum, modul Finance sederhana biasanya dipecah menjadi 4 kelompok entity utama:

### **A. Master Data (Static Entities)**

*   **ChartOfAccount (CoA)**
*   **AccountType** (Asset, Liability, Equity, Income, Expense)
*   **Currency**

### **B. Transactional Entities (Operational)**

*   **JournalEntry**
*   **JournalEntryLine**

### **C. Integration Entities (Trigger dari modul lain)**

*   **PO (Purchase Order)**
*   **GR (Goods Receipt)**
*   **AP Invoice (Supplier Invoice)**
*   **SO (Sales Order)**
*   **AR Invoice (Customer Invoice)**

### **D. Reporting Entities (Derived Data)**

*   **Trial Balance**
*   **General Ledger View**
*   **Financial Statement Template**

***

# ✅ **2. Entity Detail: Finance Core**

## **(1) ChartOfAccount**

Digunakan untuk mendefinisikan seluruh akun.

| Field            | Deskripsi               |
| ---------------- | ----------------------- |
| `AccountID` (PK) | Unique ID               |
| `AccountCode`    | Misal 1001, 2001        |
| `AccountName`    | Kas, Piutang, Penjualan |
| `AccountTypeID`  | FK → AccountType        |
| `IsActive`       | Status                  |

COA harus minimal memiliki tipe akun: Asset, Liability, Equity, Revenue, Expense.

***

## **(2) AccountType**

Untuk grouping akun.

| Field           | Contoh               |
| --------------- | -------------------- |
| `AccountTypeID` | 1                    |
| `Name`          | Asset                |
| `Category`      | Balance Sheet / P\&L |

***

## **(3) JournalEntry**

Header jurnal.

| Field                       | Deskripsi                           |
| --------------------------- | ----------------------------------- |
| `JournalEntryID`            | PK                                  |
| `Reference`                 | No referensi transaksi (EX: PO-001) |
| `Source`                    | Module: PO, SO, GR, INV             |
| `JournalDate`               | Tanggal posting                     |
| `Description`               | Keterangan                          |
| `TotalDebit`, `TotalCredit` | Validasi                            |

***

## **(4) JournalEntryLine**

Detail jurnal.

| Field                | Deskripsi    |
| -------------------- | ------------ |
| `JournalEntryLineID` | PK           |
| `JournalEntryID`     | FK           |
| `AccountID`          | FK           |
| `Debit`              | Nilai Debit  |
| `Credit`             | Nilai Kredit |

***

# ✅ **3. Integration Entities (untuk Auto-Journal)**

### **(A) Purchase Order (PO)**

Entity minimal:

| Field         | Deskripsi |
| ------------- | --------- |
| `POID`        | Nomor PO  |
| `SupplierID`  | Pemasok   |
| `TotalAmount` | Jumlah PO |

**Tidak memicu jurnal** (umumnya).

***

### **(B) Goods Receipt (GR)**

**Memicu jurnal persediaan**.

Contoh auto-journal:

    Dr Inventory
       Cr GR Clearing / AP Clearing

***

### **(C) AP Invoice**

**Memicu jurnal hutang**.

    Dr Expense / Inventory
       Cr Accounts Payable

***

### **(D) Sales Order (SO)**

SO **tidak memicu jurnal**, hanya AR Invoice memicu jurnal.

***

### **(E) AR Invoice**

**Memicu jurnal piutang & pendapatan**.

    Dr Accounts Receivable
       Cr Sales Revenue

***

# ✅ **4. Reporting Entities (Derived / View Only)**

### **(1) General Ledger (GL View)**

Bukan entity fisik, biasanya berupa VIEW SQL:

| Field             | Dari             |
| ----------------- | ---------------- |
| `AccountID`       | ChartOfAccount   |
| `AccountName`     | ChartOfAccount   |
| `JournalDate`     | JournalEntry     |
| `Debit`, `Credit` | JournalEntryLine |

***

### **(2) Trial Balance**

View untuk akumulasi saldo per akun per periode.

    SELECT AccountID, SUM(Debit) - SUM(Credit) AS Balance
    FROM JournalEntryLine
    GROUP BY AccountID

***

### **(3) Financial Statement Template**

Template akun:

*   Neraca: Asset, Liability, Equity
*   Laba-rugi: Revenue, Expense

Mapping COA → template report.

***

# ✅ **5. ERD Sederhana (Mid-level)**

    ChartOfAccount --< JournalEntryLine >-- JournalEntry

    AccountType --< ChartOfAccount

    PO --(trigger)--> GR --(trigger)--> AP Invoice --(JE AUTO)--> JournalEntry

    SO --(trigger)--> AR Invoice --(JE AUTO)--> JournalEntry

***

# ✅ **6. Saran Pembagian Entity (Versi Sederhana & Efisien)**

Jika ingin **paling minimal**, berikut struktur final:

### ✅ **Master**

*   ChartOfAccount
*   AccountType

### ✅ **Accounting Core**

*   JournalEntry
*   JournalEntryLine

### ✅ **Operational (Optional tapi dibutuhkan untuk auto-journal)**

*   PurchaseOrder
*   GoodsReceipt
*   APInvoice
*   ARInvoice

### ✅ **Reporting (VIEW / materialized)**

*   GL View
*   Trial Balance View
*   FS Template Mapping

***

# ✅ Mau saya buatkan ERD lengkap (diagram), atau sample table SQL untuk implementasi?

Saya bisa buatkan:

✅ SQL table creation  
✅ Diagram ERD visual  
✅ Flow jurnal otomatis (PO → GR → Invoice → JE)  
✅ Struktur API endpoint (jika aplikasinya web)

Tinggal pilih mau yang mana dulu!
