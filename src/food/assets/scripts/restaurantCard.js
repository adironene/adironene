import * as util from '../../../util/assets/scripts/util.js';

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

    // =============================
    // Image Carousel
    // =============================

    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'carousel-container';

    const imgContainer = document.createElement('div');
    imgContainer.className = 'carousel-images';

    carouselContainer.appendChild(imgContainer);
    article.appendChild(carouselContainer);

    const imgPath = data.imgSrc
    const baseMatch = imgPath.match(/(.*\/)([^\/]+?)(\d+)\.(png|jpg|jpeg|webp)$/i);
    let basePath, baseName, ext;

    if (baseMatch) {
      basePath = baseMatch[1]; // e.g. ../food/assets/imgs/NY/
      baseName = baseMatch[2]; // e.g. name
      ext = baseMatch[4];      // e.g. png
    } else {
      basePath = imgPath.substring(0, imgPath.lastIndexOf('/') + 1);
      baseName = imgPath.substring(imgPath.lastIndexOf('/') + 1, imgPath.lastIndexOf('.'));
      ext = imgPath.substring(imgPath.lastIndexOf('.') + 1);
    }

    console.log("basePath", basePath);
    console.log("baseName", baseName);
    console.log("ext", ext);

    let imgIndex = 1;
    const loadNextImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
      });
    };

    const loadImages = async () => {
      while(true) {
        const testSrc = `${basePath}${baseName}${imgIndex}.${ext}`;
        const exists = await loadNextImage(testSrc);
        if (!exists) break;

        const img = document.createElement('img');
        img.src = testSrc;
        img.alt = baseName;
        imgContainer.appendChild(img);
        imgIndex++;
      }
    
      if (imgContainer.children.length === 0){
        const img = document.createElement('img');
        img.src = data.imgSrc;
        img.alt = data.imgAlt;
        imgContainer.appendChild(img);
      }

      if (imgContainer.children.length > 1){
        const leftArrow = document.createElement('button');
        leftArrow.className = 'carousel-arrow left';
        leftArrow.textContent = '❮';

        const rightArrow = document.createElement('button');
        rightArrow.className = 'carousel-arrow right';
        rightArrow.textContent = '❯';

        carouselContainer.appendChild(leftArrow);
        carouselContainer.appendChild(rightArrow);

        let currentIndex = 0;
        const updateCarousel = () => {
          imgContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        leftArrow.addEventListener('click', () => {
          currentIndex = (currentIndex - 1 + imgContainer.children.length) % imgContainer.children.length;
          updateCarousel()
        });

        rightArrow.addEventListener('click', () => {
          currentIndex = (currentIndex + 1) % imgContainer.children.length;
          updateCarousel()
        });

        this.shadowRoot.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') leftArrow.click();
          if (e.key === 'ArrowRight') rightArrow.click();
        });
      }
    };

    loadImages();

    // =============================
    // Restaurant Info Section
    // =============================

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
