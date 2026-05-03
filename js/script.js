/* -------------------------------------------------------------
   1. UTILITAS UMUM
------------------------------------------------------------- */


function getGreeting() {
  var jam = new Date().getHours();
  if (jam >= 4  && jam < 11) return { teks: "Selamat Pagi",  emoji: "🌅" };
  if (jam >= 11 && jam < 15) return { teks: "Selamat Siang", emoji: "☀️" };
  if (jam >= 15 && jam < 18) return { teks: "Selamat Sore",  emoji: "🌇" };
  return { teks: "Selamat Malam", emoji: "🌙" };
}


function bukaModal(idModal) {
  var modal = document.getElementById(idModal);
  if (modal) modal.classList.add("active");
}
function tutupModal(idModal) {
  var modal = document.getElementById(idModal);
  if (modal) modal.classList.remove("active");
}

document.addEventListener("click", function (e) {
  if (e.target.classList && e.target.classList.contains("modal-overlay")) {
    e.target.classList.remove("active");
  }
});


document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    var aktif = document.querySelectorAll(".modal-overlay.active");
    aktif.forEach(function (m) { m.classList.remove("active"); });
  }
});

// Cek apakah pengguna sudah login 
function cekLogin() {
  var user = sessionStorage.getItem("sittaUser");
  if (!user) {
    alert("Anda belum login. Silakan login terlebih dahulu.");
    window.location.href = "index.html";
    return null;
  }
  return JSON.parse(user);
}

// Logout
function logout() {
  if (confirm("Apakah Anda yakin ingin keluar?")) {
    sessionStorage.removeItem("sittaUser");
    window.location.href = "index.html";
  }
}

/* -------------------------------------------------------------
   2. HALAMAN LOGIN
------------------------------------------------------------- */

function inisialisasiLogin() {
  var formLogin = document.getElementById("formLogin");
  if (!formLogin) return;

  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    var email    = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value.trim();

    // Validasi field kosong
    if (email === "" || password === "") {
      alert("⚠️ Email dan password tidak boleh kosong!");
      return;
    }

    // Validasi format email
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      alert("⚠️ Format email tidak valid. Contoh: nama@ut.ac.id");
      return;
    }

    // Inquiry Check
    var penggunaCocok = dataPengguna.find(function (u) {
      return u.email === email && u.password === password;
    });

    if (!penggunaCocok) {
      alert("❌ Email/password yang Anda masukkan salah!");
      return;
    }

    // Session -> Dashboard
    sessionStorage.setItem("sittaUser", JSON.stringify(penggunaCocok));
    alert("✅ Login berhasil. Selamat datang, " + penggunaCocok.nama + "!");
    window.location.href = "dashboard.html";
  });


  var btnLupa  = document.getElementById("btnLupa");
  var btnDaftar = document.getElementById("btnDaftar");
  if (btnLupa)   btnLupa.addEventListener("click",   function () { bukaModal("modalLupa"); });
  if (btnDaftar) btnDaftar.addEventListener("click", function () { bukaModal("modalDaftar"); });

  // lupa password (simulasi)
  var formLupa = document.getElementById("formLupa");
  if (formLupa) {
    formLupa.addEventListener("submit", function (e) {
      e.preventDefault();
      var emailLupa = document.getElementById("emailLupa").value.trim();
      if (emailLupa === "") {
        alert("⚠️ Mohon isi email Anda.");
        return;
      }
      alert("📧 Tautan reset password telah dikirim ke " + emailLupa + " (simulasi).");
      tutupModal("modalLupa");
      formLupa.reset();
    });
  }

  // daftar (simulasi)
  var formDaftar = document.getElementById("formDaftar");
  if (formDaftar) {
    formDaftar.addEventListener("submit", function (e) {
      e.preventDefault();
      var nama  = document.getElementById("namaDaftar").value.trim();
      var email = document.getElementById("emailDaftar").value.trim();
      var pass  = document.getElementById("passDaftar").value.trim();

      if (nama === "" || email === "" || pass === "") {
        alert("⚠️ Semua field wajib diisi.");
        return;
      }
      if (pass.length < 6) {
        alert("⚠️ Password minimal 6 karakter.");
        return;
      }
      alert("✅ Pendaftaran berhasil! Akun Anda akan diverifikasi oleh admin (simulasi).");
      tutupModal("modalDaftar");
      formDaftar.reset();
    });
  }
}

