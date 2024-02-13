// import {debounce} from "../utils/debounce.mjs";
// const {debounce} = require('../utils/debounce.js');

function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
};
//burger menu

const burgerBtn = document.querySelector(".header-mobile__button"),
    burgerBtnRectangle = document.querySelectorAll(".header-mobile__rectangle"),
    burgerContent = document.querySelector(".header-mobile__content");


burgerBtn.addEventListener("click", () => {
    if (burgerBtn.clicked) {
        burgerBtnRectangle[0].classList.add("header-mobile__rectangle-one");
        burgerBtnRectangle[1].classList.add("header-mobile__rectangle-two");
        burgerBtnRectangle[2].classList.add("header-mobile__rectangle-three");
        burgerContent.style.display = "flex";
    }
    if (!burgerBtn.clicked) {
        burgerBtnRectangle[0].classList.remove("header-mobile__rectangle-one");
        burgerBtnRectangle[1].classList.remove("header-mobile__rectangle-two");
        burgerBtnRectangle[2].classList.remove("header-mobile__rectangle-three");
        burgerContent.style.display = "none";
    }
    burgerBtn.clicked = !burgerBtn.clicked;
})


//modal
let modal = document.querySelector(".modal"),
    openModalBtn = document.querySelectorAll(["[data-openModal]"]),
    closeModalBtn = document.querySelector("[data-closeModal]"),
    body = document.querySelector("body");


function openModal() {
    modal.style.display = "block";
    body.style.overflow = "hidden";
}
function closeModal() {
    modal.style.display = "none";
    body.style.overflow = "";
}

openModalBtn.forEach((el) => el.addEventListener("click", openModal));
closeModalBtn.addEventListener("click", closeModal)
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
})

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
})

//animation

let animItems = document.querySelectorAll('.jobs__item');
animBox = document.querySelector('.jobs__body');

function boxAnimate() {
    animItems.forEach((item) => {
        item.classList.add("jobs__item_animate");
    })
}

// function showModalByScroll() {
//     if (window.scrollY >= animBox.offsetHeight - window.innerHeight) {
//         boxAnimate();
//         window.removeEventListener('scroll', showModalByScroll);
//     }
// }


// window.addEventListener('scroll', showModalByScroll);



function showModalByScroll() {
    if (window.scrollY > animBox.getBoundingClientRect().top) {
        boxAnimate();
        window.removeEventListener('scroll', showModalByScroll);
        return null;
    } else {
        window.addEventListener('scroll', debounce(showModalByScroll), 200);
    }
}

showModalByScroll();

//chat

let chat = document.querySelector(".chat__content"),
    messagesBox = document.querySelector(".chat__messages"),
    openBtn = document.querySelector("[data-openChat]"),
    closeBtn = document.querySelectorAll("[data-closeChat]"),
    chatInput = document.querySelector(".chat__input"),
    inputBtn = document.querySelector("[data-send]"),
    buttonsBox = document.querySelector(".chat__buttons"),
    notification = document.querySelector(".chat__notification"),
    audio = new Audio("../audio/message.mp3"),
    flag = false;

window.addEventListener("click", () => {
    if (flag === false) {
        setTimeout(() => {
            notification.style.display = "flex";
            audio.play();
            flag = true;
        }, 1000);
    }

})


function openChat() {
    chat.style.display = "block";
    openBtn.style.zIndex = "-2";
    buttonsBox.style.animation = "none";
    notification.style.display = "none";
}
function closeChat() {
    chat.style.display = "none";
    openBtn.style.zIndex = "";
    buttonsBox.style.animation = "puls 2s infinite ease-in-out";
}

openBtn.addEventListener("click", openChat);
closeBtn.forEach((el) => el.addEventListener("click", closeChat));

const message = chatInput.value;

function sendMessage() {
    const message = chatInput.value;
    if (message === "") return;
    chatInput.value = "";
    let element = document.createElement("div");
    element.classList.add("chat__message");
    element.classList.add("chat__messages__me");
    element.innerHTML = `
    <div class="chat__message__body">
    <h3 class="chat__message__text">${message}</h3>
  </div>
  `
    messagesBox.append(element);

    setTimeout(() => {
        let element = document.createElement("div");
        element.classList.add("chat__message");
        element.innerHTML = `
                  <img src="img/logotip.png" alt="avatar" class="chat__message-avatar" />
                  <div class="chat__message__body">
                    <h3 class="chat__message__text">Thank you, your message has been passed on to the agent</h3>
                  </div>
        `
        messagesBox.append(element);
    }, 2000);
}

inputBtn.addEventListener("click", sendMessage);
window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
    }
})


//courses carts

const coursesBox = document.querySelector(".courses__content");

class CreateCoursesCart {
    constructor(src, alt, time, level, title, subtitle) {
        this.src = src;
        this.alt = alt;
        this.time = time;
        this.level = level;
        this.title = title;
        this.subtitle = subtitle;
    }

