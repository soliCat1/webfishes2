function loader() {
  setTimeout(function () {
    document.body.classList.add("loaded_hiding");
    window.setTimeout(function () {
      document.body.classList.add("loaded");
      document.body.classList.remove("loaded_hiding");
    }, 1000);
  }, 1000);
}

var bg = document.getElementsByClassName("bg")[0];

function scrollWidth() {
  var div = document.createElement("div");

  div.style.overflowY = "scroll";
  div.style.width = "50px";
  div.style.height = "50px";

  document.body.append(div);
  var scrollWidth = div.offsetWidth - div.clientWidth;

  div.remove();

  return scrollWidth;
}

function resize() {
  parent.postMessage(
    JSON.stringify({
      w_left: document.body.offsetWidth,
    }),
    "*"
  );
}

window.onresize = function (event) {
  resize();
};

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var swiper = document.querySelector(".swiper");

function sendMessage(src) {
  parent.window.postMessage(
    JSON.stringify({
      src,
    }),
    "*"
  );
}

function initSwiper() {
  if (swiper) {
    new Swiper(swiper, {
      direction: "horizontal",
      loop: true,
      autoplay: true,
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper__button--next",
        prevEl: ".swiper__button--prev",
      },
      on: {
        slideChange: function () {
          const index = this.activeIndex;
          const src = this.slides[index]
            .querySelector(".swiper__image")
            .getAttribute("src");
          sendMessage(src);
        },
      },
    });
  }
}

window.addEventListener("load", function () {
  loader();
  resize();
  initSwiper();
  window.addEventListener("message", function (event) {
    if (typeof event.data !== undefined) {
      var parseData = event.data;

      if (typeof parseData !== "object") {
        try {
          parseData = JSON.parse(parseData);

          bg.style.height = parseData.h + "px";
          bg.style.width = parseData.w + "px";
          bg.style.left = "-" + scrollWidth() + "px";
        } catch (e) {}
      }
    }
  });
});
