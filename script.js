"use strict";

const galleryImages = Array.from(
    document.querySelectorAll(".gallery img")
);

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeButton = document.getElementById("closeLightbox");
const previousButton = document.getElementById("previousImage");
const nextButton = document.getElementById("nextImage");

let currentImageIndex = 0;

function showImage(index) {
    if (galleryImages.length === 0) {
        return;
    }

    if (index < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (index >= galleryImages.length) {
        currentImageIndex = 0;
    } else {
        currentImageIndex = index;
    }

    const selectedImage = galleryImages[currentImageIndex];

    lightboxImage.src = selectedImage.src;
    lightboxImage.alt = selectedImage.alt;
}

function openLightbox(index) {
    showImage(index);
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("active");
    lightboxImage.src = "";
    document.body.style.overflow = "";
}

galleryImages.forEach((image, index) => {
    image.addEventListener("click", () => {
        openLightbox(index);
    });
});

previousButton.addEventListener("click", (event) => {
    event.stopPropagation();
    showImage(currentImageIndex - 1);
});

nextButton.addEventListener("click", (event) => {
    event.stopPropagation();
    showImage(currentImageIndex + 1);
});

closeButton.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowLeft") {
        showImage(currentImageIndex - 1);
    }

    if (event.key === "ArrowRight") {
        showImage(currentImageIndex + 1);
    }
});