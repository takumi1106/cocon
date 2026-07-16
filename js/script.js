document.addEventListener("DOMContentLoaded", () => {
  console.log("script.js 読み込み成功");

  // ハンバーガーメニュー
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".header_nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      nav.classList.toggle("active");
    });
  } else {
    console.log("ハンバーガー要素が見つかりません");
  }

  // スライダー
  const slider = document.querySelector(".slider__track");
  const next = document.querySelector(".slider__next");
  const prev = document.querySelector(".slider__prev");

  if (slider && next && prev) {
    const image = slider.querySelector("img");

    if (image) {
      const getSlideWidth = () => {
        const sliderStyle = window.getComputedStyle(slider);
        const gap = parseFloat(sliderStyle.columnGap) || 0;

        return image.getBoundingClientRect().width + gap;
      };

      next.addEventListener("click", () => {
        slider.scrollBy({
          left: getSlideWidth(),
          behavior: "smooth",
        });
      });

      prev.addEventListener("click", () => {
        slider.scrollBy({
          left: -getSlideWidth(),
          behavior: "smooth",
        });
      });
    }
  } else {
    console.log("スライダー要素が見つかりません");
  }

  // 画像拡大モーダル
  const modal = document.querySelector(".modal");
  const modalImage = document.querySelector(".modal__image");
  const sliderImages = document.querySelectorAll(".slider__track img");

  if (modal && modalImage) {
    sliderImages.forEach((image) => {
      image.addEventListener("click", () => {
        modalImage.src = image.src;
        modalImage.alt = image.alt;
        modal.classList.add("active");
      });
    });

    modal.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  // 各FAQの回答を開閉
  const toggles = document.querySelectorAll(".ques__toggle");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const box = toggle.closest(".ques__box");
      const answer = box?.querySelector(".ques__answer");

      if (answer) {
        answer.hidden = !answer.hidden;
      }
    });
  });

  // FAQ一覧全体を開閉
  const openBtn = document.querySelector(".ques__open");
  const wrapper = document.querySelector(".ques__wrapper");

  if (openBtn && wrapper) {
    openBtn.addEventListener("click", () => {
      wrapper.hidden = !wrapper.hidden;
    });
  }
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