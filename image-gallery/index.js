//const apiKey = "yuS-48LpUvnHuIDarBer_vakDeH4pU6t_BcrDXgEkaE";
//const apiKey = "w4Fh_zUBh-TwyEipLaFx2FFH_SXoT3Yc3F1ftgVIP3w";
const apiKey = 'qizPVDkPGkFUXDVnAAIL8lU4PIg9sj2LefXpbTfLmuM';

const gallery = document.querySelector(".gallery__images");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const clearButton = document.querySelector(".clear-button");
let query = "";
let page = 1;
let totalImagesLoaded = 0;
const maxImages = 200;
let isFetching = false;

document.addEventListener("DOMContentLoaded", async () => {
  searchInput.focus();
  await fetchRandomImages();
});

//!RANDOM
async function fetchRandomImages() {
  try {
    if (query) return;
    isFetching = true;

    const response = await fetch(
      `https://api.unsplash.com/photos/random?count=20&client_id=${apiKey}`,
    );

    if (response.ok) {
      const data = await response.json();
      displayImages(data);
    } else {
      displayMessage(
        "An error occurred while fetching random images. Please try again.",
      );
    }
  } catch (error) {
    console.error("Error fetching random images:", error);
    displayMessage(
      "An error occurred while fetching images. Please try again.",
    );
  } finally {
    isFetching = false;
  }
}

//!SEARCH
async function fetchImages(query = "", page = 1) {
  try {
    isFetching = true;
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=40&client_id=${apiKey}`
    );

    if (response.ok) {
      const data = await response.json();

      if (data.total === 0) {
        displayMessage("No results found. Please try a different search term.");
        gallery.innerHTML = "";
      } else {
        displayImages(data.results); 
        displayMessage(`<p class="query-message">${query}</p>`);
      }
    } else {
      displayMessage(
        "An error occurred while fetching images. Please try again."
      );
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
    displayMessage(
      "An error occurred while fetching images. Please try again."
    );
  } finally {
    isFetching = false;
  }
}

//!DISPLAY
function displayImages(images) {
  images.forEach((image) => {
    if (
      totalImagesLoaded >= maxImages ||
      document.querySelector(`.image-card[data-image-id="${image.id}"]`)
    ) {
      return;
    }

    const imageItem = document.createElement("li");
    imageItem.classList.add("image-card");
    imageItem.dataset.imageId = image.id;
    imageItem.innerHTML = `
            <img src="${image.urls.small}" alt="${image.alt_description}">
            <div class="image-details">
                <div class="image-author">
                    <i class="image-icon material-icons">account_circle</i>
                    <span class="name">${image.user.name}</span>
                </div>
                <a href="${image.links.download}" target="_blank" class="download-button">
                    <i class="download-icon material-icons">download</i>
                </a>
            </div>
            <button class="button-favorite ${isFavorite(image.id) ? "favorite" : ""}">
                <i class="favorite-icon material-icons">${isFavorite(image.id) ? "favorite" : "favorite_border"}</i>
            </button>
        `;

    const favoriteButton = imageItem.querySelector(".button-favorite");
    favoriteButton.addEventListener("click", () => toggleFavorite(image));

    gallery.appendChild(imageItem);
    totalImagesLoaded++;
  });
}

function clearMessages() {
  const messageContainer = document.querySelector(".message-container");
  messageContainer.innerHTML = "";
}

function displayMessage(
  message = "No results found. Please try a different search term.",
) {
  clearMessages();
  const messageContainer = document.querySelector(".message-container");
  messageContainer.innerHTML = `<p class="no-results-message">${message}</p>`;
}

clearButton.addEventListener("click", async () => {
  searchInput.value = "";
  searchInput.focus();
  query = "";
  totalImagesLoaded = 0;
  // clearMessages();
  // gallery.innerHTML = "";
  // await fetchRandomImages();
});

searchButton.addEventListener("click", async () => {
  if (!isFetching) {
    await searchImages();
  }
});

searchInput.addEventListener("keydown", async (event) => {
  if (event.key === "Enter" && !isFetching) {
    await searchImages();
  }
});

async function searchImages() {
  query = searchInput.value.trim();
  page = 1;
  totalImagesLoaded = 0;
  clearMessages();
  gallery.innerHTML = "";

  if (query) {
    await fetchImages(query, page);
  } else {
    await fetchRandomImages();
  }
}

window.addEventListener("scroll", async () => {
  if (
    !isFetching &&
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
    totalImagesLoaded < maxImages
  ) {
    isFetching = true;
    page++;
    await fetchImages(query, page);
    isFetching = false;
  }
});

//!FAVORITES
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function toggleFavorite(image) {
  const imageId = image.id;
  const imageIndex = favorites.findIndex((fav) => fav.id === imageId);

  if (imageIndex > -1) {
    favorites.splice(imageIndex, 1);
  } else {
    favorites.push(image);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  updateFavoritesDisplay();
  updateGallery();
}

function isFavorite(imageId) {
  return favorites.some((fav) => fav.id === imageId);
}

function updateGallery() {
  const images = gallery.querySelectorAll(".image-card");

  images.forEach((imageCard) => {
    const imageId = imageCard.dataset.imageId;
    const favoriteButton = imageCard.querySelector(".button-favorite");
    const icon = favoriteButton.querySelector(".favorite-icon");

    favoriteButton.classList.toggle("favorite", isFavorite(imageId));
    icon.textContent = isFavorite(imageId) ? "favorite" : "favorite_border";
  });
}

function updateFavoritesDisplay() {
  const favoritesList = document.querySelector(".favorites__list");
  const toggleButton = document.querySelector(".favorites__toggle-button");
  favoritesList.innerHTML = "";
  if (favorites.length === 0) {
    toggleButton.style.opacity = "0.3";
    toggleButton.classList.add("no-scale");
    return;
  } else {
    toggleButton.style.opacity = "0.7";
    toggleButton.classList.remove("no-scale");
  }

  favorites.forEach((image) => {
    const favoriteItem = document.createElement("li");
    favoriteItem.classList.add("image-card", "favorite-image-card");
    favoriteItem.dataset.imageId = image.id;
    favoriteItem.innerHTML = `
            <img class="favorite-image" src="${image.urls.small}" alt="${image.alt_description}">
            <a href="${image.links.download}" target="_blank" class="download-button">
                <i class="download-icon material-icons">download</i>
            </a>
            <button class="button-favorite favorite">
                <i class="favorite-icon material-icons">favorite</i>
            </button>
        `;

    const favoriteButton = favoriteItem.querySelector(".button-favorite");
    favoriteButton.addEventListener("click", () => toggleFavorite(image));

    favoritesList.appendChild(favoriteItem);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateFavoritesDisplay();
});

const toggleButton = document.querySelector(".favorites__toggle-button");
const favoritesContainer = document.querySelector(".favorites__container");

toggleButton.addEventListener("click", () => {
  favoritesContainer.classList.toggle("open");
});