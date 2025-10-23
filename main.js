document.addEventListener('DOMContentLoaded', () => {
  // --- MINI QUIZ INTERAKTIF ---
  const miniQuizForm = document.getElementById('miniQuizForm');
  const btnMulaiQuiz = document.getElementById('btnMulaiQuiz');
  const hasilQuiz = document.getElementById('hasilQuiz');
  const tombolCek = document.getElementById('cekQuiz');

  if (miniQuizForm) {
    miniQuizForm.style.display = 'none';
    const totalPertanyaan = miniQuizForm.querySelectorAll('.pertanyaan').length;

    const resetQuiz = () => {
      hasilQuiz.innerHTML = '';
      miniQuizForm.querySelectorAll('.pertanyaan').forEach(q => q.classList.remove('benar', 'salah'));
      miniQuizForm.reset();
    };

    if (btnMulaiQuiz) {
      btnMulaiQuiz.addEventListener('click', () => {
        btnMulaiQuiz.style.display = 'none';
        miniQuizForm.style.display = 'block';
        hasilQuiz.innerHTML = '';
        resetQuiz();
      });
    }

    if (tombolCek) {
      tombolCek.addEventListener('click', () => {
        let skor = 0;

        for (let i = 1; i <= totalPertanyaan; i++) {
          const pertanyaan = miniQuizForm.querySelector(`.pertanyaan:nth-of-type(${i})`);
          const jawaban = miniQuizForm.querySelector(`input[name="q${i}"]:checked`);

          if (jawaban && jawaban.value === 'benar') {
            skor++;
            pertanyaan.classList.add('benar');
          } else {
            pertanyaan.classList.add('salah');
          }
        }

        let pesan = '';
        if (skor === totalPertanyaan) pesan = `🎉 Hebat! Semua benar! Skor: <strong>${skor}/${totalPertanyaan}</strong> 🩷`;
        else if (skor >= totalPertanyaan * 0.6) pesan = `👏 Bagus! Skor kamu <strong>${skor}/${totalPertanyaan}</strong> 🌟`;
        else if (skor > 0) pesan = `✨ Skor kamu <strong>${skor}/${totalPertanyaan}</strong>. Yuk belajar lagi 💪`;
        else pesan = `😅 Belum ada jawaban benar. Coba lagi ya 📖`;

        hasilQuiz.innerHTML = `
          <div class="hasil-box">
            ${pesan}<br><br>
            <button id="ulangQuiz" class="quiz-btn">Ulangi Quiz</button>
          </div>
        `;

        const ulangBtn = document.getElementById('ulangQuiz');
        if (ulangBtn) {
          ulangBtn.addEventListener('click', () => {
            resetQuiz();
            hasilQuiz.innerHTML = '';
            btnMulaiQuiz.style.display = 'inline-block';
            miniQuizForm.style.display = 'none';
          });
        }
      });
    }

    miniQuizForm.addEventListener('change', (e) => {
      e.target.closest('.pertanyaan')?.classList.add('aktif');
    });
  }

  // --- CEK GEJALA ---
  const cekBtn = document.getElementById("cekBtn");
  if (cekBtn) {
    cekBtn.addEventListener("click", function () {
      const checkboxes = document.querySelectorAll('input[name="gejala"]:checked');
      const hasilDiv = document.getElementById("hasilCek");
      if (!hasilDiv) return;

      if (checkboxes.length === 0) {
        hasilDiv.innerHTML = "Silakan pilih minimal satu gejala.";
        return;
      }

      let hasil = "";
      if (checkboxes.length <= 2) hasil = "Kemungkinan sinusitis ringan. Istirahat dan jaga kesehatan.";
      else if (checkboxes.length <= 4) hasil = "Kemungkinan sinusitis sedang. Pertimbangkan untuk konsultasi ke dokter.";
      else hasil = "Kemungkinan sinusitis berat. Segera periksa ke dokter!";

      hasilDiv.innerHTML = `<p>${hasil}</p>`;
    });
  }

  // --- KALKULATOR SEMBUH ---
  const hitungBtn = document.getElementById("hitungBtn");
  if (hitungBtn) {
    hitungBtn.addEventListener("click", function () {
      const tglMulai = document.getElementById("tglMulai")?.value;
      const severity = document.querySelector('input[name="severity"]:checked');
      const hasilKalkulator = document.getElementById("hasilKalkulator");
      if (!hasilKalkulator) return;

      if (!tglMulai || !severity) {
        hasilKalkulator.innerHTML = "Silakan isi tanggal mulai dan pilih tingkat keparahan.";
        return;
      }

      const startDate = new Date(tglMulai);
      const hariSembuh = parseInt(severity.value);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + hariSembuh);

      const options = { year: "numeric", month: "long", day: "numeric" };
      hasilKalkulator.innerHTML = `Perkiraan sembuh: <strong>${endDate.toLocaleDateString("id-ID", options)}</strong>`;
    });
  }

  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      document.getElementById("formKalkulator")?.reset();
      document.getElementById("hasilKalkulator").innerHTML = "";
    });
  }
  
  // --- FUNGSI SHOW SECTION ---
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Tutup menu di HP otomatis
  const nav = document.querySelector('header nav');
  if (nav.classList.contains('show')) nav.classList.remove('show');
}
function toggleMenu() {
  const nav = document.querySelector('header nav');
  nav.classList.toggle('show');
}

document.querySelectorAll('header nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('header nav').classList.remove('show');
  });
});

document.querySelector('.menu-button').addEventListener('click', toggleMenu);


  // --- TAMPILKAN BERANDA SAAT PERTAMA ---
  showSection('beranda');
});





