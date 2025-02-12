window.addEventListener("DOMContentLoaded", init);

async function init() {
  animateText();
  document.getElementById("menu-button").addEventListener("click", toggleMenu);
}

function animateText() {
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
    }
  }, 100);
}

function toggleMenu() {
  console.log("clicked");
  const sideMenu = document.getElementById("sidebar");
  if (sideMenu.style.width === "150px") {
    sideMenu.style.width = "0";
  } else {
    sideMenu.style.width = "150px";
  }
  console.log("done");
}
