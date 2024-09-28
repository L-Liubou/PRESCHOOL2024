const apiKey = "yuS-48LpUvnHuIDarBer_vakDeH4pU6t_BcrDXgEkaE";
//const apiKey = "w4Fh_zUBh-TwyEipLaFx2FFH_SXoT3Yc3F1ftgVIP3w";

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
      `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=40&client_id=${apiKey}`,
    );

    if (response.ok) {
      const data = await response.json();

      if (data.total === 0) {
        displayMessage("No results found. Please try a different search term.");
        gallery.innerHTML = "";
      } else {
        displayImages(data);
        displayMessage(`<p class="query-message">${query}</p>`);
      }
    } else {
      displayMessage(
        "An error occurred while fetching images. Please try again.",
      );
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
    displayMessage(
      "An error occurred while fetching images. Please try again.",
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
  clearMessages();
  gallery.innerHTML = "";
  await fetchRandomImages();
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
