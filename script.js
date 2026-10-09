
const photoCards = document.querySelectorAll(".photo-card");

let currentPhotoIndex = 0;

// Create the lightbox using JavaScript
const lightbox = document.createElement("div");
lightbox.classList.add("lightbox");
lightbox.setAttribute("role", "dialog");
lightbox.setAttribute("aria-modal", "true");
lightbox.setAttribute("aria-label", "Photo viewer");
lightbox.hidden = true;

lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close photo">&times;</button>

    <button class="lightbox-prev" aria-label="Previous photo">
        &#10094;
    </button>

    <div class="lightbox-content">
        <img class="lightbox-image" src="" alt="">
        <p class="lightbox-caption"></p>
    </div>

    <button class="lightbox-next" aria-label="Next photo">
        &#10095;
    </button>
`;

document.body.appendChild(lightbox);

// Select lightbox elements
const lightboxImage = lightbox.querySelector(".lightbox-image");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");

const closeButton = lightbox.querySelector(".lightbox-close");
const prevButton = lightbox.querySelector(".lightbox-prev");
const nextButton = lightbox.querySelector(".lightbox-next");


// Open a photo
function openPhoto(index) {
    const card = photoCards[index];
    const image = card.querySelector("img");

    // Check whether the image loaded successfully
    if (!image.complete || image.naturalWidth === 0) {
        alert("Photo load nahi hui! Apna image path check karo.");
        return;
    }

    currentPhotoIndex = index;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightboxCaption.textContent =
        card.querySelector(".photo-caption").textContent;

    lightbox.hidden = false;
    document.body.style.overflow = "hidden";

    closeButton.focus();
}


// Close the lightbox
function closePhoto() {
    lightbox.hidden = true;
    lightboxImage.src = "";

    document.body.style.overflow = "";
}


// Find the next available photo
function changePhoto(direction) {
    const totalPhotos = photoCards.length;

    for (let i = 0; i < totalPhotos; i++) {
        currentPhotoIndex =
            (currentPhotoIndex + direction + totalPhotos) % totalPhotos;

        const image = photoCards[currentPhotoIndex].querySelector("img");

        if (
            !image.hidden &&
            image.complete &&
            image.naturalWidth > 0
        ) {
            openPhoto(currentPhotoIndex);
            return;
        }
    }
}


// Click any photo to open it
photoCards.forEach((card, index) => {
    card.addEventListener("click", () => {
        openPhoto(index);
    });
});


// Close button
closeButton.addEventListener("click", closePhoto);


// Previous and next buttons
prevButton.addEventListener("click", () => {
    changePhoto(-1);
});

nextButton.addEventListener("click", () => {
    changePhoto(1);
});


// Click outside the image to close
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closePhoto();
    }
});


// Keyboard controls
document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;

    if (event.key === "Escape") {
        closePhoto();
    }

    if (event.key === "ArrowLeft") {
        changePhoto(0);
    }

    if (event.key === "ArrowRight") {
        changePhoto(1);
    }
});
