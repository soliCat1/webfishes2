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


function resize() {
  parent.postMessage(
    JSON.stringify({
      w_right: document.body.offsetWidth,
    }),
    '*'
  );
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
  let open = document.querySelector(".info-btn");
  let cl = document.querySelector(".info-btn2");
  let btn = document.querySelector(".image");

  gsap.set('.container', {autoAlpha: 1});

  open.addEventListener("click",function (){
    gsap.to(".info",{opacity:1,pointerEvents:"visible"});
  });

  cl.addEventListener("click",function (){
    gsap.to(".info",{opacity:0,pointerEvents:"none"});
  });

  let animeBtn = gsap.timeline({paused: true})
    .to(".plus",{scale:1.3});

  let tl = gsap.timeline({delay: 1,paused:true})
    .from(".text",{duration:1,xPercent:100,opacity:0,ease:"back"})
    .from(".logo-text1",{duration:1,xPercent:100,opacity:0,ease:"back"})

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

    obj={blockActive: true, rightBlockActive: true};
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

        } catch (e) {
        }
      }
    }
  });
});



