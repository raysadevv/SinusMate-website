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
  // Cek gejala
  const cekBtn = document.getElementById("cekBtn");
  if (cekBtn) {
    cekBtn.addEventListener("click", () => {
      const gejalaDipilih = document.querySelectorAll("input[name='gejala']:checked");
      const hasil = document.getElementById("hasilCek");
      if (gejalaDipilih.length >= 3) {
        hasil.textContent = "Kemungkinan kamu mengalami sinusitis. Disarankan periksa ke dokter.";
      } else {
        hasil.textContent = "Kemungkinan kecil kamu sinusitis, tapi tetap jaga kesehatan ya!";
      }
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

  // Quiz
  const btnMulaiQuiz = document.getElementById("btnMulaiQuiz");
  const miniQuizForm = document.getElementById("miniQuizForm");
  const cekQuiz = document.getElementById("cekQuiz");
  const hasilQuiz = document.getElementById("hasilQuiz");

  if (btnMulaiQuiz && miniQuizForm && cekQuiz) {
    btnMulaiQuiz.addEventListener("click", () => {
      miniQuizForm.style.display = "block";
      btnMulaiQuiz.style.display = "none";
    });

    cekQuiz.addEventListener("click", () => {
      const benar = document.querySelectorAll("input[value='benar']:checked").length;
      hasilQuiz.textContent = `Skor kamu: ${benar}/3`;
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










