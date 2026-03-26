Siap! Berikut **struktur database (ERD + skema SQL)** untuk **MVP Aplikasi Manajemen Sekolah** sesuai fitur minimum yang kita bahas: pengguna, kelas & akademik, absensi, penilaian/rapor sederhana, SPP, pengumuman/notifikasi, dan dashboard ringkas.

> **Catatan desain**:
>
> *   Relasi disusun agar **multi-sekolah (multi-tenant)** dimungkinkan melalui `school_id`.
> *   Gunakan **PostgreSQL** (direkomendasikan untuk FK/constraints yang kuat).
> *   Semua tabel punya `created_at`, `updated_at`, dan `is_active` (soft-delete ringan).
> *   Index dibuat untuk kolom yang sering di-query.

***

## 🧩 Gambaran ERD (ringkas)

    schools (1) ──< academic_years (1) ──< semesters
         │
         ├─< users (roles: admin, teacher, student, parent)
         │      ├─ students (1:1 dgn user) ──< enrollments >── class_groups
         │      └─ teachers (1:1 dgn user) ──< teaching_assignments >── subjects
         │
         ├─< class_groups ──< schedules >── subjects
         │
         ├─< attendance (student & teacher)
         │
         ├─< assessments ──< assessment_items ──< scores
         │
         ├─< invoices (SPP) ──< payments
         │
         └─< announcements ──< notifications

***

## 📚 Tabel Inti & Kolom

### 1) Konteks Sekolah & Tahun Ajaran

*   **schools**
    *   `id (PK)`, `name`, `address`, `phone`, `email`, `is_active`, timestamps
*   **academic\_years**
    *   `id (PK)`, `school_id (FK)`, `name` (mis: 2025/2026), `start_date`, `end_date`, `is_active`
*   **semesters**
    *   `id (PK)`, `school_id (FK)`, `academic_year_id (FK)`, `name` (Ganjil/Genap), `start_date`, `end_date`, `is_active`

### 2) Pengguna & Peran

*   **users**
    *   `id (PK)`, `school_id (FK)`, `full_name`, `email (UNIQUE)`, `phone`, `password_hash`, `role` (`admin|teacher|student|parent`), `is_active`
*   **students**
    *   `id (PK)`, `user_id (FK UNIQUE)`, `nisn (UNIQUE? opsional)`, `birth_date`, `gender`, `guardian_name`, `address`
*   **teachers**
    *   `id (PK)`, `user_id (FK UNIQUE)`, `employee_no (UNIQUE?)`, `expertise`, `hire_date`

> **Opsional**: **parents** (jika ingin akun ortu sejak awal) dan **user\_parent\_links** (many-to-many parent–student).

### 3) Akademik: Kelas, Jadwal, Mapel

*   **subjects**
    *   `id (PK)`, `school_id (FK)`, `code`, `name`, `kkm` (nilai ketuntasan), `is_active`
*   **class\_groups**
    *   `id (PK)`, `school_id (FK)`, `name` (mis: X IPA 1), `grade_level`, `homeroom_teacher_id (FK teachers)`, `is_active`
*   **enrollments** (keanggotaan siswa di kelas per semester)
    *   `id (PK)`, `school_id (FK)`, `student_id (FK)`, `class_group_id (FK)`, `semester_id (FK)`, `status (active|moved|graduated)`, `unique(student_id, semester_id)`
*   **schedules** (jadwal pelajaran)
    *   `id (PK)`, `school_id (FK)`, `class_group_id (FK)`, `subject_id (FK)`, `teacher_id (FK)`, `day_of_week (1-7)`, `start_time`, `end_time`, `room`, `semester_id (FK)`
*   **teaching\_assignments** (mengajar mapel ke kelas)
    *   `id (PK)`, `school_id (FK)`, `teacher_id (FK)`, `subject_id (FK)`, `class_group_id (FK)`, `semester_id (FK)`, `unique(teacher_id, subject_id, class_group_id, semester_id)`

### 4) Absensi

*   **student\_attendance**
    *   `id (PK)`, `school_id (FK)`, `student_id (FK)`, `class_group_id (FK)`, `date`, `status (present|sick|permit|absent)`, `note`, `unique(student_id, date, class_group_id)`
*   **teacher\_attendance**
    *   `id (PK)`, `school_id (FK)`, `teacher_id (FK)`, `date`, `status`, `note`, `unique(teacher_id, date)`

### 5) Penilaian & Rapor Sederhana

*   **assessments** (satu entitas penilaian: UH, Tugas, PTS, PAS)
    *   `id (PK)`, `school_id (FK)`, `title`, `type (quiz|assignment|mid|final)`, `subject_id (FK)`, `class_group_id (FK)`, `teacher_id (FK)`, `semester_id (FK)`, `max_score (default 100)`, `weight (0-1)`, `date`
