document.addEventListener('DOMContentLoaded', () => {
  // --- MINI QUIZ INTERAKTIF ---
  const miniQuizForm = document.getElementById('miniQuizForm');
  const btnMulaiQuiz = document.getElementById('btnMulaiQuiz');
  const hasilQuiz = document.getElementById('hasilQuiz');
  const tombolCek = document.getElementById('cekQuiz');

  if (!miniQuizForm) return;

  // Sembunyikan form quiz di awal
  miniQuizForm.style.display = 'none';

  // Hitung total pertanyaan otomatis
  const totalPertanyaan = miniQuizForm.querySelectorAll('.pertanyaan').length;

  // Fungsi reset warna & hasil
  const resetQuiz = () => {
    hasilQuiz.innerHTML = '';
    miniQuizForm.querySelectorAll('.pertanyaan').forEach((q) => {
      q.classList.remove('benar', 'salah');
    });
    miniQuizForm.reset();
  };

  // Tombol mulai quiz
  if (btnMulaiQuiz) {
    btnMulaiQuiz.addEventListener('click', () => {
      btnMulaiQuiz.style.display = 'none';
      miniQuizForm.style.display = 'block';
      hasilQuiz.innerHTML = '';
      resetQuiz();
    });
  }

  // Tombol cek hasil
  if (tombolCek) {
    tombolCek.addEventListener('click', () => {
      let skor = 0;

      // Periksa tiap jawaban
      for (let i = 1; i <= totalPertanyaan; i++) {
        const pertanyaan = miniQuizForm.querySelector(`.pertanyaan:nth-child(${i})`);
        const jawaban = miniQuizForm.querySelector(`input[name="q${i}"]:checked`);

        if (jawaban) {
          if (jawaban.value === 'benar') {
            skor++;
            pertanyaan.classList.add('benar');
            pertanyaan.classList.remove('salah');
          } else {
            pertanyaan.classList.add('salah');
            pertanyaan.classList.remove('benar');
          }
        } else {
          pertanyaan.classList.remove('benar');
          pertanyaan.classList.add('salah');
        }
      }

      // Tampilkan hasil
      let pesan = '';
      if (skor === totalPertanyaan) {
        pesan = `🎉 Hebat! Jawabanmu benar semua! Skor: <strong>${skor}/${totalPertanyaan}</strong> 🩷`;
      } else if (skor >= totalPertanyaan * 0.6) {
        pesan = `👏 Bagus! Skor kamu <strong>${skor}/${totalPertanyaan}</strong> — Tinggal sedikit lagi untuk sempurna! 🌟`;
      } else if (skor > 0) {
        pesan = `✨ Skor kamu <strong>${skor}/${totalPertanyaan}</strong> — Yuk pelajari lagi supaya makin paham 💪`;
      } else {
        pesan = `😅 Belum ada jawaban benar. Coba ulangi lagi ya 📖`;
      }

      hasilQuiz.innerHTML = `
        <div class="hasil-box">
          ${pesan}
          <br><br>
          <button id="ulangQuiz" class="quiz-btn">Ulangi Quiz</button>
        </div>
      `;

      // Tombol ulang quiz
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

  // Tambah efek hover & animasi kecil
  miniQuizForm.addEventListener('change', (e) => {
    e.target.closest('.pertanyaan').classList.add('aktif');
  });
});

  // CEK GEJALA
  const cekBtn = document.getElementById("cekBtn");
  if (cekBtn) {
    cekBtn.addEventListener("click", function () {
      const checkboxes = document.querySelectorAll('input[name="gejala"]:checked');
      const hasilDiv = document.getElementById("hasilCek");

      if (checkboxes.length === 0) {
        hasilDiv.innerHTML = "Silakan pilih minimal satu gejala.";
        return;
      }

      let hasil = "";

      if (checkboxes.length <= 2) {
        hasil = "Kemungkinan sinusitis ringan. Istirahat dan jaga kesehatan.";
      } else if (checkboxes.length <= 4) {
        hasil = "Kemungkinan sinusitis sedang. Pertimbangkan untuk konsultasi ke dokter.";
      } else {
        hasil = "Kemungkinan sinusitis berat. Segera periksa ke dokter!";
      }

      hasilDiv.innerHTML = `<p>${hasil}</p>`;
    });
  }

  // KALKULATOR SEMBUH
  const hitungBtn = document.getElementById("hitungBtn");
  if (hitungBtn) {
    hitungBtn.addEventListener("click", function () {
      const tglMulai = document.getElementById("tglMulai").value;
      const severity = document.querySelector('input[name="severity"]:checked');
      const hasilKalkulator = document.getElementById("hasilKalkulator");

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

  // RESET KALKULATOR
  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      document.getElementById("formKalkulator").reset();
      document.getElementById("hasilKalkulator").innerHTML = "";
    });
  }

  // MENU TOGGLE UNTUK HP
const menuToggle = document.getElementById("menu-toggle");
const navList = document.querySelector("nav ul");
if (menuToggle && navList) {
  menuToggle.addEventListener("click", () => {
    navList.classList.toggle("active");
  });
}
// Tombol menu (☰) buka/tutup navigasi
const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
}

// Tutup menu otomatis setelah link diklik
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("show");
  });
});

  // Tampilkan section beranda saat halaman pertama kali dimuat
  showSection('beranda');
});

// Fungsi untuk menampilkan section tertentu (misal cek-gejala, kalkulator-sembuh)
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

function toggleMenu() {
  const nav = document.querySelector("header nav");
  nav.classList.toggle("show");
}