/* -------------------------------------------------------------
   3. HALAMAN DASHBOARD 
------------------------------------------------------------- */

function inisialisasiDashboard() {
  var greetingEl = document.getElementById("greetingTeks");
  if (!greetingEl) return;

  var user = cekLogin();
  if (!user) return;

  var sapaan = getGreeting();
  greetingEl.innerHTML = sapaan.emoji + " " + sapaan.teks + ", <strong>" + user.nama + "</strong>!";

  var lokasiEl = document.getElementById("greetingLokasi");
  if (lokasiEl) {
    lokasiEl.textContent = user.role + " - " + user.lokasi;
  }

  // Statistik 
  var totalStokEl = document.getElementById("totalStok");
  var totalDOEl   = document.getElementById("totalDO");
  var totalBahanEl = document.getElementById("totalBahan");

  if (totalStokEl) {
    var totalStok = dataBahanAjar.reduce(function (s, b) { return s + b.stok; }, 0);
    totalStokEl.textContent = totalStok.toLocaleString("id-ID");
  }
  if (totalDOEl)    totalDOEl.textContent    = Object.keys(dataTracking).length;
  if (totalBahanEl) totalBahanEl.textContent = dataBahanAjar.length;
}

/* -------------------------------------------------------------
   4. HALAMAN TRACKING 
------------------------------------------------------------- */

function inisialisasiTracking() {
  var formCari = document.getElementById("formCariDO");
  if (!formCari) return;

  cekLogin();

  formCari.addEventListener("submit", function (e) {
    e.preventDefault();
    var nomor = document.getElementById("nomorDO").value.trim();
    var hasilEl = document.getElementById("hasilTracking");

    if (nomor === "") {
      alert("⚠️ Nomor Delivery Order tidak boleh kosong!");
      return;
    }

    var data = dataTracking[nomor];
    if (!data) {
      hasilEl.innerHTML =
        '<div class="empty-state">' +
        '  <div class="emoji">🔎</div>' +
        '  <p>Nomor DO <strong>' + nomor + '</strong> tidak ditemukan.</p>' +
        '  <p style="font-size:12px;margin-top:6px;">Coba: 2023001234 atau 2023005678</p>' +
        '</div>';
      return;
    }

    // kelas badge
    var kelasBadge = "badge-info";
    if (data.status === "Selesai")          kelasBadge = "badge-success";
    if (data.status === "Dikirim")          kelasBadge = "badge-warning";
    if (data.status === "Dalam Perjalanan") kelasBadge = "badge-info";

    // Hitung progress
    var totalLangkah = data.perjalanan.length;
    var langkahMaks  = 6; 
    var persen = Math.min(100, Math.round((totalLangkah / langkahMaks) * 100));
    if (data.status === "Selesai") persen = 100;

    var html =
      '<div class="tracking-header">' +
      '  <h3>📦 ' + data.nama + '</h3>' +
      '  <div class="meta">No. DO: ' + data.nomorDO + ' &nbsp;•&nbsp; ' + data.ekspedisi + '</div>' +
      '</div>' +
      '<div class="detail-grid">' +
      '  <div class="detail-item"><div class="label">Status</div><div class="value"><span class="badge ' + kelasBadge + '">' + data.status + '</span></div></div>' +
      '  <div class="detail-item"><div class="label">Ekspedisi</div><div class="value">' + data.ekspedisi + '</div></div>' +
      '  <div class="detail-item"><div class="label">Tanggal Kirim</div><div class="value">' + data.tanggalKirim + '</div></div>' +
      '  <div class="detail-item"><div class="label">Kode Paket</div><div class="value">' + data.paket + '</div></div>' +
      '  <div class="detail-item"><div class="label">Total Pembayaran</div><div class="value">' + data.total + '</div></div>' +
      '</div>' +
      '<div style="margin-bottom:18px;">' +
      '  <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">' +
      '    <span><strong>Progress Pengiriman</strong></span>' +
      '    <span>' + persen + '%</span>' +
      '  </div>' +
      '  <div class="progress-bar"><div class="progress-fill" style="width:' + persen + '%"></div></div>' +
      '</div>' +
      '<h4 style="color:var(--ut-blue-dark);margin-bottom:12px;">🚚 Riwayat Perjalanan Paket</h4>' +
      '<ul class="timeline">';

    // Render timeline 
    var perjalanan = data.perjalanan.slice().reverse();
    perjalanan.forEach(function (p) {
      html +=
        '<li>' +
        '  <span class="time">' + p.waktu + '</span>' +
        '  <span class="desc">' + p.keterangan + '</span>' +
        '</li>';
    });
    html += '</ul>';

    hasilEl.innerHTML = html;
  });
}