*   **scores** (nilai per siswa pada assessment)
    *   `id (PK)`, `school_id (FK)`, `assessment_id (FK)`, `student_id (FK)`, `score NUMERIC(5,2)`, `note`, `unique(assessment_id, student_id)`

> **Rapor** bisa dihitung dari agregasi `scores` per `subject_id` & `student_id` dengan bobot. Jika ingin simpan hasil akhir:

*   **report\_cards** (opsional cache hasil rapor)
    *   `id (PK)`, `school_id`, `student_id`, `semester_id`, `subject_id`, `final_score`, `grade`, `unique(student_id, semester_id, subject_id)`

### 6) Keuangan SPP (MVP)

*   **fee\_definitions** (daftar tagihan, misal SPP bulanan)
    *   `id (PK)`, `school_id (FK)`, `name`, `amount`, `frequency (monthly|one_time)`, `is_active`
*   **invoices** (tagihan per siswa)
    *   `id (PK)`, `school_id (FK)`, `student_id (FK)`, `fee_definition_id (FK)`, `invoice_no (UNIQUE)`, `issue_date`, `due_date`, `amount`, `status (unpaid|partial|paid)`
*   **payments**
    *   `id (PK)`, `school_id (FK)`, `invoice_id (FK)`, `payment_date`, `amount`, `method (cash|transfer|gateway)`, `reference_no`, `note`

### 7) Pengumuman & Notifikasi

*   **announcements**
    *   `id (PK)`, `school_id (FK)`, `title`, `content`, `audience (all|students|teachers|class:<id>)`, `published_at`, `created_by (FK users)`
*   **notifications** (log pengiriman)
    *   `id (PK)`, `school_id (FK)`, `user_id (FK)`, `announcement_id (FK NULLABLE)`, `channel (inapp|email|wa)`, `status (queued|sent|failed)`, `sent_at`, `payload`

***

## 🛠️ Skema SQL (PostgreSQL)

> **Kamu bisa copy-paste langsung** untuk memulai. Silakan sesuaikan tipe & panjang kolom sesuai kebutuhan.

