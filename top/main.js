function loader() {
  setTimeout(function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
      document.body.classList.add('loaded');
      document.body.classList.remove('loaded_hiding');
    }, 1000);
  }, 1000);
}

var bg = document.getElementsByClassName('bg')[0];

function scrollWidth() {
  var div = document.createElement('div');

  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';

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

window.addEventListener('load', () => {
  loader();
  let btn = document.querySelector(".image");

  gsap.set('.container', {autoAlpha: 1});
  let animeBtn = gsap.timeline({paused: true})
    .to(".plus",{scale:1.3});

  let tl = gsap.timeline({delay: 2, paused: true})

  btn.addEventListener("mouseenter",()=>{
    animeBtn.play();
  });

  btn.addEventListener("mouseleave",()=>{
    animeBtn.reverse();
  });


  btn.addEventListener("click",function (e){
    e.preventDefault();
    e.stopPropagation();

    obj={blockActive: true, topBlockActive: true};
    parent.postMessage(JSON.stringify(obj), '*');

    parent.window.postMessage(JSON.stringify({
      type:"skinad",
      target:"bgmain",
      info:{
        method:"addCssClassToTarget",
        params:{
          className:'pointerEventsActivate',
          value:'pointer-events: unset !important;',
        }
      }
    }), "*");
  });






  window.addEventListener('message', function (event) {
    if (typeof event.data !== undefined) {
      var parseData = event.data;

      if (typeof parseData !== 'object') {
        try {
          parseData = JSON.parse(parseData);

          bg.style.height = parseData.h + 'px';
          bg.style.width = parseData.w + 'px';

          var scrollLeft = (scrollWidth() - 1) / 2;
          bg.style.transform = 'translateX(calc(-50% - ' + scrollLeft + 'px))';

          if (parseData.w_right !== undefined) {
            w_right = parseData.w_right;
            if(w_right <= 200){
              bg.classList.add("small");
              bg.classList.remove("big");
              bg.classList.remove("medium");
            }
            if(w_right > 200 && w_right <=250){
              bg.classList.add("medium");
              bg.classList.remove("big");
              bg.classList.remove("small");
            }
            if(w_right > 250 && w_right <=350){
              bg.classList.add("big");
              bg.classList.remove("medium");
              bg.classList.remove("small");
            }
            if(w_right > 350){
              bg.classList.remove("big");
              bg.classList.remove("medium");
              bg.classList.remove("small");
            }
          }

          if (parseData.w_left !== undefined) {
            w_left = parseData.w_left;
          }

          if (w_right !== undefined && w_left !== undefined) {
            bg.style.left = 'calc(50% + ' + (w_right - w_left) / 2 + 'px)';
          }


        } catch (e) {
        }
      }
    }
  });


});
