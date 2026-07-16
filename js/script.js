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