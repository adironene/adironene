window.addEventListener("DOMContentLoaded", init);

async function init() {}

document.addEventListener("DOMContentLoaded", function () {
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
});