/* -------------------------------------------------------------
   5. HALAMAN STOK 
------------------------------------------------------------- */

var stokKerja = []; // copy data agar bisa dimanipulasi

function renderTabelStok() {
  var tbody = document.getElementById("tbodyStok");
  if (!tbody) return;
  tbody.innerHTML = "";

  if (stokKerja.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="8"><div class="empty-state"><div class="emoji">📭</div>' +
      '<p>Belum ada data stok.</p></div></td></tr>';
    return;
  }

  stokKerja.forEach(function (item, idx) {
    var tr = document.createElement("tr");
    tr.innerHTML =
      '<td>' + (idx + 1) + '</td>' +
      '<td><img class="cover-thumb" src="' + item.cover + '" alt="' + item.namaBarang + '" onerror="this.style.display=\'none\'"></td>' +
      '<td><strong>' + item.kodeBarang + '</strong></td>' +
      '<td>' + item.namaBarang + '</td>' +
      '<td>' + item.kodeLokasi + '</td>' +
      '<td><span class="badge badge-info">' + item.jenisBarang + '</span></td>' +
      '<td>Edisi ' + item.edisi + '</td>' +
      '<td><strong>' + item.stok.toLocaleString("id-ID") + '</strong> ' +
      '<button class="btn-icon" data-aksi="detail" data-idx="' + idx + '">👁️</button>' +
      '<button class="btn-icon danger" data-aksi="hapus" data-idx="' + idx + '">🗑️</button>' +
      '</td>';
    tbody.appendChild(tr);
  });

  
  tbody.querySelectorAll("button[data-aksi]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var idx   = parseInt(this.getAttribute("data-idx"), 10);
      var aksi  = this.getAttribute("data-aksi");
      if (aksi === "hapus") {
        if (confirm("Hapus data \"" + stokKerja[idx].namaBarang + "\"?")) {
          stokKerja.splice(idx, 1);
          renderTabelStok();
          alert("🗑️ Data berhasil dihapus.");
        }
      } else if (aksi === "detail") {
        tampilkanDetailStok(stokKerja[idx]);
      }
    });
  });
}

function tampilkanDetailStok(item) {
  var isi = document.getElementById("isiDetailStok");
  isi.innerHTML =
    '<div style="text-align:center;margin-bottom:14px;">' +
    '  <img src="' + item.cover + '" alt="' + item.namaBarang + '" ' +
    '       style="max-width:160px;border-radius:8px;box-shadow:var(--shadow-md);" ' +
    '       onerror="this.style.display=\'none\'">' +
    '</div>' +
    '<div class="detail-grid">' +
    '  <div class="detail-item"><div class="label">Kode Lokasi</div><div class="value">' + item.kodeLokasi + '</div></div>' +
    '  <div class="detail-item"><div class="label">Kode Barang</div><div class="value">' + item.kodeBarang + '</div></div>' +
    '  <div class="detail-item"><div class="label">Nama Barang</div><div class="value">' + item.namaBarang + '</div></div>' +
    '  <div class="detail-item"><div class="label">Jenis</div><div class="value">' + item.jenisBarang + '</div></div>' +
    '  <div class="detail-item"><div class="label">Edisi</div><div class="value">' + item.edisi + '</div></div>' +
    '  <div class="detail-item"><div class="label">Stok</div><div class="value">' + item.stok + '</div></div>' +
    '</div>';
  bukaModal("modalDetailStok");
}

