// Patanjali Colombia - V1

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // CARRUSEL DE VIDEOS
  // ==========================================

  const track = document.querySelector(".video-track");
  const prevButton = document.querySelector(".video-arrow.prev");
  const nextButton = document.querySelector(".video-arrow.next");

  if (track && prevButton && nextButton) {
    const scrollAmount = () => {
      const card = track.querySelector(".video-card");
      return card ? card.offsetWidth + 20 : 300;
    };

    nextButton.addEventListener("click", () => {
      track.scrollBy({
        left: scrollAmount(),
        behavior: "smooth"
      });
    });

    prevButton.addEventListener("click", () => {
      track.scrollBy({
        left: -scrollAmount(),
        behavior: "smooth"
      });
    });
  }


  // ==========================================
  // MODAL DE VIDEOS
  // ==========================================

  const modal = document.querySelector(".video-modal");
  const modalVideo = document.querySelector(".video-modal video");
  const modalClose = document.querySelector(".video-modal-close");

  document.querySelectorAll(".video-card").forEach((card) => {

    card.addEventListener("click", () => {

      const source = card.dataset.video;

      if (!modal || !modalVideo || !source) {
        return;
      }

      modalVideo.src = source;

      modal.classList.add("active");

      document.body.classList.add("modal-open");

      modalVideo.play().catch(() => {});
    });

  });


  // ==========================================
  // CERRAR MODAL
  // ==========================================

  const closeModal = () => {

    if (!modal || !modalVideo) {
      return;
    }

    modal.classList.remove("active");

    document.body.classList.remove("modal-open");

    modalVideo.pause();

    modalVideo.removeAttribute("src");

    modalVideo.load();
  };


  // Botón X

  if (modalClose) {

    modalClose.addEventListener("click", closeModal);

  }


  // Clic fuera del video

  if (modal) {

    modal.addEventListener("click", (event) => {

      if (event.target === modal) {

        closeModal();

      }

    });

  }


  // Tecla ESC

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      closeModal();

    }

  });


  // ==========================================
  // CARRITO
  // ==========================================

  const addToCartButton = document.querySelector(".add-to-cart");

  if (addToCartButton) {

    addToCartButton.addEventListener("click", () => {

      alert("Producto agregado al carrito.");

    });

  }

});