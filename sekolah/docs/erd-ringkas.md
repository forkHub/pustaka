> **Catatan desain ERD**:
>
> *   Relasi disusun agar **multi-sekolah (multi-tenant)** dimungkinkan melalui `school_id`.
> *   Gunakan **PostgreSQL** (direkomendasikan untuk FK/constraints yang kuat).
> *   Semua tabel punya `created_at`, `updated_at`, dan `is_active` (soft-delete ringan).
> *   Index dibuat untuk kolom yang sering di-query.

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

## 19 entitas:

1. schools  
2. academic_years  
3. semesters  
4. users  
5. students  
6. teachers  
7. enrollments  
8. class_groups  
9. teaching_assignments  
10. subjects  
11. schedules  
12. attendance  
13. assessments  
14. assessment_items  
15. scores  
16. invoices  
17. payments  
18. announcements  
19. notifications

## **Entitas Utama dan Hubungan**
Berikut penjelasan entitas satu per satu, beserta hubungannya:

1. **schools (Sekolah)**  
   - Entitas utama yang mewakili sekolah.  
   - Hubungan:  
     - `schools (1) ──< academic_years`: Satu sekolah memiliki banyak tahun ajaran (1:many).  
     - `schools ├─< users`: Satu sekolah memiliki banyak pengguna (admin, guru, siswa, orang tua).  
     - `schools ├─< class_groups`: Satu sekolah memiliki banyak kelompok kelas.  
     - `schools ├─< attendance`: Satu sekolah memiliki banyak data kehadiran (untuk siswa dan guru).  
     - `schools ├─< assessments`: Satu sekolah memiliki banyak penilaian.  
     - `schools ├─< invoices`: Satu sekolah memiliki banyak faktur (SPP).  
     - `schools └─< announcements`: Satu sekolah memiliki banyak pengumuman.

2. **academic_years (Tahun Ajaran)**  
   - Mewakili tahun ajaran (misalnya, 2023/2024).  
   - Hubungan:  
     - `academic_years (1) ──< semesters`: Satu tahun ajaran memiliki banyak semester (1:many).

3. **semesters (Semester)**  
   - Mewakili semester dalam satu tahun ajaran (misalnya, Semester 1 atau 2).  
   - Tidak ada hubungan tambahan yang ditunjukkan secara eksplisit di sini, tapi terkait dengan academic_years.

4. **users (Pengguna)**  
   - Mewakili pengguna sistem dengan peran: admin, teacher (guru), student (siswa), parent (orang tua).  
   - Hubungan:  
     - `users ├─ students`: Pengguna siswa memiliki entitas khusus students (1:1 dengan user).  
     - `users └─ teachers`: Pengguna guru memiliki entitas khusus teachers (1:1 dengan user).

5. **students (Siswa)**  
   - Sub-entitas dari users (1:1 dengan user).  
   - Hubungan:  
     - `students ──< enrollments >── class_groups`: Siswa terdaftar (enrollments) ke banyak kelompok kelas (many:many melalui enrollments).

6. **teachers (Guru)**  
   - Sub-entitas dari users (1:1 dengan user).  
   - Hubungan:  
     - `teachers ──< teaching_assignments >── subjects`: Guru ditugaskan (teaching_assignments) untuk mengajar banyak mata pelajaran (many:many melalui teaching_assignments).

7. **enrollments (Pendaftaran)**  
   - Mewakili pendaftaran siswa ke kelas.  
   - Hubungan: Menghubungkan students dan class_groups (many:many).

8. **class_groups (Kelompok Kelas)**  
   - Mewakili kelas atau grup siswa (misalnya, Kelas 1A, 2B).  
   - Hubungan:  
     - `class_groups ──< schedules >── subjects`: Kelas memiliki jadwal (schedules) yang terkait dengan mata pelajaran (many:many melalui schedules).

9. **teaching_assignments (Penugasan Mengajar)**  
   - Mewakili tugas mengajar guru untuk mata pelajaran tertentu.  
   - Hubungan: Menghubungkan teachers dan subjects (many:many).

10. **subjects (Mata Pelajaran)**  
    - Mewakili mata pelajaran (misalnya, Matematika, Bahasa Indonesia).  
    - Terkait dengan schedules dan teaching_assignments.

11. **schedules (Jadwal)**  
    - Mewakili jadwal pelajaran.  
    - Hubungan: Menghubungkan class_groups dan subjects (many:many).

12. **attendance (Kehadiran)**  
    - Mewakili data kehadiran untuk siswa dan guru.  
    - Tidak ada hubungan spesifik yang ditunjukkan, tapi terkait dengan schools.

13. **assessments (Penilaian)**  
    - Mewakili penilaian atau ujian.  
    - Hubungan:  
      - `assessments ──< assessment_items`: Satu penilaian memiliki banyak item penilaian (1:many).  
      - `assessment_items ──< scores`: Item penilaian memiliki banyak skor/nilai (1:many).

14. **assessment_items (Item Penilaian)**  
    - Mewakili bagian dari penilaian (misalnya, soal atau kriteria).  
    - Hubungan: Terkait dengan assessments dan scores.

15. **scores (Nilai)**  
    - Mewakili nilai yang diberikan pada item penilaian.  
    - Terkait dengan assessment_items.

16. **invoices (Faktur/SPP)**  
    - Mewakili faktur pembayaran SPP (uang sekolah).  
    - Hubungan:  
      - `invoices ──< payments`: Satu faktur memiliki banyak pembayaran (1:many).

17. **payments (Pembayaran)**  
    - Mewakili pembayaran untuk faktur.  
    - Terkait dengan invoices.

18. **announcements (Pengumuman)**  
    - Mewakili pengumuman dari sekolah.  
    - Hubungan:  
      - `announcements ──< notifications`: Satu pengumuman memiliki banyak notifikasi (1:many).

19. **notifications (Notifikasi)**  
    - Mewakili notifikasi yang dikirim terkait pengumuman.  
    - Terkait dengan announcements.