    render() {
        let element = document.createElement("div")
        element.classList.add("courses__item")
        element.innerHTML = `
        <img class="courses__img" src=${this.src} alt=${this.alt}>
                <div class="courses__info">
                  <h3 class="courses__time">${this.time}</h3>
                  <h3 class="courses__level">${this.level}</h3>
                </div>
                <div class="courses__texts-block">
                  <h3 class="courses__title">${this.title}</h3>
                  <p class="courses__subtitle">${this.subtitle}</p>
                  </p>
                  <button class="courses__btn-big">Learn more</button>
                </div>
        `
        coursesBox.append(element);
    }
}

new CreateCoursesCart(
    "img/coursesFront.jpeg",
    "frontend",
    "9 months",
    "Beginner",
    "Frontend developer",
    "Learn the fundamentals of web design, including HTML, CSS, and responsive design principles. Develop the skills to create visually appealing and user-friendly websites.",
).render();

new CreateCoursesCart(
    "img/coursesBack.jpeg",
    "BackEnd",
    "12 months",
    "Advanced",
    "Backend developer",
    "The backend development course provides a complete immersion in the world of the back-end side of web applications.",
).render();

new CreateCoursesCart(
    "img/coursesFullstack.jpg",
    "Fullstack",
    "24 months",
    "Advanced",
    "Fullstack developer",
    "The Fullstack development course provides a complete immersion in the world of the back-end and front-end web applications.",
).render();

new CreateCoursesCart(
    "img/cousesDevops.jpg",
    "DevOps",
    "15 months",
    "Advanced",
    "DevOps",
    "The DevOps course provides a thorough understanding of the principles and practices aimed at improving collaboration between developers and the operations team."
).render();

new CreateCoursesCart(
    "img/coursesGameDev.png",
    "GameDev",
    "9 months",
    "Beginner",
    "Game developer",
    "The Fundamentals of Game Development with C#, Unity, and C++ course provides students with a unique opportunity to learn fundamental skills in game creation"
).render();

new CreateCoursesCart(
    "img/coursesData.jpg",
    "Data Science",
    "24 months",
    "Advanced",
    "Data Science",
    "The Data Science course provides students with a unique opportunity to learn fundamental skills in data science and machine learning"
).render();


//tabs

const tabsContent = document.querySelectorAll(".teachers__content"),
    tabs = document.querySelectorAll(".teachers__name"),
    tabsParent = document.querySelector(".teachers__list");

function hideTabContent() {
    tabsContent.forEach(item => {
        item.classList.add("hide");
        item.classList.remove("show", 'fade');
    });
    tabs.forEach(item => {
        item.classList.remove("teachers__name-active");
    })
}

function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("teachers__name-active");
}
hideTabContent();
showTabContent();

tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("teachers__name")) {
        tabs.forEach((item, i) => {
            if (target == item) {
                hideTabContent();
                showTabContent(i);
            }
        })
    }

})

//drag&drop

let zoneOne = document.querySelectorAll(".selection__box"),
    zoneTwo = document.querySelector(".selection__items"),
    items = document.querySelectorAll(".selection__item"),
    box = document.querySelector(".selection");

zoneOne.forEach((item) => {
    item.ondragover = function allowDrop(e) {
        e.preventDefault();
    }
    item.ondrop = function drop(e) {
        let itemId = e.dataTransfer.getData("id");
        e.target.append(document.getElementById(itemId));
        console.log(zoneTwo.children.length);
        if (zoneTwo.children.length === 0) {
            zoneTwo.style.display = "none";
            openModal();
        }
        item.style.filter = "drop-shadow(0 0 10px rgb(255, 255, 255))";
        item.style.border = "none";
    }
})

items.forEach((item) => {
    item.ondragstart = function drag(e) {
        e.dataTransfer.setData("id", e.target.id);
    }
})

//little anim on price

const buton = document.querySelectorAll(".prices__button"),
    aniBox = document.querySelectorAll(".prices__item");

buton.forEach((item, i) => {
    item.addEventListener("mouseenter", () => {
        aniBox[i].style.filter = "drop-shadow(0 0 10px rgb(34,139,34))";
    })
    item.addEventListener("mouseleave", () => {
        aniBox[i].style.filter = "none";
    })
})

//dark theme

const checkbox = document.querySelector(".theme__checkbox"),
    head = document.querySelector("head");

checkbox.addEventListener("click", (e) => {
    if (checkbox.checked) {
        head.insertAdjacentHTML("beforeend", '<link rel="stylesheet" href="css/dark.theme.css">');
    }
    checkbox.addEventListener("click", (e) => {
        if (!checkbox.checked) {
            document.querySelector("link[href='css/dark.theme.css']").remove();
        }
    })
})