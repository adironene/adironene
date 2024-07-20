import * as util from "../../../assets/scripts/util.js";

window.addEventListener("DOMContentLoaded", init);

async function init() {
  try {
    let restaurants = await util.fetchJSONData();
    let restaurantsNumDiv = document.getElementById("text-container");
    const span = document.createElement("span");
    let numCards = 20;
    span.textContent = numCards + " of " + restaurants.length + " Restaurants Visited";
    span.className = "res-num";
    restaurantsNumDiv.appendChild(span);
    addRestaurantsToDocument(restaurants, numCards);
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
function addRestaurantsToDocument(restaurants, n) {
  const mainElement = document.querySelector("main");
  for(let i = 0; i < n; i++){
    const restaurant = restaurants[i];
    const restaurantCard = document.createElement("restaurant-card");
    restaurantCard.data = restaurant;
    mainElement.appendChild(restaurantCard);
  }
//   restaurants.forEach((restaurant) => {
//     const restaurantCard = document.createElement("restaurant-card");
//     restaurantCard.data = restaurant;
//     mainElement.appendChild(restaurantCard);
//   });
}
