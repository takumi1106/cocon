const slider = document.querySelector(".menu__slider");
const next = document.querySelector(".menu__next");
const prev = document.querySelector(".menu__prev");

// 画像1枚の幅 + gap
const image = slider.querySelector("img");
const gap = 32;
const slideWidth = image.offsetWidth + gap;

next.addEventListener("click", () => {
  slider.scrollBy({
    left: slideWidth,
    behavior: "smooth"
  });
});

prev.addEventListener("click", () => {
  slider.scrollBy({
    left: -slideWidth,
    behavior: "smooth"
  });
});

const modal = document.querySelector(".modal");
const modalImage = document.querySelector(".modal__image");

const images = document.querySelectorAll(".menu__slider img");

images.forEach((image) => {
  image.addEventListener("click", () => {
    modal.classList.add("active");
    modalImage.src = image.src;
    modalImage.alt = image.alt;
  });
});

modal.addEventListener("click", () => {
  modal.classList.remove("active");
});

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".header_nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav.classList.toggle("active");
});

//menu.html
const toggles = document.querySelectorAll(".ques__toggle");

toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const box = toggle.closest(".ques__box");
    const answer = box.querySelector(".ques__answer");

    answer.hidden = !answer.hidden;
  });
});