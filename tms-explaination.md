## 📌 Tyre Management System (TMS) — PT Elnusa Petrofin

  ### 1. Ringkasan Proyek (Executive Summary)

  Tyre Management System (TMS) adalah sistem informasi enterprise terintegrasi berbasis web yang dikembangkan khusus
  untuk mendigitalisasi, memonitor, dan mengoptimalkan seluruh siklus hidup (end-to-end lifecycle) aset ban pada
  ratusan armada Mobil Tangki (MT) distribusi BBM milik PT Elnusa Petrofin (Pertamina Group) di seluruh Terminal
  Bahan Bakar Minyak (TBBM / Plant) se-Indonesia.

  Sistem ini memfasilitasi pelacakan fisik dan finansial mulai dari pengadaan ban baru, registrasi nomor emboss seri
  ban, pemasangan pada posisi gandar (wheel axle), pencatatan odometer & GPS, rotasi, perbaikan/tambal, vulkanisir
  (retreading), mutasi antar-depo, hingga proses afkir dan lelang ban bekas.
  ──────
  ### 2. Latar Belakang & Masalah Bisnis (Business Problem)

  • Tingginya Biaya Operasional Ban: Ban merupakan komponen biaya konsumabel terbesar kedua pada armada logistik BBM
  setelah bahan bakar.
  • Kurangnya Visibilitas Siklus Hidup: Sulitnya melacak riwayat pemakaian per ban (cost per kilometer, riwayat
  vulkanisir, dan performa merk ban).
  • Risiko Downtime & Keamanan Jalan: Kegagalan ban di perjalanan dapat mengganggu distribusi energi nasional dan
  menimbulkan risiko fatalitas.
  • Pencatatan Manual Multi-Cabang: Banyaknya TBBM/depo di seluruh Indonesia membutuhkan standardisasi pencatatan
  mutasi stok, justifikasi penggantian dini, dan pelepasan ban afkir.
  ──────
  ### 3. Modul & Fitur Utama Sistem

                                      ┌────────────────────────┐
                                      │   Pengadaan Ban Baru   │
                                      │  (PO, Batch, Penerimaan)│
                                      └───────────┬────────────┘
                                                  │
                                                  ▼
    ┌───────────────────────┐         ┌────────────────────────┐         ┌───────────────────────┐
    │  Rotasi & Tambal Ban  │ ◄─────► │   Pemasangan Ban MT    │ ◄─────► │ Assessment Kondisi Ban│
    │  (Perawatan Berkala)  │         │  (Tracking Posisi Axle)│         │ (Kedalaman Alur/Tread)│
    └───────────────────────┘         └───────────┬────────────┘         └───────────────────────┘
                                                  │
                                                  ▼
    ┌───────────────────────┐         ┌────────────────────────┐         ┌───────────────────────┐
    │ Mutasi Antar-TBBM     │ ◄─────► │  Vulkanisir/Retreading │ ◄─────► │ Penjualan & Lelang    │
    │ (In/Out & Kartu Stok) │         │  (MPR, Vendor PO, GR)  │         │ (Ban Afkir / Scrap)   │
    └───────────────────────┘         └────────────────────────┘         └───────────────────────┘

  1. Master Data & Registrasi Emboss (Serial Identity)
      • Penomoran seri unik (emboss) per ban untuk identifikasi tunggal seumur hidup.
      • Master data spesifikasi ban (Original Radial, Bias, Vulkanisir, ukuran, vendor/pabrikan).
      • Konfigurasi format penomoran ban otomatis per TBBM/Cabang.
  2. Operasional Ban & Wheel Position Management
      • Pemasangan & Pelepasan Ban: Pencatatan posisi ban pada gandar truk (Roda Depan L/R, Gandar Penggerak, Gandar
      Gandengan/Trailer) lengkap dengan pencatatan Odometer pasang/lepas.
      • Rotasi Ban Berkala: Penjadwalan dan pelaksanaan rotasi posisi ban guna meratakan tingkat keausan telapak
      (tread wear).
      • Perbaikan & Tambal Ban: Riwayat perbaikan kebocoran dan tambal ban untuk menjaga kelayakan jalan.
      • Justifikasi & Approval Workflow: Pengajuan persetujuan digital disertai lampiran dokumen jika terjadi
      pelepasan/penggantian ban sebelum target KM tercapai.
  3. Assessment & Monitoring Fisik
      • Perekaman berkala ketebalan telapak (tread depth dalam mm), tekanan angin (PSI), dan visual check kerusakan
      (retak, sobek samping, keausan tidak rata).
      • Fitur upload massal hasil assessment berkala dari teknisi lapangan.
  4. Siklus Vulkanisir Ban (Retreading Pipeline)
      • Workflow pengiriman karkas ban layak ke vendor vulkanisir.
      • Pembuatan MPR (Material Purchase Request) dan PO (Purchase Order) Vulkanisir.
      • Penerimaan hasil vulkanisir dan pembaruan nomor seri serta batas lifespan KM baru.
  5. Mutasi & Manajemen Persediaan (Inventory Movement)
      • Pengajuan transfer/mutasi ban antar-TBBM/Depo (Request, Mutasi Keluar/Tire-Out, dan Mutasi Masuk/Tire-In).
      • Kartu Stok Digital (Stock Card): Buku besar riwayat keluar-masuk ban per item dan lokasi secara real-time.
  6. Penjualan & Lelang Ban Afkir (Disposal)
      • Klasifikasi grade ban yang sudah tidak dapat divulkanisir (Afkir).
      • Pengajuan penjualan limbah ban, matrix approval berjenjang, dan pencatatan lelang scrap ban.
  7. Laporan, Analitik & Audit Log
      • Laporan pemasangan, laporan stok aktif/tersedia per cabang, dan ekspor data Excel/PDF resmi (Surat Perintah
      Kerja).
      • Tracking Cost per Kilometer (CPK) untuk evaluasi performa merk ban.
      • Activity Logging System: Audit trail lengkap mencatat seluruh interaksi pengguna (view, submit, edit,
      download, approval).
  8. Manajemen Hak Akses Berbasis Role (RBAC & Multi-Tenant TBBM)
      • Pengaturan izin akses dinamis tingkat tombol dan menu (view, create, edit, approve, export).
      • Filter otomatis data berdasarkan TBBM yang ditugaskan ke masing-masing pengguna.

  ──────
  ### 4. Arsitektur & Tech Stack

   Layer                   │ Teknologi                             │ Keterangan
  ─────────────────────────┼───────────────────────────────────────┼─────────────────────────────────────────────────
   Frontend Framework      │ Remix.js (React 18, Vite)             │ Server-Side Rendering (SSR) untuk performa
                           │                                       │ tinggi, data loading via loader/action, dan
                           │                                       │ nested routing.
   UI & Styling            │ Tailwind CSS, EPN UI Design System,   │ Desain enterprise modular, konsisten, dan
                           │ Lucide Icons                          │ responsif.
   Backend Framework       │ NestJS (Node.js, TypeScript)          │ Arsitektur modular enterprise-grade dengan
                           │                                       │ Dependency Injection yang scalable.
   Database & ORM          │ PostgreSQL & Prisma ORM               │ Relasional data terstruktur dengan integrasi
                           │                                       │ database operasional armada (MMS/SIOD).
   Autentikasi & Otorisasi │ JWT & Custom RBAC Permission Engine   │ Token session management dengan pembagian hak
                           │                                       │ akses menu/elemen UI granular.
   File & Reporting        │ Multer, PDFKit, ExcelJS / SheetJS     │ Generator laporan otomatis format Excel & PDF
                           │                                       │ untuk operasional harian.
  ──────
  ### 5. Nilai Tambah & Dampak Bisnis (Key Value Delivered)

  • Efisiensi Anggaran Konsumsi Ban: Menekan biaya penggantian ban prematur melalui optimalisasi rotasi dan
  vulkanisir tepat waktu.
  • Transparansi & Akuntabilitas Aset: Mencegah kehilangan atau penukaran ban ilegal berkat pencatatan nomor seri
  emboss unik di setiap pergerakan.
  • Peningkatan Keselamatan Armada: Menjamin seluruh Mobil Tangki beroperasi dengan kondisi ban yang terukur dan
  terinspeksi sesuai standar keselamatan migas.
  • Pengambilan Keputusan Berbasis Data: Manajemen pusat dapat membandingkan efisiensi merk ban dan vendor vulkanisir
  berdasarkan data riil Cost per KM.