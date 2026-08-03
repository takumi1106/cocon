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

  // ギャラリーを画面幅より長い2つの同一セットにして、継ぎ目なく流す
  const galleryTrack = document.querySelector(".gallery__track");

  if (galleryTrack) {
    const templateItems = Array.from(galleryTrack.children, (item) =>
      item.cloneNode(true)
    );
    let galleryResizeTimer;

    const buildGalleryLoop = () => {
      const measuringItems = templateItems.map((item) => item.cloneNode(true));
      galleryTrack.replaceChildren(...measuringItems);

      const batchWidth = galleryTrack.scrollWidth;
      const firstItemWidth = measuringItems[0]?.getBoundingClientRect().width || 0;
      const repeatsPerHalf = batchWidth > 0
        ? Math.max(
            1,
            Math.ceil((window.innerWidth + firstItemWidth) / batchWidth)
          )
        : 1;
      const loopItems = [];

      for (let half = 0; half < 2; half += 1) {
        for (let repeat = 0; repeat < repeatsPerHalf; repeat += 1) {
          templateItems.forEach((item) => {
            const clone = item.cloneNode(true);

            if (half === 1 || repeat > 0) clone.setAttribute("aria-hidden", "true");
            loopItems.push(clone);
          });
        }
      }

      galleryTrack.replaceChildren(...loopItems);
    };

    buildGalleryLoop();

    window.addEventListener("resize", () => {
      window.clearTimeout(galleryResizeTimer);
      galleryResizeTimer = window.setTimeout(buildGalleryLoop, 150);
    });
  }
});

const instagramFeed = document.querySelector(".js-instagram-feed");

if (instagramFeed) {
  const accessToken = instagramFeed.dataset.instagramToken?.trim();
  const apiBase = instagramFeed.dataset.instagramApiBase || "https://graph.instagram.com";
  const userId = instagramFeed.dataset.instagramUserId || "me";
  const limit = Number(instagramFeed.dataset.instagramLimit) || 6;
  const profileUrl = instagramFeed.dataset.instagramProfile;

  const createInstagramPost = (post) => {
    const link = document.createElement("a");
    const image = document.createElement("img");
    const imageUrl = post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url;

    link.href = post.permalink || profileUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    image.src = imageUrl;
    image.alt = post.caption ? `Instagram投稿: ${post.caption}` : "Instagram投稿画像";
    image.loading = "lazy";

    link.appendChild(image);
    return link;
  };

  const loadInstagramFeed = async () => {
    if (!accessToken) return;

    const endpoint = new URL(`${apiBase.replace(/\/$/, "")}/${userId}/media`);
    endpoint.searchParams.set("fields", "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp");
    endpoint.searchParams.set("limit", String(limit));
    endpoint.searchParams.set("access_token", accessToken);

    try {
      const response = await fetch(endpoint);

      if (!response.ok) return;

      const feed = await response.json();
      const posts = Array.isArray(feed.data) ? feed.data : [];
      const imagePosts = posts
        .filter((post) => post.media_url || post.thumbnail_url)
        .sort((first, second) => new Date(second.timestamp) - new Date(first.timestamp))
        .slice(0, limit);

      if (imagePosts.length === 0) return;

      instagramFeed.replaceChildren(...imagePosts.map(createInstagramPost));
    } catch (error) {
      console.error("Instagram投稿の取得に失敗しました", error);
    }
  };

  loadInstagramFeed();
}

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

//メインヴィジュアル
const slides = document.querySelectorAll(".mainvisual__img");
const loadingScreen = document.querySelector(".loading-screen");

let current = 0;

if (slides.length > 1) {
  setInterval(() => {
    const previousSlide = slides[current];
    previousSlide.classList.add("is-leaving");

    current = (current + 1) % slides.length;
    const nextSlide = slides[current];
    nextSlide.classList.add("active");

    window.setTimeout(() => {
      previousSlide.classList.remove("active", "is-leaving");
    }, 1200);
  }, 5000);
}

if (loadingScreen) {
  window.setTimeout(() => {
    loadingScreen.classList.add("is-hidden");
  }, 2000);

  loadingScreen.addEventListener("transitionend", () => {
    loadingScreen.remove();
  }, { once: true });
}
