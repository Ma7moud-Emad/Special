// open or close settings
let setting = document.querySelector(".setting");
let settingIcon = document.querySelector(".setting .setting-icon");

settingIcon.addEventListener("click", () => {
  setting.classList.toggle("active-setting");
  if (setting.classList.contains("active-setting")) {
    settingIcon.style.animation = "rotate-icon 1s infinite 0s linear";
  } else {
    settingIcon.style.animation = "";
  }
});

// change main-color from setting
let colors = document.querySelectorAll("ul.color li");
let root = document.documentElement;

colors.forEach((li) => {
  li.onclick = () => {
    colors.forEach((ele) => {
      ele.classList.remove("active");
    });
    li.classList.add("active");
    root.style.setProperty("--main-color", `${li.dataset.color}`);
    window.localStorage.setItem("color", `${li.dataset.color}`);
  };
});

// save end main-color in local storge
if (window.localStorage.getItem("color") !== null) {
  root.style.setProperty(
    "--main-color",
    `${window.localStorage.getItem("color")}`
  );
  colors.forEach((li) => {
    if (li.dataset.color === window.localStorage.getItem("color")) {
      li.classList.add("active");
    }
  });
}

// change rangom background in landing page
let landingPage = document.querySelector(".landing-page");
// collection of backgrounds
let backgrounds = [
  "../images/one.jpg",
  "../images/two.jpg",
  "../images/three.jpg",
  "../images/four.jpg",
  "../images/five.jpg",
];

// control on random background (stop or work in setting)
let btnRandomBack = document.querySelectorAll(".background-setting button");
let option = true;

// varible to store setInterval
let changeBackgroundHandelar;

// function to choose random background every 3s
function randomImges() {
  changeBackgroundHandelar = setInterval(() => {
    let randomIindex = Math.floor(Math.random() * backgrounds.length);
    landingPage.style.backgroundImage = `url(${backgrounds[randomIindex]})`;
  }, 3000);
}

// check background represent in localStorage
if (window.localStorage.background !== null) {
  if (window.localStorage.background == "yes") {
    randomImges();
    document.querySelector("[data-background=yes]").classList.add("active");
  } else {
    clearInterval(changeBackgroundHandelar);
    document.querySelector("[data-background=no]").classList.add("active");
  }
}
// loop around buttons (two option)
btnRandomBack.forEach((btn) => {
  btn.addEventListener("click", () => {
    // loop around buttons to remove actiove class
    btnRandomBack.forEach((ele) => {
      ele.classList.remove("active");
    });
    // add active class to clicked button and store to localStorage
    btn.classList.add("active");
    window.localStorage.setItem("background", `${btn.dataset.background}`);
    // check if background is yes or no
    if (btn.dataset.background == "yes") {
      option = true;
      randomImges();
    } else {
      option = false;
      clearInterval(changeBackgroundHandelar);
    }
  });
});

// our skills anamition
window.onscroll = () => {
  if (scrollY > document.querySelector(".skills").offsetHeight) {
    document.querySelectorAll(".skills span").forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  } else {
    document.querySelectorAll(".skills span").forEach((span) => {
      span.style.width = "0%";
    });
  }
};

// gallery
let galleryImgs = document.querySelectorAll(".gallery .imgs div");

galleryImgs.forEach((img) => {
  img.onclick = () => {
    let overlay = document.createElement("div");
    overlay.className = "gallery-show";

    let imgBox = document.createElement("div");

    if (img.firstChild.alt != "") {
      let titleImg = document.createElement("h2");
      titleImg.innerHTML = img.firstChild.alt;
      imgBox.appendChild(titleImg);
    }

    let image = document.createElement("img");
    image.src = img.firstChild.src;
    imgBox.appendChild(image);

    let btn = document.createElement("button");
    btn.innerHTML = "X";
    imgBox.appendChild(btn);
    btn.onclick = () => {
      btn.parentElement.parentElement.remove();
    };

    overlay.appendChild(imgBox);
    document.body.appendChild(overlay);
  };
});
