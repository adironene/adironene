import * as util from '../../../util/assets/scripts/util.js';

window.addEventListener("DOMContentLoaded", init);

let currentPage = 1;
const itemsPerPage = 20;
let numRes = 0;
let restaurants = [];

async function init() {
  try {
    restaurants = await util.fetchJSONData();
    numRes = restaurants.length;
    document.getElementById("prev-button").addEventListener("click", prevPage);
    document.getElementById("next-button").addEventListener("click", nextPage);

    currentPage = getPageFromUrl();
    renderRestaurants(currentPage);
  } catch (error) {
    console.error("Error fetching JSON data:", error);
  }
}

function renderRestaurants(page) {
  const mainElement = document.querySelector("main");
  mainElement.innerHTML = "";
  const startIndex = (page - 1) * itemsPerPage;
  if (startIndex > numRes) return;
  const endIndex =
    startIndex + itemsPerPage >= numRes - 1
      ? numRes - 1
      : startIndex + itemsPerPage;
  const restaurantsToDisplay = restaurants.slice(startIndex, endIndex);

  let restaurantsNumDiv = document.getElementById("text-container");
  restaurantsNumDiv.innerHTML = "";
  const span = document.createElement("span");
  span.textContent =
    startIndex +
    " - " +
    endIndex +
    " of " +
    String(numRes - 1) +
    " Restaurants";
  span.className = "res-num";
  restaurantsNumDiv.appendChild(span);

  restaurantsToDisplay.forEach((restaurant) => {
    const restaurantCard = document.createElement("restaurant-card");
    restaurantCard.data = restaurant;
    mainElement.appendChild(restaurantCard);
  });

  updateButtons();
  updateUrl(page);
}

function updateButtons() {
  document.getElementById("prev-button").disabled = currentPage === 1;
  document.getElementById("next-button").disabled =
    currentPage * itemsPerPage >= numRes -1;
}

function updateUrl(page) {
  history.pushState(null, null, `?page=${page}`);
}

function nextPage() {
  if (currentPage * itemsPerPage < numRes-1) {
    currentPage++;
    renderRestaurants(currentPage);
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderRestaurants(currentPage);
  }
}

function getPageFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("page")) || 1;
}

window.onload = function () {
  currentPage = getPageFromUrl();
  renderRestaurants(currentPage);
};
