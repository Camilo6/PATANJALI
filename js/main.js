// ==========================================
// PATANJALI COLOMBIA - V1
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // CARRUSEL DE VIDEOS
  // ==========================================

  const reelsTrack = document.getElementById("reelsTrack");
  const reelDots = document.getElementById("reelDots");
  const reelPrev = document.querySelector(".reel-prev");
  const reelNext = document.querySelector(".reel-next");

  let currentReelPage = 0;
  let videosPerPage = 3;
  let totalReelPages = 1;

  // ==========================================
  // CALCULAR VIDEOS POR PÁGINA
  // ==========================================

  function getVideosPerPage() {
    if (window.innerWidth <= 600) {
      return 1;
    }

    if (window.innerWidth <= 900) {
      return 2;
    }

    return 3;
  }

  // ==========================================
  // ACTUALIZAR PAGINACIÓN
  // ==========================================

  function updateReelPagination() {
    if (!reelsTrack) return;

    const cards = reelsTrack.querySelectorAll(".reel-card");

    const totalVideos = cards.length;

    videosPerPage = getVideosPerPage();

    totalReelPages = Math.max(1, Math.ceil(totalVideos / videosPerPage));

    // Evitar una página inexistente

    if (currentReelPage >= totalReelPages) {
      currentReelPage = Math.max(0, totalReelPages - 1);
    }

    // ==========================================
    // CREAR DOTS
    // ==========================================

    if (reelDots) {
      reelDots.innerHTML = "";

      if (totalReelPages <= 1) {
        reelDots.style.display = "none";
      } else {
        reelDots.style.display = "flex";

        for (let i = 0; i < totalReelPages; i++) {
          const dot = document.createElement("span");

          dot.classList.add("reel-dot");

          if (i === currentReelPage) {
            dot.classList.add("active");
          }

          dot.addEventListener("click", () => {
            currentReelPage = i;

            updateReelPosition();
          });

          reelDots.appendChild(dot);
        }
      }
    }

    // ==========================================
    // MOSTRAR / OCULTAR FLECHAS
    // ==========================================

    const showControls = totalReelPages > 1;

    if (reelPrev) {
      reelPrev.style.display = showControls ? "flex" : "none";
    }

    if (reelNext) {
      reelNext.style.display = showControls ? "flex" : "none";
    }

    updateReelPosition();
  }

  // ==========================================
  // MOVER CARRUSEL
  // ==========================================

  function updateReelPosition() {
    if (!reelsTrack) return;

    const pageWidth = reelsTrack.clientWidth;

    reelsTrack.scrollTo({
      left: pageWidth * currentReelPage,

      behavior: "smooth",
    });

    updateActiveReelDot();
  }

  // ==========================================
  // DOT ACTIVO
  // ==========================================

  function updateActiveReelDot() {
    if (!reelDots) return;

    const dots = reelDots.querySelectorAll(".reel-dot");

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentReelPage);
    });
  }

  // ==========================================
  // FLECHAS DEL CARRUSEL
  // ==========================================

  function scrollReels(direction) {
    if (totalReelPages <= 1) return;

    currentReelPage += direction;

    // Volver al comienzo

    if (currentReelPage >= totalReelPages) {
      currentReelPage = 0;
    }

    // Ir al final

    if (currentReelPage < 0) {
      currentReelPage = totalReelPages - 1;
    }

    updateReelPosition();
  }

  // Hacer disponible para onclick="" del HTML

  window.scrollReels = scrollReels;

  // ==========================================
  // ABRIR VIDEO
  // ==========================================

  function openVideo(videoSrc) {
    const videoModal = document.getElementById("videoModal");

    const modalVideo = document.getElementById("modalVideo");

    if (!videoModal || !modalVideo) return;

    // Cargar video

    modalVideo.src = videoSrc;

    modalVideo.load();

    // Mostrar modal

    videoModal.classList.add("active");

    // Reproducir

    modalVideo.play().catch(() => {
      // El navegador puede bloquear
      // la reproducción automática.
    });
  }

  // Hacer disponible para onclick="" del HTML

  window.openVideo = openVideo;

  // ==========================================
  // CERRAR VIDEO
  // ==========================================

  function closeVideo() {
    const videoModal = document.getElementById("videoModal");

    const modalVideo = document.getElementById("modalVideo");

    if (!videoModal || !modalVideo) return;

    // Detener video

    modalVideo.pause();

    // Reiniciar video

    modalVideo.currentTime = 0;

    // Eliminar fuente

    modalVideo.removeAttribute("src");

    modalVideo.load();

    // Ocultar modal

    videoModal.classList.remove("active");
  }

  // Hacer disponible para onclick="" del HTML

  window.closeVideo = closeVideo;

  // ==========================================
  // CERRAR VIDEO CON ESC
  // ==========================================

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeVideo();
    }
  });

  // ==========================================
  // CERRAR AL HACER CLICK FUERA DEL VIDEO
  // ==========================================

  const videoModal = document.getElementById("videoModal");

  if (videoModal) {
    videoModal.addEventListener("click", (event) => {
      if (event.target === videoModal) {
        closeVideo();
      }
    });
  }

  // ==========================================
  // RESPONSIVE
  // ==========================================

  window.addEventListener("resize", () => {
    updateReelPagination();
  });

  // ==========================================
  // INICIALIZAR VIDEOS
  // ==========================================

  updateReelPagination();

  // ==========================================
  // CARRITO
  // ==========================================

  const addToCartButton = document.querySelector(".add-to-cart");

  if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
      alert("Producto agregado al carrito.");
    });
  }

  // ==========================================
  // CARRUSEL DEL PRODUCTO
  // ==========================================

  const productImages = [
    "Images/Crema.jpeg",
    "Images/Crema_des.jpeg",
    "Images/Crema_desc.jpeg",
  ];

  let currentProductImage = 0;

  const productImage = document.getElementById("productImage");

  const productPrev = document.getElementById("productPrev");

  const productNext = document.getElementById("productNext");

  const thumbnails = document.querySelectorAll(
    ".product-thumbnails .thumbnail",
  );

  // ==========================================
  // ACTUALIZAR IMAGEN DEL PRODUCTO
  // ==========================================

  function updateProductImage() {
    if (!productImage) return;

    productImage.src = productImages[currentProductImage];

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.classList.toggle("active", index === currentProductImage);
    });
  }

  // ==========================================
  // BOTÓN ANTERIOR
  // ==========================================

  if (productPrev) {
    productPrev.addEventListener("click", () => {
      currentProductImage--;

      if (currentProductImage < 0) {
        currentProductImage = productImages.length - 1;
      }

      updateProductImage();
    });
  }

  // ==========================================
  // BOTÓN SIGUIENTE
  // ==========================================

  if (productNext) {
    productNext.addEventListener("click", () => {
      currentProductImage++;

      if (currentProductImage >= productImages.length) {
        currentProductImage = 0;
      }

      updateProductImage();
    });
  }

  // ==========================================
  // MINIATURAS
  // ==========================================

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      currentProductImage = Number(thumbnail.dataset.index);

      updateProductImage();
    });
  });
});
