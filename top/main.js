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

var w_left;
var w_right;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var setNewBackground = (src) => {
  let newStyle;
  if (src.includes("Meria")) {
    newStyle = 'url("./assets/bg-Meria.jpg") top 0 left 0 / cover repeat';
  } else if (src.includes("Stefan")) {
    newStyle = 'url("./assets/bg-Stefan.jpg") top 0 left 0 / cover repeat';
  } else if (src.includes("Stina")) {
    newStyle = 'url("./assets/bg-Stina.jpg") top 0 left 0 / cover repeat';
  } else if (src.includes("Hiba")) {
    newStyle = 'url("./assets/bg-Hiba.jpg") top 0 left 0 / cover repeat';
  } else if (src.includes("Felix")) {
    newStyle = 'url("./assets/bg-Felix.jpg") top 0 left 0 / cover repeat';
  }
  bg.style.background = newStyle;
};

window.addEventListener("load", () => {
  loader();
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

          var scrollLeft = (scrollWidth() - 1) / 2;
          bg.style.transform = "translateX(calc(-50% - " + scrollLeft + "px))";

          if (parseData.w_left !== undefined) {
            w_left = parseData.w_left;
          }

          if (w_right !== undefined && w_left !== undefined) {
            bg.style.left = "calc(50% + " + (w_right - w_left) / 2 + "px)";
          }
        } catch (e) {}
      }
    }
  });
});
