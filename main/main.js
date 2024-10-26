let close = document.querySelectorAll(".close");
const vid = document.querySelector('video');
const mute = document.querySelector('.mute');
const sound = document.querySelector('.sound');
const play = document.querySelector('.play');
let animeLeft = gsap.timeline({paused:true})
  .to(".container",{autoAlpha:1})
  .from(".left",{xPercent:-100,ease:"linear"});
let animeRight = gsap.timeline({paused:true})
  .to(".container",{autoAlpha:1})
  .from(".right",{xPercent:100,ease:"linear"});
let animeTop = gsap.timeline({paused:true})
  .to(".container",{autoAlpha:1})
  .from(".top",{yPercent:-100,ease:"linear"});


var swiper = new Swiper('.swiper1', {
  speed: 1000,
  slidesPerView: 1,
  autoplay: false,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
  },
});

swiper.on("slideChange",function (e){
  if(e.realIndex === 1){
    document.querySelector(".block2").classList.add("in");
  } else {
    document.querySelector(".block2").classList.remove("in");
  }
  if(e.realIndex === 0){
    document.querySelector(".block1").classList.add("in");
  } else {
    document.querySelector(".block1").classList.remove("in");
  }
});

var swiper2 = new Swiper('.swiper2', {
  speed: 1000,
  slidesPerView: 1,
  autoplay: false,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
  },
});

swiper2.on("slideChange",function (e){
  if(e.realIndex === 1){
    document.querySelector(".block4").classList.add("in");
  } else {
    document.querySelector(".block4").classList.remove("in");
  }
  if(e.realIndex === 0){
    document.querySelector(".block3").classList.add("in");
    gsap.to(".info1",{opacity:1});
  } else {
    document.querySelector(".block3").classList.remove("in");
    gsap.to(".info1",{opacity:0});
  }
});

window.addEventListener('message', function (event) {
  if (typeof event.data !== undefined) {
    var parseData = event.data;

    if (typeof parseData !== 'object') {
      try {
        parseData = JSON.parse(parseData);

        if (parseData.topBlockActive !== undefined && parseData.topBlockActive) {
          animeTop.play();
          var playPromise = vid.play();

          if (playPromise !== undefined) {
            playPromise.then(_ => {

            }).catch(error => {
            });
          }

          if (vid.muted) {
            sound.style.display = 'none';
            mute.style.display = 'block';
          }

          if (vid.paused) {
            play.style.display = 'block';
            sound.style.display = 'none';
            mute.style.display = 'none';
          }
        }

        if (parseData.leftBlockActive !== undefined && parseData.leftBlockActive) {
            animeLeft.play();
        }

        if (parseData.rightBlockActive !== undefined && parseData.rightBlockActive) {
          animeRight.play();
        }

        if (parseData.close !== undefined && parseData.close) {

        }

      } catch (e) {
      }
    }
  }
});



vid.addEventListener('timeupdate', function () {
  play.addEventListener('click', () => {
    var playPromise = vid.play();

    if (playPromise !== undefined) {
      playPromise.then(_ => {
        lastSentProgress = -1
      })
        .catch(error => {

        });
    }
    if(vid.muted){
      sound.style.display = 'none';
      mute.style.display = 'block';
    } else {
      sound.style.display = 'block';
      mute.style.display = 'none';
    }

  });


  if (vid.played) {
    play.style.display = 'none';
  }
  if (vid.paused) {
    play.style.display = 'block';
    sound.style.display = 'none';
    mute.style.display = 'none';
  }
});

sound.addEventListener('click', function () {
  vid.muted = true;
  sound.style.display = 'none';
  mute.style.display = 'block';
});

mute.addEventListener('click', function () {
  vid.muted = false;
  mute.style.display = 'none';
  sound.style.display = 'block';
});


close.forEach(cl=>{
  if(cl.classList.contains("close-left")){
    cl.addEventListener("click",()=>{
      closeBanners();
      animeLeft.reverse();
    });
  }
  if(cl.classList.contains("close-right")){
    cl.addEventListener("click",()=>{
      closeBanners();
      animeRight.reverse();
    });
  }
  if(cl.classList.contains("close-top")){
    cl.addEventListener("click",()=>{
      closeBanners();
      animeTop.reverse();
    });
  }
})

function closeBanners() {
  obj={close: true};
  parent.postMessage(JSON.stringify(obj), '*');

  parent.window.postMessage(JSON.stringify({
    type:"skinad",
    target:"bgmain",
    info:{
      method:"removeCssClassFromTarget",
      params:{
        className:'pointerEventsActivate'
      }
    }
  }), "*");
}