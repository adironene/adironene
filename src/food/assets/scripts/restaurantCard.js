import * as util from '../../../assets/scripts/util.js';

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

  set data(data) {
    if (!data) return;

    const article = this.shadowRoot.querySelector("article");
    article.innerHTML = '';

    const img = document.createElement('img');
    img.src = data.imgSrc;
    img.alt = data.imgAlt;
    article.appendChild(img);

    const titleP = document.createElement('p');
    titleP.className = 'title';
    const titleA = document.createElement('a');
    titleA.href = data.titleLnk;
    titleA.textContent = data.titleTxt;
    titleP.appendChild(titleA);
    article.appendChild(titleP);

    const ratingDiv = document.createElement('div');
    ratingDiv.className = 'rating';
    const ratingSpan = document.createElement('span');
    ratingSpan.textContent = data.rating;
    ratingDiv.appendChild(ratingSpan);

    let starsHTML = '';
    const fullStars = Math.floor(data.rating);
    const decimalPart = data.rating % 1;

    for (let i = 0; i < fullStars; i++) {
      const starContainer = document.createElement('div');
      starContainer.className = 'star-container';
      const starImg = document.createElement('img');
      starImg.src = '../food/assets/imgs/icons/cat_star.png';
      starImg.alt = 'full star';
      starContainer.appendChild(starImg);
      ratingDiv.appendChild(starContainer);
    }

    if (decimalPart > 0) {
      const partialStarContainer = document.createElement('div');
      partialStarContainer.className = 'star-container';
      partialStarContainer.style.width = `${decimalPart * 24}px`;
      const partialStarImg = document.createElement('img');
      partialStarImg.src = '../food/assets/imgs/icons/cat_star.png';
      partialStarImg.alt = 'partial star';
      partialStarContainer.appendChild(partialStarImg);
      ratingDiv.appendChild(partialStarContainer);
    }

    article.appendChild(ratingDiv);

    const locationP = document.createElement('p');
    locationP.className = 'location';
    locationP.textContent = data.location;
    article.appendChild(locationP);

    const priceAndCuisine = document.createElement('span');
    priceAndCuisine.className = 'col-span';
    priceAndCuisine.textContent = data.price + " - " + data.cuisine;
    article.appendChild(priceAndCuisine);
  }
}

customElements.define('restaurant-card', restaurantCard);
