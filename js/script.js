const slider = document.querySelector(".menu__slider");
const next = document.querySelector(".menu__next");
const prev = document.querySelector(".menu__prev");

if (slider && next && prev) {
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
}

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

if (modal) {
  modal.addEventListener("click", () => {
    modal.classList.remove("active");
  });
}

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".header_nav");

if (hamburger && nav) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
  });
}

//menu.html
const toggles = document.querySelectorAll(".ques__toggle");

toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const box = toggle.closest(".ques__box");
    const answer = box.querySelector(".ques__answer");

    answer.hidden = !answer.hidden;
  });
});

// FAQ一覧を開閉
const openBtn = document.querySelector(".ques__open");
const wrapper = document.querySelector(".ques__wrapper");

openBtn.addEventListener("click", () => {
  wrapper.hidden = !wrapper.hidden;
});

// 各質問を開閉
const toggle = document.querySelectorAll(".ques__toggle");

toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const box = toggle.closest(".ques__box");
    const answer = box.querySelector(".ques__answer");

    answer.hidden = !answer.hidden;
  });
});

const eventPicture = document.querySelector(".event__picture");
const eventImages = document.querySelectorAll(".event__picture img");

if (eventPicture && eventImages.length > 1) {
  let currentEventImage = 0;

  eventPicture.classList.add("is-started");
  eventImages[currentEventImage].classList.add("is-active");

  setInterval(() => {
    eventImages[currentEventImage].classList.remove("is-active");
    currentEventImage = (currentEventImage + 1) % eventImages.length;
    eventImages[currentEventImage].classList.add("is-active");
  }, 4000);
}

const aboutSwitchPicture = document.querySelector(".about-switch-picture");
const aboutSwitchImages = document.querySelectorAll(".about-switch-picture__image");
const aboutSwitchSections = document.querySelectorAll("[data-about-switch-section]");
const eventSection = document.querySelector(".event");

if (aboutSwitchPicture && aboutSwitchImages.length > 0 && aboutSwitchSections.length > 0) {
  const switchAboutImage = () => {
    const switchPoint = window.innerHeight;
    const hideBeforeEventPoint = window.innerHeight * 0.8;
    const firstSectionRect = aboutSwitchSections[0].getBoundingClientRect();
    const lastSectionRect = aboutSwitchSections[aboutSwitchSections.length - 1].getBoundingClientRect();
    const eventSectionRect = eventSection?.getBoundingClientRect();
    const isBeforeEvent = !eventSectionRect || eventSectionRect.top > hideBeforeEventPoint;
    const isInSwitchArea = firstSectionRect.top <= switchPoint && lastSectionRect.bottom >= switchPoint && isBeforeEvent;

    aboutSwitchPicture.classList.toggle("is-visible", isInSwitchArea);

    if (!isInSwitchArea) {
      return;
    }

    let currentIndex = 0;

    aboutSwitchSections.forEach((section) => {
      const rect = section.getBoundingClientRect();

      if (rect.top <= switchPoint) {
        currentIndex = Number(section.dataset.aboutSwitchSection);
      }
    });

    aboutSwitchImages.forEach((image, index) => {
      image.classList.toggle("is-active", index === currentIndex);
    });
  };

  window.addEventListener("scroll", switchAboutImage);
  window.addEventListener("resize", switchAboutImage);
  switchAboutImage();
}

const mobileFadeImages = document.querySelectorAll(
  ".shop__picture, .owner__picture, .cameraman__picture, .illustrator__picture, .event__picture"
);

if (mobileFadeImages.length > 0) {
  const showMobileImages = () => {
    if (!window.matchMedia("(max-width: 1023px)").matches) return;

    mobileFadeImages.forEach((image) => {
      if (image.getBoundingClientRect().top < window.innerHeight * 0.85) {
        image.classList.add("is-show");
      }
    });
  };

  window.addEventListener("scroll", showMobileImages);
  window.addEventListener("resize", showMobileImages);
  showMobileImages();
}
