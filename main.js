document.addEventListener('DOMContentLoaded', () => {

 function toggleMenu() {
  const menu = document.querySelector("header nav");
  if (!menu) return;
  menu.classList.toggle("active");
}

 function goBack() {
  window.history.back();
}
 
  // ===== MINI QUIZ =====
  const miniQuizForm = document.getElementById('miniQuizForm');
  const btnMulaiQuiz = document.getElementById('btnMulaiQuiz');
  const hasilQuiz = document.getElementById('hasilQuiz');
  const tombolCek = document.getElementById('cekQuiz');
  if (miniQuizForm) miniQuizForm.style.display = 'none';

  if (btnMulaiQuiz && miniQuizForm) {
    btnMulaiQuiz.addEventListener('click', () => {
      btnMulaiQuiz.style.display = 'none';
      miniQuizForm.style.display = 'block';
      hasilQuiz.innerHTML = '';
    });
  }

  if (tombolCek && miniQuizForm) {
    tombolCek.addEventListener('click', () => {
      let skor = 0;
      const totalPertanyaan = 3;
      for (let i = 1; i <= totalPertanyaan; i++) {
        const jawaban = miniQuizForm.querySelector(`input[name="q${i}"]:checked`);
        if (jawaban && jawaban.value === 'benar') skor++;
      }
      if (skor === totalPertanyaan) {
        hasilQuiz.innerHTML = `🎉 Jawabanmu benar semua! Skor: <strong>${skor}/${totalPertanyaan}</strong> 🩷`;
      } else if (skor > 0) {
        hasilQuiz.innerHTML = `✨ Skor kamu: <strong>${skor}/${totalPertanyaan}</strong> — Bagus, tapi masih bisa lebih baik 💪`;
      } else {
        hasilQuiz.innerHTML = `😅 Belum ada jawaban benar. Yuk belajar lagi 📖`;
      }
    });
  }

  // ===== CEK GEJALA =====
  const cekBtn = document.getElementById("cekBtn");
  if (cekBtn) {
    cekBtn.addEventListener("click", () => {
      const checkboxes = document.querySelectorAll('input[name="gejala"]:checked');
      const hasilDiv = document.getElementById("hasilCek");
      if (checkboxes.length === 0) return hasilDiv.innerHTML = "Silakan pilih minimal satu gejala.";

      let hasil = "";
      if (checkboxes.length <= 2) hasil = "Kemungkinan sinusitis ringan. Istirahat dan jaga kesehatan.";
      else if (checkboxes.length <= 4) hasil = "Kemungkinan sinusitis sedang. Pertimbangkan untuk konsultasi ke dokter.";
      else hasil = "Kemungkinan sinusitis berat. Segera periksa ke dokter!";

      hasilDiv.innerHTML = `<p>${hasil}</p>`;
    });
  }

  // ===== KALKULATOR SEMBUH =====
  const hitungBtn = document.getElementById("hitungBtn");
  if (hitungBtn) {
    hitungBtn.addEventListener("click", () => {
      const tglMulai = document.getElementById("tglMulai").value;
      const severity = document.querySelector('input[name="severity"]:checked');
      const hasilKalkulator = document.getElementById("hasilKalkulator");
      if (!tglMulai || !severity) return hasilKalkulator.innerHTML = "Silakan isi tanggal mulai dan pilih tingkat keparahan.";

      const startDate = new Date(tglMulai);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + parseInt(severity.value));

      const options = { year: "numeric", month: "long", day: "numeric" };
      hasilKalkulator.innerHTML = `Perkiraan sembuh: <strong>${endDate.toLocaleDateString("id-ID", options)}</strong>`;
    });
  }

  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      document.getElementById("formKalkulator").reset();
      document.getElementById("hasilKalkulator").innerHTML = "";
    });
  }

  // ===== MITOS & FAKTA =====
  const faktaElements = document.querySelectorAll(".fakta");
  faktaElements.forEach(f => f.style.display = "none");

  const toggleButtons = document.querySelectorAll(".btn-toggle");
  toggleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const fakta = btn.nextElementSibling;
      if (fakta.style.display === "block") {
        fakta.style.display = "none";
        btn.textContent = "Tampilkan Fakta";
      } else {
        fakta.style.display = "block";
        btn.textContent = "Sembunyikan Fakta";
      }
    });
  });

  // ===== Tampilkan section beranda awal =====
  showSection('beranda');

});

// ===== FUNGSI SHOW SECTION =====
function showSection(id) {
  const allSections = document.querySelectorAll('section.content-section');
  allSections.forEach(section => {
    section.style.display = 'none';
    section.classList.remove('active');
  });

  const target = document.getElementById(id);
  if (target) {
    target.style.display = 'block';
    target.classList.add('active');
  }
}




