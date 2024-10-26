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


function resize() {
  parent.postMessage(JSON.stringify({
    w_left: document.body.offsetWidth
  }), '*');
}

window.onresize = function (event) {
  resize();
};

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', function () {
  loader();
  resize();
  let btn = document.querySelector(".image");

  gsap.set('.container', {autoAlpha: 1});

  let animeBtn = gsap.timeline({paused: true})
    .to(".plus",{scale:1.3});

  let tl = gsap.timeline({delay: 1,paused:true})
    .from(".text",{duration:1,xPercent:-100,opacity:0,ease:"back"})
    .fromTo(".logo-text2",{xPercent:-100,opacity:0},{duration:1,xPercent:0,opacity:1,ease:"back"});

  tl.play();

  btn.addEventListener("mouseenter",()=>{
    animeBtn.play();
  });

  btn.addEventListener("mouseleave",()=>{
    animeBtn.reverse();
  });

  btn.addEventListener("click",function (e){
    e.preventDefault();
    e.stopPropagation();

    obj={blockActive: true, leftBlockActive: true};
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
          bg.style.left = '-' + scrollWidth() + 'px';

        } catch (e) {
        }
      }
    }
  });
});



// setInterval(() => {
//   parent.window.postMessage(JSON.stringify({
//     type:"click",
//     message:"has been"
//   }), "*");
//   console.log(1)
// }, 1000)