```sql
-- =========================================
-- 1) Konfigurasi dasar
-- =========================================
CREATE TYPE role_type AS ENUM ('admin', 'teacher', 'student', 'parent');
CREATE TYPE attendance_status AS ENUM ('present', 'sick', 'permit', 'absent');
CREATE TYPE assessment_type AS ENUM ('quiz', 'assignment', 'mid', 'final');
CREATE TYPE invoice_status AS ENUM ('unpaid', 'partial', 'paid');
CREATE TYPE fee_frequency AS ENUM ('monthly', 'one_time');

-- =========================================
-- 2) Master Sekolah & Akademik
-- =========================================
CREATE TABLE schools (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  address TEXT,
  phone VARCHAR(50),
  email VARCHAR(150),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE academic_years (
  id BIGSERIAL PRIMARY KEY,
  school_id BIGINT NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(20) NOT NULL, -- e.g. 2025/2026
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE semesters (
  id BIGSERIAL PRIMARY KEY,
  school_id BIGINT NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  academic_year_id BIGINT NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  name VARCHAR(20) NOT NULL, -- Ganjil/Genap
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- =========================================
-- 3) Users & Roles
-- =========================================
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  school_id BIGINT NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  full_name VARCHAR(200) NOT NULL,
  email VARCHAR(150) UNIQUE,
  phone VARCHAR(50),
  password_hash TEXT NOT NULL,
  role role_type NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE students (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  nisn VARCHAR(30) UNIQUE,
  birth_date DATE,
  gender VARCHAR(10),
  guardian_name VARCHAR(200),
  address TEXT
);

CREATE TABLE teachers (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  employee_no VARCHAR(50) UNIQUE,
  expertise VARCHAR(200),
  hire_date DATE
);

-- =========================================
-- 4) Akademik: Mapel, Kelas, Jadwal
-- =========================================
CREATE TABLE subjects (
  id BIGSERIAL PRIMARY KEY,
  school_id BIGINT NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  code VARCHAR(50),
  name VARCHAR(200) NOT NULL,
  kkm NUMERIC(5,2) DEFAULT 75.00,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE class_groups (
  id BIGSERIAL PRIMARY KEY,
  school_id BIGINT NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL, -- X IPA 1
  grade_level SMALLINT NOT NULL,
  homeroom_teacher_id BIGINT REFERENCES teachers(id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE enrollments (
  id BIGSERIAL PRIMARY KEY,
  school_id BIGINT NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id BIGINT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  class_group_id BIGINT NOT NULL REFERENCES class_groups(id) ON DELETE CASCADE,
  semester_id BIGINT NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_enrollment UNIQUE (student_id, semester_id)
);

CREATE TABLE teaching_assignments (
  id BIGSERIAL PRIMARY KEY,
  school_id BIGINT NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  teacher_id BIGINT NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  subject_id BIGINT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  class_group_id BIGINT NOT NULL REFERENCES class_groups(id) ON DELETE CASCADE,
  semester_id BIGINT NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_teach_assign UNIQUE (teacher_id, subject_id, class_group_id, semester_id)
);

CREATE TABLE schedules (
  id BIGSERIAL PRIMARY KEY,
  school_id BIGINT NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  class_group_id BIGINT NOT NULL REFERENCES class_groups(id) ON DELETE CASCADE,
  subject_id BIGINT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  teacher_id BIGINT NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  semester_id BIGINT NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
  day_of_week SMALLINT NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  room VARCHAR(50),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (end_time > start_time)
);

-- =========================================
-- 5) Absensi
-- =========================================
CREATE TABLE student_attendance (
  id BIGSERIAL PRIMARY KEY,
  school_id BIGINT NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id BIGINT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  class_group_id BIGINT NOT NULL REFERENCES class_groups(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status attendance_status NOT NULL,
  note TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_student_att UNIQUE (student_id, class_group_id, date)
);

CREATE TABLE teacher_attendance (
  id BIGSERIAL PRIMARY KEY,
  school_id BIGINT NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  teacher_id BIGINT NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status attendance_status NOT NULL,
  note TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_teacher_att UNIQUE (teacher_id, date)
);

-- =========================================
-- 6) Penilaian
-- =========================================
CREATE TABLE assessments (
  id BIGSERIAL PRIMARY KEY,
  school_id BIGINT NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  type assessment_type NOT NULL,
  subject_id BIGINT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  class_group_id BIGINT NOT NULL REFERENCES class_groups(id) ON DELETE CASCADE,
  teacher_id BIGINT NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  semester_id BIGINT NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
  max_score NUMERIC(6,2) DEFAULT 100.00,
  weight NUMERIC(4,3) DEFAULT 0.100, -- 0..1
  date DATE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE scores (
  id BIGSERIAL PRIMARY KEY,
  school_id BIGINT NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  assessment_id BIGINT NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  student_id BIGINT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  score NUMERIC(6,2) NOT NULL CHECK (score >= 0),
  note TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_score UNIQUE (assessment_id, student_id)
);

-- Opsional cache rapor
CREATE TABLE report_cards (
  id BIGSERIAL PRIMARY KEY,
  school_id BIGINT NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id BIGINT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  semester_id BIGINT NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
  subject_id BIGINT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  final_score NUMERIC(6,2),
  grade VARCHAR(2),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_report UNIQUE (student_id, semester_id, subject_id)
);

-- =========================================
-- 7) Keuangan SPP
-- =========================================
CREATE TABLE fee_definitions (
  id BIGSERIAL PRIMARY KEY,
  school_id BIGINT NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  amount NUMERIC(12,2) NOT NULL CHECK (amount >= 0),
  frequency fee_frequency NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE invoices (
  id BIGSERIAL PRIMARY KEY,
  school_id BIGINT NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id BIGINT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  fee_definition_id BIGINT NOT NULL REFERENCES fee_definitions(id),
  invoice_no VARCHAR(50) NOT NULL UNIQUE,
  issue_date DATE NOT NULL,
  due_date DATE,
  amount NUMERIC(12,2) NOT NULL CHECK (amount >= 0),
  status invoice_status NOT NULL DEFAULT 'unpaid',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE payments (
  id BIGSERIAL PRIMARY KEY,
  school_id BIGINT NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  invoice_id BIGINT NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  payment_date DATE NOT NULL,
  amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  method VARCHAR(30) NOT NULL, -- cash|transfer|gateway
  reference_no VARCHAR(100),
  note TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- =========================================
-- 8) Pengumuman & Notifikasi
-- =========================================
CREATE TABLE announcements (
  id BIGSERIAL PRIMARY KEY,
  school_id BIGINT NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  audience VARCHAR(50) NOT NULL, -- all|students|teachers|class:<id>
  published_at TIMESTAMP,
  created_by BIGINT NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE notifications (
  id BIGSERIAL PRIMARY KEY,
  school_id BIGINT NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  announcement_id BIGINT REFERENCES announcements(id) ON DELETE SET NULL,
  channel VARCHAR(20) NOT NULL, -- inapp|email|wa
  status VARCHAR(20) NOT NULL,  -- queued|sent|failed
  sent_at TIMESTAMP,
  payload JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- =========================================
-- 9) Index yang berguna
-- =========================================
CREATE INDEX idx_users_school_role ON users(school_id, role);
CREATE INDEX idx_enrollments_student_sem ON enrollments(student_id, semester_id);
CREATE INDEX idx_schedules_class_day ON schedules(class_group_id, day_of_week);
CREATE INDEX idx_scores_assessment ON scores(assessment_id);
CREATE INDEX idx_invoices_student_status ON invoices(student_id, status);
CREATE INDEX idx_payments_invoice ON payments(invoice_id);
CREATE INDEX idx_attendance_student_date ON student_attendance(student_id, date);
```

