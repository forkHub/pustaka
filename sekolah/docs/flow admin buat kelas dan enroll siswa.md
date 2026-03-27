## 3) **Flow Admin: Buat Kelas (Rombel) & Enroll Siswa**

```text
== MENU KELAS ==
      |
      v
[Tambah Kelas (X IPA 1)]
      |
      v
 (name, grade_level, homeroom_teacher)
      |
      v
 [Simpan Kelas]--><Valid?>--No-->[Error]-->[Perbaiki]-->[Simpan]
      | Yes
      v
 [Tambah Siswa ke Kelas]
      |
      v
 (Cari siswa) -> [Pilih siswa] -> [Tambah]
      |
      v
 <Duplikasi enrollment?>--Yes-->[Skip/Tampilkan info duplikat]
      | No
      v
 [Simpan Enrollment] --> [Selesai] --x
```

***