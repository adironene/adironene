import * as util from '../../../assets/scripts/util.js'

class restaurantCard extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({ mode: "open" });
    let markup = document.createElement("article");
    let style = document.createElement("style");
    util.fetchCSSAsString("../food/assets/styles/cardStyle.css").then((cssText) => {
      style.textContent = cssText;
    });

    shadow.appendChild(style);
    shadow.appendChild(markup);
  }

  /**
   * Called when the .data property is set on this element.
   * @param {Object} data - The data to pass into the <recipe-card> must be of the
   *                        following format:
   *                        {
   *                          "imgSrc": "string",
   *                          "imgAlt": "string",
   *                          "titleLnk": "string",
   *                          "titleTxt": "string",
   *                          "rating": number,
   *                          "location": "string"
   *                        }
   */
  set data(data) {
    // If nothing was passed in, return
    if (!data) return;

    const article = this.shadowRoot.querySelector("article");
    let starsHTML = "";
    const fullStars = Math.floor(data.rating);
    const decimalPart = data.rating % 1;

    // Generate full stars
    for (let i = 0; i < fullStars; i++) {
      starsHTML += `<div class="star-container"><img src='../food/assets/imgs/icons/cat_star.png' alt="full star"></div>`;
    }

    // Generate partial star if needed
    if (decimalPart > 0) {
      starsHTML += `
            <div class="star-container" style="width: ${decimalPart * 24}px;">
              <img src='../food/assets/imgs/icons/cat_star.png' alt="partial star">
            </div>
          `;
    }
    article.innerHTML = `
      <img src="${data.imgSrc}"
        alt="${data.imgAlt}">
      <p class="title">
        <a href="${data.titleLnk}">${data.titleTxt}</a>
      </p>
      <div class="rating">
        <span>${data.rating}</span>
        ${starsHTML}
      </div>
      <p class="location">
        ${data.location}
      </p>
    `;
  }
}

customElements.define("restaurant-card", restaurantCard);
