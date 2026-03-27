## 📚 Tabel Inti & Kolom

### 1) Konteks Sekolah & Tahun Ajaran

*   **schools**
    - id (PK)
    - name
    - address
    - phone
    - email
    - is_active
    - created_at, updated_at
*   **academic_years**
    - id (PK)
    - school_id (FK)
    - name (mis: 2025/2026)
    - start_date
    - end_date
    - is_active
    - created_at, updated_at
*   **semesters**
    - id (PK)
    - school_id (FK)
    - academic_year_id (FK)
    - name (Ganjil/Genap)
    - start_date
    - end_date
    - is_active
    - created_at, updated_at

### 2) Pengguna & Peran

*   **users**
    - id (PK)
    - school_id (FK)
    - full_name
    - email (UNIQUE)
    - phone
    - password_hash
    - role (admin|teacher|student|parent)
    - is_active
    - created_at, updated_at
*   **students**
    - id (PK)
    - user_id (FK UNIQUE)
    - nisn (UNIQUE? opsional)
    - birth_date
    - gender
    - guardian_name
    - address
*   **teachers**
    - id (PK)
    - user_id (FK UNIQUE)
    - employee_no (UNIQUE?)
    - expertise
    - hire_date

> **Opsional**: **parents** (jika ingin akun ortu sejak awal) dan **user_parent_links** (many-to-many parent–student).

### 3) Akademik: Kelas, Jadwal, Mapel

*   **subjects**
    - id (PK)
    - school_id (FK)
    - code
    - name
    - kkm (nilai ketuntasan)
    - is_active
    - created_at, updated_at
*   **class_groups**
    - id (PK)
    - school_id (FK)
    - name (mis: X IPA 1)
    - grade_level
    - homeroom_teacher_id (FK teachers)
    - is_active
    - created_at, updated_at
*   **enrollments** (keanggotaan siswa di kelas per semester)
    - id (PK)
    - school_id (FK)
    - student_id (FK)
    - class_group_id (FK)
    - semester_id (FK)
    - status (active|moved|graduated)
    - created_at, updated_at
    - unique(student_id, semester_id)
*   **schedules** (jadwal pelajaran)
    - id (PK)
    - school_id (FK)
    - class_group_id (FK)
    - subject_id (FK)
    - teacher_id (FK)
    - day_of_week (1-7)
    - start_time
    - end_time
    - room
    - semester_id (FK)
    - created_at, updated_at
*   **teaching_assignments** (mengajar mapel ke kelas)
    - id (PK)
    - school_id (FK)
    - teacher_id (FK)
    - subject_id (FK)
    - class_group_id (FK)
    - semester_id (FK)
    - unique(teacher_id, subject_id, class_group_id, semester_id)
    - created_at, updated_at

### 4) Absensi

*   **student_attendance**
    - id (PK)
    - school_id (FK)
    - student_id (FK)
    - class_group_id (FK)
    - date
    - status (present|sick|permit|absent)
    - note
    - created_at, updated_at
    - unique(student_id, date, class_group_id)
*   **teacher_attendance**
    - id (PK)
    - school_id (FK)
    - teacher_id (FK)
    - date
    - status
    - note
    - created_at, updated_at
    - unique(teacher_id, date)

### 5) Penilaian & Rapor Sederhana

*   **assessments** (satu entitas penilaian: UH, Tugas, PTS, PAS)
    - id (PK)
    - school_id (FK)
    - title
    - type (quiz|assignment|mid|final)
    - subject_id (FK)
    - class_group_id (FK)
    - teacher_id (FK)
    - semester_id (FK)
    - max_score (default 100)
    - weight (0-1)
    - date
    - created_at, updated_at
*   **scores** (nilai per siswa pada assessment)
    - id (PK)
    - school_id (FK)
    - assessment_id (FK)
    - student_id (FK)
    - score NUMERIC(5,2)
    - note
    - created_at, updated_at
    - unique(assessment_id, student_id)

> **Rapor** bisa dihitung dari agregasi `scores` per `subject_id` & `student_id` dengan bobot. Jika ingin simpan hasil akhir:

*   **report_cards** (opsional cache hasil rapor)
    - id (PK)
    - school_id
    - student_id
    - semester_id
    - subject_id
    - final_score
    - grade
    - unique(student_id, semester_id, subject_id)

### 6) Keuangan SPP (MVP)

*   **fee_definitions** (daftar tagihan, misal SPP bulanan)
    - id (PK)
    - school_id (FK)
    - name
    - amount
    - frequency (monthly|one_time)
    - is_active
    - created_at, updated_at
*   **invoices** (tagihan per siswa)
    - id (PK)
    - school_id (FK)
    - student_id (FK)
    - fee_definition_id (FK)
    - invoice_no (UNIQUE)
    - issue_date
    - due_date
    - amount
    - status (unpaid|partial|paid)
    - created_at, updated_at
*   **payments**
    - id (PK)
    - school_id (FK)
    - invoice_id (FK)
    - payment_date
    - amount
    - method (cash|transfer|gateway)
    - reference_no
    - note
    - created_at, updated_at

### 7) Pengumuman & Notifikasi

*   **announcements**
    - id (PK)
    - school_id (FK)
    - title
    - content
    - audience (all|students|teachers|class:<id>)
    - published_at
    - created_by (FK users)
    - created_at, updated_at
*   **notifications** (log pengiriman)
    - id (PK)
    - school_id (FK)
    - user_id (FK)
    - announcement_id (FK NULLABLE)
    - channel (inapp|email|wa)
    - status (queued|sent|failed)
    - sent_at
    - payload
    - created_at, updated_at

***

