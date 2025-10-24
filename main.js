// === Toggle Menu (untuk tombol "Menu") ===
function toggleMenu() {
  const nav = document.querySelector("nav");
  nav.classList.toggle("active");
}

// === Navigasi antar Section ===
function showSection(id) {
  const sections = document.querySelectorAll(".content-section");
  sections.forEach(section => section.classList.remove("active"));

  const target = document.getElementById(id);
  if (target) {
    target.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Tutup menu setelah pilih (di HP)
  const nav = document.querySelector("nav");
  nav.classList.remove("active");
}

// === Tombol "Kembali" (ke beranda) ===
function goBack() {
  showSection("beranda");
}

// === Tombol interaktif lainnya (cek gejala, kalkulator, quiz, dsb) ===
document.addEventListener("DOMContentLoaded", () => {
 // ===== CEK GEJALA =====
const cekBtn = document.getElementById("cekBtn");
if (cekBtn) {
  cekBtn.addEventListener("click", () => {
    const gejalaDipilih = document.querySelectorAll("input[name='gejala']:checked");
    const hasil = document.getElementById("hasilCek");

    if (gejalaDipilih.length === 0) {
      hasil.innerHTML = `<span style="color: #e74c3c;">⚠️ Silakan pilih minimal satu gejala!</span>`;
      return;
    }

    let pesan = "";
    let warna = "";
    let emoji = "";

    if (gejalaDipilih.length <= 2) {
      pesan = "Kemungkinan sinusitis ringan. Istirahat dan jaga kesehatan ya!";
      warna = "#2ecc71"; // hijau
      emoji = "😊";
    } else if (gejalaDipilih.length <= 4) {
      pesan = "Kemungkinan sinusitis sedang. Pertimbangkan untuk konsultasi ke dokter.";
      warna = "#f1c40f"; // kuning
      emoji = "⚠️";
    } else {
      pesan = "Kemungkinan sinusitis berat. Segera periksa ke dokter!";
      warna = "#e74c3c"; // merah
      emoji = "🚨";
    }

    // tampilkan hasil dengan warna dan emoji, plus efek fade in sederhana
    hasil.style.color = warna;
    hasil.style.opacity = 0;
    hasil.innerHTML = `${emoji} ${pesan}`;
    let op = 0;
    const fadeIn = setInterval(() => {
      if (op >= 1) clearInterval(fadeIn);
      hasil.style.opacity = op;
      op += 0.1;
    }, 30);
  });
}

  // Kalkulator sembuh
  const hitungBtn = document.getElementById("hitungBtn");
  if (hitungBtn) {
    hitungBtn.addEventListener("click", () => {
      const tglMulai = document.getElementById("tglMulai").value;
      const severity = document.querySelector("input[name='severity']:checked");
      const hasil = document.getElementById("hasilKalkulator");

      if (!tglMulai || !severity) {
        hasil.textContent = "Isi tanggal dan pilih tingkat keparahan dulu ya!";
        return;
      }

      const tgl = new Date(tglMulai);
      tgl.setDate(tgl.getDate() + parseInt(severity.value));
      hasil.textContent = `Perkiraan sembuh: ${tgl.toLocaleDateString("id-ID")}`;
    });
  }

  // ===== MINI QUIZ =====
const btnMulaiQuiz = document.getElementById("btnMulaiQuiz");
const miniQuizForm = document.getElementById("miniQuizForm");
const cekQuiz = document.getElementById("cekQuiz");
const hasilQuiz = document.getElementById("hasilQuiz");

if (btnMulaiQuiz && miniQuizForm && cekQuiz) {
  miniQuizForm.style.display = "none";

  btnMulaiQuiz.addEventListener("click", () => {
    miniQuizForm.style.display = "block";
    btnMulaiQuiz.style.display = "none";
    hasilQuiz.innerHTML = "";
  });

  cekQuiz.addEventListener("click", () => {
    const totalPertanyaan = miniQuizForm.querySelectorAll(".pertanyaan").length;
    const benar = miniQuizForm.querySelectorAll("input[value='benar']:checked").length;

    let pesan = "";
    let warna = "";
    let emoji = "";

    if (benar === totalPertanyaan) {
      pesan = `Jawabanmu benar semua! Skor: ${benar}/${totalPertanyaan}`;
      warna = "#2ecc71"; // hijau
      emoji = "🎉";
    } else if (benar > 0) {
      pesan = `Skor kamu: ${benar}/${totalPertanyaan} — Bagus, tapi masih bisa lebih baik!`;
      warna = "#f1c40f"; // kuning
      emoji = "👍";
    } else {
      pesan = `Belum ada jawaban benar. Yuk belajar lagi!`;
      warna = "#e74c3c"; // merah
      emoji = "😅";
    }

    // efek fade in sederhana
    hasilQuiz.style.color = warna;
    hasilQuiz.style.opacity = 0;
    hasilQuiz.innerHTML = `${emoji} ${pesan}`;
    let op = 0;
    const fadeIn = setInterval(() => {
      if (op >= 1) clearInterval(fadeIn);
      hasilQuiz.style.opacity = op;
      op += 0.1;
    }, 30);
  });
}
  const resetBtn = document.getElementById("resetBtn");

if (resetBtn && miniQuizForm && hasilQuiz) {
  resetBtn.addEventListener("click", (e) => {
    e.preventDefault(); // cegah reload halaman
    miniQuizForm.reset(); // hapus semua pilihan radio
    hasilQuiz.innerHTML = ""; // hapus hasil skor
    btnMulaiQuiz.style.display = "block"; // tampilkan tombol mulai lagi
    miniQuizForm.style.display = "none";  // sembunyikan form lagi
  });
}

  // Mitos & Fakta
  const btnToggles = document.querySelectorAll(".btn-toggle");
  btnToggles.forEach(btn => {
    btn.addEventListener("click", () => {
      const fakta = btn.nextElementSibling;
      fakta.style.display = fakta.style.display === "block" ? "none" : "block";
    });
  });
});













