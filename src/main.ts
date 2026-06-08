import p5 from "p5";
import './style.css';
import { HanabiSpace } from "./HanabiSpace";

const scrollBtn = document.getElementById("scrollTopBtn") as HTMLButtonElement;

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const open_close = () => {
  const fadeBoxes = document.querySelectorAll(".fade-box");
  const vidIframes = document.querySelectorAll(".vid-iframe");
  const allVisible = Array.from(fadeBoxes).every(box => box.classList.contains("is-visible"))
    && Array.from(vidIframes).every(iframe => iframe.classList.contains("is-visible"));
  toggleAllBtn.textContent = allVisible ? "すべて閉じる" : "すべて開く";
  return allVisible;
}

const hiddenText = "を隠す";

const addHiddenText = (element: Element) => {
  if (!element.textContent.includes(hiddenText)) {
    element.textContent += hiddenText;
  }
}

const removeHiddenText = (element: Element) => {
  if (element.textContent.includes(hiddenText)) {
    element.textContent = element.textContent.replace(hiddenText, "");
  }
}

const toggleAllBtn = document.getElementById("toggleAllBtn") as HTMLButtonElement;
toggleAllBtn.addEventListener("click", () => {
  const fadeBoxes = document.querySelectorAll(".fade-box");
  const vidIframes = document.querySelectorAll(".vid-iframe");
  const toggles = document.querySelectorAll(".toggle");

  const allVisible = open_close();

  if (allVisible) {
    // Hide all boxes and iframes
    fadeBoxes.forEach(box => box.classList.remove("is-visible"));
    vidIframes.forEach(iframe => iframe.classList.remove("is-visible"));
    toggles.forEach(toggle => removeHiddenText(toggle));
  } else {
    // Show all boxes and iframes
    fadeBoxes.forEach(box => box.classList.add("is-visible"));
    vidIframes.forEach(iframe => iframe.classList.add("is-visible"));
    toggles.forEach(toggle => addHiddenText(toggle));
  }
  open_close();
});

const fadeContainers = document.querySelectorAll(".fade-container");

fadeContainers.forEach((container) => {
  const toggle = container.querySelector(".toggle") as Element;
  const fadeBox = container.querySelector(".fade-box") as Element;

  toggle.addEventListener("click", function () {
    fadeBox.classList.toggle("is-visible");

    if (fadeBox.classList.contains("is-visible")) {
      addHiddenText(toggle);
    } else {
      removeHiddenText(toggle);
    }
    open_close();
  });
});

const vidIframes = document.querySelectorAll(".vid-iframe");
vidIframes.forEach((iframe) => {
  const toggle = iframe?.parentElement?.querySelector(".toggle") as Element;

  toggle.addEventListener("click", function () {
    iframe.classList.toggle("is-visible");

    if (iframe.classList.contains("is-visible")) {
      addHiddenText(toggle);
    } else {
      removeHiddenText(toggle);
    }
    open_close();
  });
});

export let crapNaruko = false;

const narukoBtn = document.getElementById("narukoBtn") as HTMLButtonElement;
narukoBtn.addEventListener("click", function () {
  if (!crapNaruko) {
    crapNaruko = true;
  }
});

const sketch = (p: p5) => {
  const minWorldSize = 800;
  let worldWidth: number;
  let worldHeight: number;

  let space: HanabiSpace;

  function setup() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    setWorldSize();
    p.noStroke();

    space = new HanabiSpace(p);
    space.addHanabi(Math.random() * worldWidth, Math.random() * worldHeight);
  }

  function draw() {
    if (crapNaruko) {
      space.addHanabi(Math.random() * worldWidth, Math.random() * worldHeight);
      crapNaruko = false;
    }
    p.push();
    let scaleFactor = p.width / worldWidth;
    p.scale(scaleFactor);
    p.background(0);
    space.update();
    p.pop();
  }

  function windowResized() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    setWorldSize();
  }

  function setWorldSize() {
    const w = p.width;
    const h = p.height;
    if (w < h) {
      worldWidth = minWorldSize;
      worldHeight = worldWidth * h / w;
    } else {
      worldHeight = minWorldSize;
      worldWidth = worldHeight * w / h;
    }
  }
  
  p.setup = setup;
  p.draw = draw;
  p.windowResized = windowResized;
}

new p5(sketch);