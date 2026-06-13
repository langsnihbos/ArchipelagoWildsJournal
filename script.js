document.addEventListener("DOMContentLoaded", () => {
    
    // Objek Selector DOM Elemen
    const ui = {
        navItems: document.querySelectorAll(".nav-item"),
        slides: document.querySelectorAll(".slide"),
        exploreBtn: document.getElementById("explore-btn"),
        galleryShortcutBtn: document.getElementById("gallery-shortcut-btn")
    };

    /**
     * Mesin Utama Penggeser Slide Halaman Website
     * @param {string} targetSlideId - Atribut ID target section halaman
     */
    function routeToSlide(targetSlideId) {
        // Cari ketersediaan element section target
        const activeTargetSection = document.getElementById(targetSlideId);
        if (!activeTargetSection) {
            console.warn(`Halaman slide dengan ID: "${targetSlideId}" tidak ditemukan.`);
            return;
        }

        // Jalankan animasi transisi keluar halaman lama
        ui.navItems.forEach(item => item.classList.remove("active"));
        ui.slides.forEach(slide => slide.classList.remove("active"));

        // Masukkan halaman baru ke viewport layar tengah
        activeTargetSection.classList.add("active");

        // Kembalikan posisi sumbu scroll vertikal halaman baru ke posisi nol (paling atas)
        activeTargetSection.scrollTop = 0;

        // Berikan tanda visual warna hijau aktif di menu atas navbar
        const activeNavbarLink = document.querySelector(`[data-target="${targetSlideId}"]`);
        if (activeNavbarLink) {
            activeNavbarLink.classList.add("active");
        }
    }

    // --- INTERAKSI MOUSE 1: Navigasi Menu Header ---
    ui.navItems.forEach(linkElement => {
        linkElement.addEventListener("click", (clickEvent) => {
            clickEvent.preventDefault(); // Matikan paksa perilaku default browser loncat link anchor <a>
            
            const destinationId = linkElement.getAttribute("data-target");
            routeToSlide(destinationId);
        });
    });

    // --- INTERAKSI MOUSE 2: Tombol Pemicu "Masuk ke Ruang Artikel" di Home ---
    if (ui.exploreBtn) {
        ui.exploreBtn.addEventListener("click", () => {
            routeToSlide("artikel");
        });
    }

    // --- INTERAKSI MOUSE 3: Tombol Pemicu Pintasan "Lihat Galeri Foto" di Home ---
    if (ui.galleryShortcutBtn) {
        ui.galleryShortcutBtn.addEventListener("click", () => {
            routeToSlide("galeri");
        });
    }
});

