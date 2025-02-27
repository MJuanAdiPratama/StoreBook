// Mengarahkan ke from login dan register
document.querySelector(".btn-masuk").addEventListener("click", function () {
  window.location.href = "login.html"; // Arahkan ke login.html
});

document.querySelector(".btn-daftar").addEventListener("click", function () {
  window.location.href = "register.html"; // Arahkan ke register.html
});


// DROPDOWN CATEGORY
document.addEventListener("DOMContentLoaded", function () {
  // Dropdown Kategori
  const dropdownCategory = document.querySelector(".dropdown-btn");
  const dropdownContent = document.querySelector(".dropdown-content");
  const dropdownIcon = document.querySelector(".dropdown-btn i");

  // Dropdown Profil
  const dropdownProfile = document.querySelector(".icon-profile");
  const dropdownProfileContent = document.querySelector(
    ".dropdown-content-profile"
  );
  const profileIcon = document.querySelector(".icon-profile i.bx-chevron-down");

  // Fungsi toggle untuk kategori
  if (dropdownCategory && dropdownContent && dropdownIcon) {
    dropdownCategory.addEventListener("click", function (e) {
      e.stopPropagation(); // Mencegah event dari bubbling ke window
      dropdownContent.classList.toggle("show");
      dropdownIcon.classList.toggle("bx-chevron-up");
      dropdownIcon.classList.toggle("bx-chevron-down");
    });
  }

  // Fungsi toggle untuk profil
  if (dropdownProfile && dropdownProfileContent && profileIcon) {
    dropdownProfile.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdownProfileContent.classList.toggle("show");
      profileIcon.classList.toggle("bx-chevron-up");
      profileIcon.classList.toggle("bx-chevron-down");
    });
  }

  // Tutup Dropdown jika klik di luar elemen
  window.addEventListener("click", function (e) {
    if (!dropdownCategory.contains(e.target)) {
      dropdownContent.classList.remove("show");
      dropdownIcon.classList.remove("bx-chevron-up");
      dropdownIcon.classList.add("bx-chevron-down");
    }
    if (!dropdownProfile.contains(e.target)) {
      dropdownProfileContent.classList.remove("show");
      profileIcon.classList.remove("bx-chevron-up");
      profileIcon.classList.add("bx-chevron-down");
    }
  });
});
// END DROPDOWN CATEGORY

// SLIDER BANNER
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;
  let currentIndex = 1; // Mulai dari slide kloning terakhir
  let isTransitioning = false;

  // Duplikasi slide pertama dan terakhir untuk efek seamless
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[totalSlides - 1].cloneNode(true);

  // Tambahkan kloning ke dalam slider
  slider.appendChild(firstClone);
  slider.insertBefore(lastClone, slides[0]);

  // Dapatkan ulang semua slide setelah duplikasi
  const updatedSlides = document.querySelectorAll(".slide");
  const totalUpdatedSlides = updatedSlides.length;

  // Pindahkan slider ke posisi awal (bukan kloning)
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex++;
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Jika sampai di kloning pertama (melewati terakhir)
    setTimeout(() => {
      if (currentIndex === totalUpdatedSlides - 1) {
        slider.style.transition = "none"; // Hilangkan transisi agar seamless
        currentIndex = 1;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
      isTransitioning = false;
    }, 500);
  }

  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex--;
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Jika sampai di kloning terakhir (melewati pertama)
    setTimeout(() => {
      if (currentIndex === 0) {
        slider.style.transition = "none"; // Hilangkan transisi agar seamless
        currentIndex = totalUpdatedSlides - 2;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
      isTransitioning = false;
    }, 500);
  }

  let autoSlide = setInterval(nextSlide, 3000); // Slide berganti setiap 3 detik

  // Hentikan auto-slide saat tombol ditekan
  document.querySelector(".prev").addEventListener("click", function () {
    clearInterval(autoSlide);
    prevSlide();
    autoSlide = setInterval(nextSlide, 3000); // Restart auto-slide setelah geser manual
  });

  document.querySelector(".next").addEventListener("click", function () {
    clearInterval(autoSlide);
    nextSlide();
    autoSlide = setInterval(nextSlide, 3000); // Restart auto-slide setelah geser manual
  });

  // Solusi untuk masalah dengan header
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const header = document.querySelector("header"); // Sesuaikan dengan selector header Anda

  // Jika tidak menggunakan tag <header>, gunakan selector kelas header Anda
  // const header = document.querySelector(".header");

  function checkButtonVisibility() {
    // Mendapatkan posisi slider relatif terhadap viewport
    const sliderRect = slider.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();

    // Jika header menutupi slider atau slider berada di luar viewport
    if (
      headerRect.bottom > sliderRect.top ||
      sliderRect.bottom < 0 ||
      sliderRect.top > window.innerHeight
    ) {
      prevBtn.style.opacity = "0";
      nextBtn.style.opacity = "0";
      prevBtn.style.pointerEvents = "none";
      nextBtn.style.pointerEvents = "none";
    } else {
      prevBtn.style.opacity = "1";
      nextBtn.style.opacity = "1";
      prevBtn.style.pointerEvents = "auto";
      nextBtn.style.pointerEvents = "auto";
    }
  }

  // Tambahkan transition di CSS untuk tombol
  prevBtn.style.transition = "opacity 0.3s ease";
  nextBtn.style.transition = "opacity 0.3s ease";

  // Panggil fungsi saat scroll
  window.addEventListener("scroll", checkButtonVisibility);

  // Panggil sekali pada saat load untuk set status awal
  checkButtonVisibility();
});
// END SLIDER BANNER

// SLIDER BUKU TERLARIS
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  let isDragging = false;
  let startX, scrollLeft;

  carousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    carousel.style.cursor = "grabbing";
  });

  carousel.addEventListener("mouseleave", () => {
    isDragging = false;
    carousel.style.cursor = "grab";
  });

  carousel.addEventListener("mouseup", () => {
    isDragging = false;
    carousel.style.cursor = "grab";
  });

  carousel.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // Kecepatan geser
    carousel.scrollLeft = scrollLeft - walk;
  });

  // Fungsi untuk Swipe di HP
  carousel.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener("touchend", () => {
    isDragging = false;
  });

  carousel.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
  });
});
// END SLIDER BUKU TERLARIS