function inisialisasiStok() {
  var tbody = document.getElementById("tbodyStok");
  if (!tbody) return;
  cekLogin();

  // Salin data 
  stokKerja = dataBahanAjar.map(function (b) { return Object.assign({}, b); });
  renderTabelStok();

  // Tombol tambah baris baru 
  var btnTambah = document.getElementById("btnTambahStok");
  if (btnTambah) {
    btnTambah.addEventListener("click", function () { bukaModal("modalTambahStok"); });
  }

  // Submit form tambah stok
  var formTambah = document.getElementById("formTambahStok");
  if (formTambah) {
    formTambah.addEventListener("submit", function (e) {
      e.preventDefault();

      var kodeLokasi = document.getElementById("inKodeLokasi").value.trim();
      var kodeBarang = document.getElementById("inKodeBarang").value.trim().toUpperCase();
      var namaBarang = document.getElementById("inNamaBarang").value.trim();
      var jenisBarang= document.getElementById("inJenisBarang").value;
      var edisi      = document.getElementById("inEdisi").value.trim();
      var stok       = parseInt(document.getElementById("inStok").value, 10);

      // Validasi
      if (!kodeLokasi || !kodeBarang || !namaBarang || !edisi) {
        alert("⚠️ Semua field wajib diisi!");
        return;
      }
      if (isNaN(stok) || stok < 0) {
        alert("⚠️ Stok harus angka >= 0.");
        return;
      }
      // Cek duplikat kode barang
      var ada = stokKerja.find(function (b) { return b.kodeBarang === kodeBarang; });
      if (ada) {
        alert("⚠️ Kode Barang \"" + kodeBarang + "\" sudah ada di daftar.");
        return;
      }

      stokKerja.push({
        kodeLokasi: kodeLokasi,
        kodeBarang: kodeBarang,
        namaBarang: namaBarang,
        jenisBarang: jenisBarang,
        edisi: edisi,
        stok: stok,
        cover: "assets/img/default.png"
      });

      renderTabelStok();
      tutupModal("modalTambahStok");
      formTambah.reset();
      alert("✅ Stok bahan ajar baru berhasil ditambahkan.");
    });
  }

  // Filter pencarian
  var inputCari = document.getElementById("inputCariStok");
  if (inputCari) {
    inputCari.addEventListener("input", function () {
      var q = this.value.toLowerCase();
      var hasil = dataBahanAjar.filter(function (b) {
        return b.namaBarang.toLowerCase().includes(q) ||
               b.kodeBarang.toLowerCase().includes(q) ||
               b.kodeLokasi.toLowerCase().includes(q);
      });
      // Gabung dengan data yang ditambah pengguna baru
      var ditambah = stokKerja.filter(function (s) {
        return !dataBahanAjar.find(function (d) { return d.kodeBarang === s.kodeBarang; });
      });
      stokKerja = hasil.concat(ditambah);
      renderTabelStok();
    });
  }
}

/* -------------------------------------------------------------
   6. LAPORAN & HISTORI 
------------------------------------------------------------- */

function tampilkanTab(namaTab) {
  document.querySelectorAll(".tab-section").forEach(function (s) {
    s.classList.remove("active");
  });
  var target = document.getElementById(namaTab);
  if (target) target.classList.add("active");

  document.querySelectorAll(".nav-menu > li").forEach(function (li) {
    li.classList.remove("active");
  });
  var nav = document.querySelector('.nav-menu [data-tab="' + namaTab + '"]');
  if (nav) nav.parentElement.classList.add("active");
}