***

## 🔎 Contoh Query Biasa Dipakai (Dashboard/Operasional)

```sql
-- 1) Rekap kehadiran siswa per bulan
SELECT s.id AS student_id, u.full_name,
       DATE_TRUNC('month', sa.date) AS month,
       SUM((sa.status = 'present')::int) AS hadir,
       SUM((sa.status = 'sick')::int) AS sakit,
       SUM((sa.status = 'permit')::int) AS izin,
       SUM((sa.status = 'absent')::int) AS alpha
FROM student_attendance sa
JOIN students s ON s.id = sa.student_id
JOIN users u ON u.id = s.user_id
WHERE sa.school_id = $1
  AND sa.date BETWEEN $2 AND $3
GROUP BY s.id, u.full_name, DATE_TRUNC('month', sa.date);

-- 2) Nilai akhir per siswa per mapel (berdasarkan bobot assessment)
SELECT sc.student_id, a.subject_id,
       ROUND(SUM(sc.score * a.weight) / NULLIF(SUM(a.weight),0), 2) AS final_score
FROM scores sc
JOIN assessments a ON a.id = sc.assessment_id
WHERE a.school_id = $1 AND a.semester_id = $2 AND a.class_group_id = $3
GROUP BY sc.student_id, a.subject_id;

-- 3) Outstanding SPP per siswa
SELECT inv.student_id,
       SUM(inv.amount) - COALESCE(SUM(p.amount),0) AS outstanding
FROM invoices inv
LEFT JOIN payments p ON p.invoice_id = inv.id
WHERE inv.school_id = $1
GROUP BY inv.student_id
HAVING SUM(inv.amount) - COALESCE(SUM(p.amount),0) > 0
ORDER BY outstanding DESC;

-- 4) Jadwal kelas hari ini
SELECT sch.*, sub.name AS subject_name, u.full_name AS teacher_name
FROM schedules sch
JOIN subjects sub ON sub.id = sch.subject_id
JOIN teachers t ON t.id = sch.teacher_id
JOIN users u ON u.id = t.user_id
WHERE sch.school_id = $1
  AND sch.class_group_id = $2
  AND sch.semester_id = $3
  AND sch.day_of_week = EXTRACT(ISODOW FROM CURRENT_DATE)
ORDER BY sch.start_time;
```

***

## 🧱 Pertimbangan Desain & Skalabilitas

*   **Multi-tenant**: hampir semua tabel punya `school_id` → memudahkan isolasi data per sekolah.
*   **Integritas**: gunakan FK dan `UNIQUE` untuk mencegah duplikasi (mis. `enrollments`, `scores`, `invoices`).
*   **Audit ringan**: `created_at/updated_at`. Jika perlu jejak lengkap, tambahkan **audit\_log**.
*   **Soft-delete**: `is_active` pada master; untuk data transaksi, lebih aman **tidak** hapus, tapi ubah status.
*   **Performance**: tambahkan index sesuai pola query aktual (monitor dengan `EXPLAIN ANALYZE`).
*   **Ekstensi ke depan**:
    *   E-learning → tabel `materials`, `assignments`, `submissions`.
    *   CBT/Ujian → `exams`, `exam_items`, `exam_attempts`, `exam_answers`.
    *   Integrasi WA/email → worker & status di `notifications`.
    *   Fingerprint → simpan `device_id`, log presensi, atau event ke `student_attendance`.

***

## ✅ Langkah Lanjut

Saya bisa bantu:

1.  **Generate migration** (SQL terpisah per tabel) untuk Flyway/Liquibase.
2.  **Seed data** (role admin, tahun ajar awal, semester ganjil, contoh kelas).
3.  **Query API-ready** (CTE untuk rapor & rekap pembayaran).
4.  **Optimasi untuk MySQL** jika stack kamu bukan PostgreSQL.

**Mau kita sesuaikan dengan kurikulum (mis. Kurikulum Merdeka: proyek, sikap, ekstrakurikuler) atau langsung bikinin ERD diagram (PNG/SVG) + seed data?**
