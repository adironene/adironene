import * as util from "../../../assets/scripts/util.js";

window.addEventListener("DOMContentLoaded", init);

async function init() {
  try {
    let restaurants = await util.fetchJSONData();
    addRestaurantsToDocument(restaurants);
  } catch (error) {
    console.error("Error fetching JSON data:", error);
  }
}

/**
 * Takes in an array of restaurants and for each restaurant creates a
 * new <restaurant-card> element, adds the restaurant data to that card
 * using element.data = {...}, and then appends that new restaurant
 * to <main>
 * @param {Array<Object>} restaurants An array of restaurants
 */
function addRestaurantsToDocument(restaurants) {
  const mainElement = document.querySelector("main");
  restaurants.forEach((restaurant) => {
    const restaurantCard = document.createElement("restaurant-card");
    restaurantCard.data = restaurant;
    mainElement.appendChild(restaurantCard);
  });
}