function renderMonitoringDO() {
  var tbody = document.getElementById("tbodyMonitoring");
  if (!tbody) return;
  tbody.innerHTML = "";

  dataMonitoringDO.forEach(function (m, idx) {
    var kelasBadge = "badge-info";
    if (m.status === "Selesai")          kelasBadge = "badge-success";
    if (m.status === "Dikirim")          kelasBadge = "badge-warning";
    if (m.status === "Dalam Perjalanan") kelasBadge = "badge-info";
    if (m.status === "Diproses")         kelasBadge = "badge-danger";

    var tr = document.createElement("tr");
    tr.innerHTML =
      '<td>' + (idx + 1) + '</td>' +
      '<td><strong>' + m.nomorDO + '</strong></td>' +
      '<td>' + m.upbjj + '</td>' +
      '<td><div class="progress-bar"><div class="progress-fill" style="width:' + m.progress + '%;"></div></div>' +
      '<span style="font-size:11px;color:var(--ut-text-soft)">' + m.progress + '%</span></td>' +
      '<td><span class="badge ' + kelasBadge + '">' + m.status + '</span></td>';
    tbody.appendChild(tr);
  });
}

function renderRekapBahanAjar() {
  var tbody = document.getElementById("tbodyRekap");
  if (!tbody) return;
  tbody.innerHTML = "";

  dataBahanAjar.forEach(function (b, idx) {
    var status = "Aman";
    var kelasBadge = "badge-success";
    if (b.stok < 200)        { status = "Menipis"; kelasBadge = "badge-warning"; }
    if (b.stok < 100)        { status = "Kritis";  kelasBadge = "badge-danger"; }

    var tr = document.createElement("tr");
    tr.innerHTML =
      '<td>' + (idx + 1) + '</td>' +
      '<td><strong>' + b.kodeBarang + '</strong></td>' +
      '<td>' + b.namaBarang + '</td>' +
      '<td>' + b.kodeLokasi + '</td>' +
      '<td>' + b.stok.toLocaleString("id-ID") + '</td>' +
      '<td><span class="badge ' + kelasBadge + '">' + status + '</span></td>';
    tbody.appendChild(tr);
  });
}

function renderHistori() {
  var tbody = document.getElementById("tbodyHistori");
  if (!tbody) return;
  tbody.innerHTML = "";

  dataHistori.forEach(function (h, idx) {
    var kelasBadge = "badge-info";
    if (h.status === "Selesai")  kelasBadge = "badge-success";
    if (h.status === "Dikirim")  kelasBadge = "badge-warning";
    if (h.status === "Diproses") kelasBadge = "badge-danger";

    var tr = document.createElement("tr");
    tr.innerHTML =
      '<td>' + (idx + 1) + '</td>' +
      '<td>' + h.tanggal + '</td>' +
      '<td><strong>' + h.nomorDO + '</strong></td>' +
      '<td>' + h.upbjj + '</td>' +
      '<td>' + h.kodeBarang + '</td>' +
      '<td>' + h.jumlah + '</td>' +
      '<td>' + h.total + '</td>' +
      '<td><span class="badge ' + kelasBadge + '">' + h.status + '</span></td>';
    tbody.appendChild(tr);
  });
}

/* -------------------------------------------------------------
   7. INISIALISASI BERDASARKAN HALAMAN
------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  inisialisasiLogin();
  inisialisasiDashboard();
  inisialisasiTracking();
  inisialisasiStok();

  // Render laporan & histori di halaman dashboard
  renderMonitoringDO();
  renderRekapBahanAjar();
  renderHistori();

  
  document.querySelectorAll('[data-tab]').forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var tab = this.getAttribute("data-tab");
      tampilkanTab(tab);
    });
  });

 
  var btnLogout = document.getElementById("btnLogout");
  if (btnLogout) btnLogout.addEventListener("click", logout);
});
