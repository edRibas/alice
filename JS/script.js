'use strict';


// ARRAY OF YOUTUBE VIDEOS
var videoIds = [
  // Ursinho de Dormir
  "YnqqTzis3EA",
  // Until I Found You
  "GhQxrCrVSyw",
  // Epitáfio
  "I29JUuotXG4",
  // Relicário
  "4hkgux2wa-8",
  // Malandragem
  "EoADyYFj3SM",
  // Céu Azul
  "0dLX40UMUKo",
  // Só os Loucos Sabem
  "OiigOaCxu84",
  // Banana Pancakes
  "OkyrIRyrRdY",
  // Do I Wanna Know
  "bpOSxM0rNPM",
  // Levo Comigo
  "5QzdBsZ2PI0",
  // Se...
  "ZSZyth38-zk",
  // Eu Amo Você
  "qBBwXuEV4jA",
  // Azul da Cor do Mar
  "A9kTV-wpiWk",
  // Fifa
  "jDJAayyk224",
  // Wildest Dreams
  "nkmNsAyqi1I",
  // What Makes You Beautiful
  "mfavkCY52MI",
  // Perfect
  "I1Y5_DyyPxg",
  // As It Was
  "Qfm6nfz1QNQ",
  // Sign of The Times
  "We4QQCMwyrg",
  // Matilda
  "UBvEdTURLfI",
  // Golden
  "U8p1IHq0ImQ",
  // Watermelon Sugar
  "nQA97xS49LQ",
  // Love Yourself
  "fTfVKo5fDnU",
  // Maps
  "Y7ix6RITXM0",
  // Sugar
  "N1BcpzPGlYQ",
  // Bad Blood
  "d2_FwIIQvWQ",
  // Can't Help Falling In Love
  "TlrNxJqODBc",
  // Upside Down
  "vQKsPDiEHpQ",
  // Flake
  "u3S6_NtxARY",
  // I've Got Sunshine
  "y3KJ7d2qBoA",
  // Folha de Bananeira
  "N4_lw2G1YeA",
  // You Are My Sunshine
  "5AtvXdmPe3A",
  // My Way
  "qQzdAsjWGPg",
  // When You Love Someone
  "kGe0eyFc-JA",
];

function playRandomSong() {
  // GET A RANDOM VIDEO FROM videoIds ARRAY
  var randomIndex = Math.floor(Math.random() * videoIds.length);
  // GET A RANDOM ID FROM THE ARRAY
  var randomVideoId = videoIds[randomIndex];
  // OPEN VIDEO IN NEW TAB
  window.open("https://www.youtube.com/watch?v=" + randomVideoId);
}

// PLAY RANDOM SONG BUTTON
var button = document.getElementById("songButton");
button.addEventListener("click", playRandomSong);


// PRELOAD
/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);


/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});