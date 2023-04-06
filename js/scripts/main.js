var slide_hero = new Swiper(".slide-principal", {
  effect: "fade",
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});

var slide_plans = new Swiper(".slide-plans", {
  // Default parameters
  slidesPerView: 2,
  spaceBetween: 10,
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
  },
});
