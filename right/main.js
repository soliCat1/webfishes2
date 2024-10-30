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

function resize() {
  parent.postMessage(
    JSON.stringify({
      w_right: document.body.offsetWidth,
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

var setNewBackground = (src) => {
  let newStyle;
  if (src.includes('Meria')) {
    newStyle = 'url("./assets/bg-Meria.jpg") top 0 left 0 / cover repeat';
  } else if (src.includes('Stefan')) {
    newStyle = 'url("./assets/bg-Stefan.jpg") top 0 left 0 / cover repeat';
  } else if (src.includes('Stina')) {
    newStyle = 'url("./assets/bg-Stina.jpg") top 0 left 0 / cover repeat';
  } else if (src.includes('Hiba')) {
    newStyle = 'url("./assets/bg-Hiba.jpg") top 0 left 0 / cover repeat';
  } else if (src.includes('Felix')) {
    newStyle = 'url("./assets/bg-Felix.jpg") top 0 left 0 / cover repeat';
  }
  bg.style.background = newStyle;
};

window.addEventListener("load", function () {
  loader();
  resize();
  window.addEventListener("message", function (event) {
    if (typeof event.data !== undefined) {
      var parseData = event.data;
      var objectData = JSON.parse(parseData);

      if (objectData.hasOwnProperty("src")) {
        setNewBackground(objectData.src);
      }
      
      if (typeof parseData !== "object") {
        try {
          parseData = JSON.parse(parseData);

          bg.style.height = parseData.h + "px";
          bg.style.width = parseData.w + "px";
        } catch (e) {}
      }
    }
  });
});
