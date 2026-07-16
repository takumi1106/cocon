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