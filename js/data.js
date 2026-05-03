// =============================================================
// data.js - Data dummy untuk Aplikasi SITTA
// Universitas Terbuka - Tugas Praktik 1 STSI4209
// =============================================================

var dataPengguna = [
  {
    id: 1,
    nama: "Rina Wulandari",
    email: "rina@ut.ac.id",
    password: "rina123",
    role: "UPBJJ-UT",
    lokasi: "UPBJJ Jakarta"
  },
  {
    id: 2,
    nama: "Agus Pranoto",
    email: "agus@ut.ac.id",
    password: "agus123",
    role: "UPBJJ-UT",
    lokasi: "UPBJJ Makassar"
  },
  {
    id: 3,
    nama: "Siti Marlina",
    email: "siti@ut.ac.id",
    password: "siti123",
    role: "Puslaba",
    lokasi: "Pusat"
  },
  {
    id: 4,
    nama: "Doni Setiawan",
    email: "doni@ut.ac.id",
    password: "doni123",
    role: "Fakultas",
    lokasi: "FISIP"
  },
  {
    id: 5,
    nama: "Admin SITTA",
    email: "admin@ut.ac.id",
    password: "admin123",
    role: "Administrator",
    lokasi: "Pusat"
  }
];

var dataBahanAjar = [
  {
    kodeLokasi: "0TMP01",
    kodeBarang: "ASIP4301",
    namaBarang: "Pengantar Ilmu Komunikasi",
    jenisBarang: "BMP",
    edisi: "2",
    stok: 548,
    cover: "assets/img/pengantar_komunikasi.jpg"
  },
  {
    kodeLokasi: "0JKT01",
    kodeBarang: "EKMA4216",
    namaBarang: "Manajemen Keuangan",
    jenisBarang: "BMP",
    edisi: "3",
    stok: 392,
    cover: "assets/img/manajemen_keuangan.jpg"
  },
  {
    kodeLokasi: "0SBY02",
    kodeBarang: "EKMA4310",
    namaBarang: "Kepemimpinan",
    jenisBarang: "BMP",
    edisi: "1",
    stok: 278,
    cover: "assets/img/kepemimpinan.jpg"
  },
  {
    kodeLokasi: "0MLG01",
    kodeBarang: "BIOL4211",
    namaBarang: "Mikrobiologi Dasar",
    jenisBarang: "BMP",
    edisi: "2",
    stok: 165,
    cover: "assets/img/mikrobiologi.jpg"
  },
  {
    kodeLokasi: "0UPBJJBDG",
    kodeBarang: "PAUD4401",
    namaBarang: "Perkembangan Anak Usia Dini",
    jenisBarang: "BMP",
    edisi: "4",
    stok: 204,
    cover: "assets/img/paud_perkembangan.jpg"
  }
];

var dataTracking = {
  "2023001234": {
    nomorDO: "2023001234",
    nama: "Rina Wulandari",
    status: "Dalam Perjalanan",
    ekspedisi: "JNE",
    tanggalKirim: "2025-08-25",
    paket: "0JKT01",
    total: "Rp 180.000",
    perjalanan: [
      {
        waktu: "2025-08-25 10:12:20",
        keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
      },
      {
        waktu: "2025-08-25 14:07:56",
        keterangan: "Tiba di Hub: TANGERANG SELATAN"
      },
      {
        waktu: "2025-08-25 18:30:00",
        keterangan: "Diteruskan ke Kantor Jakarta Selatan"
      }
    ]
  },
  "2023005678": {
    nomorDO: "2023005678",
    nama: "Agus Pranoto",
    status: "Dikirim",
    ekspedisi: "Pos Indonesia",
    tanggalKirim: "2025-08-25",
    paket: "0UPBJJBDG",
    total: "Rp 220.000",
    perjalanan: [
      {
        waktu: "2025-08-25 10:12:20",
        keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
      },
      {
        waktu: "2025-08-25 14:07:56",
        keterangan: "Tiba di Hub: TANGERANG SELATAN"
      },
      {
        waktu: "2025-08-25 16:30:10",
        keterangan: "Diteruskan ke Kantor Kota Bandung"
      },
      {
        waktu: "2025-08-26 12:15:33",
        keterangan: "Tiba di Hub: Kota BANDUNG"
      },
      {
        waktu: "2025-08-26 15:06:12",
        keterangan: "Proses antar ke Cimahi"
      },
      {
        waktu: "2025-08-26 20:00:00",
        keterangan: "Selesai Antar. Penerima: Agus Pranoto"
      }
    ]
  }
};

// Data tambahan untuk laporan & histori (kreativitas)
var dataHistori = [
  { tanggal: "2025-08-20", nomorDO: "2023001234", upbjj: "UPBJJ Jakarta",   kodeBarang: "EKMA4216", jumlah: 50, total: "Rp 180.000", status: "Selesai" },
  { tanggal: "2025-08-21", nomorDO: "2023005678", upbjj: "UPBJJ Bandung",   kodeBarang: "PAUD4401", jumlah: 40, total: "Rp 220.000", status: "Dikirim" },
  { tanggal: "2025-08-22", nomorDO: "2023007890", upbjj: "UPBJJ Surabaya",  kodeBarang: "EKMA4310", jumlah: 35, total: "Rp 150.000", status: "Diproses" },
  { tanggal: "2025-08-23", nomorDO: "2023008901", upbjj: "UPBJJ Makassar",  kodeBarang: "BIOL4211", jumlah: 25, total: "Rp 110.000", status: "Selesai" },
  { tanggal: "2025-08-24", nomorDO: "2023009012", upbjj: "UPBJJ Medan",     kodeBarang: "ASIP4301", jumlah: 60, total: "Rp 240.000", status: "Dikirim" }
];

var dataMonitoringDO = [
  { nomorDO: "2023001234", upbjj: "UPBJJ Jakarta",  progress: 65, status: "Dalam Perjalanan" },
  { nomorDO: "2023005678", upbjj: "UPBJJ Bandung",  progress: 100, status: "Selesai" },
  { nomorDO: "2023007890", upbjj: "UPBJJ Surabaya", progress: 30, status: "Diproses" },
  { nomorDO: "2023008901", upbjj: "UPBJJ Makassar", progress: 85, status: "Dalam Perjalanan" },
  { nomorDO: "2023009012", upbjj: "UPBJJ Medan",    progress: 50, status: "Dikirim" }
];
