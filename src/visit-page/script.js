window.addEventListener("DOMContentLoaded", init);

async function init() {
  hideElement("home-page-button");
  animateText(() => {
    unhideElement("home-page-button");
  });
}

function animateText(callback) {
  const textElement = document.getElementById("animated-text");
  const textContent = textElement.textContent;
  const cursor = document.getElementById("cursor");
  textElement.textContent = "";
  const splitText = textContent.split("");
  textElement.appendChild(cursor);

  let charIndex = 0;
  const timer = setInterval(() => {
    const span = document.createElement("span");
    span.textContent = splitText[charIndex];
    textElement.insertBefore(span, cursor);
    charIndex++;
    if (charIndex === splitText.length) {
      clearInterval(timer);
      if (callback) {
        callback();
      }
    }
  }, 100);
}

function hideElement(elementId) {
  const element = document.getElementById(elementId);
  element.style.visibility = "hidden";
}

function unhideElement(elementId) {
  const element = document.getElementById(elementId);
  element.style.visibility = "visible";
}
