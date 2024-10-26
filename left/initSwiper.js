const swiper = document.querySelector('.swiper');

const sendMessage = (src) => {
  parent.window.postMessage(JSON.stringify({
    src,
  }), "*");
};

const initSwiper = () => {
  if (swiper) {
  new Swiper(swiper, {
      direction: 'horizontal',
      loop: true,
      autoplay: true,
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination',
      },
      on: {
        slideChange: function () {
          const index = this.activeIndex;
          const src = this.slides[index].querySelector('.swiper__image').getAttribute("src");
          sendMessage(src);
        },
      },
    });
  }
};

initSwiper()