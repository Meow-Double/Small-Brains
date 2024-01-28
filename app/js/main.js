// import {debounce} from "../utils/debounce.mjs";
// const {debounce} = require('../utils/debounce.js');


function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
};



//modal
let modal = document.querySelector(".modal"),
    openModalBtn = document.querySelectorAll(["[data-openModal]"]),
    closeModalBtn = document.querySelector("[data-closeModal]");


function openModal() {
    modal.style.display = "block";
    modal.style.overflow = "hidden";
}
function closeModal() {
    modal.style.display = "none";
    modal.style.overflow = "";
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

const chat = document.querySelector(".chat__content"),
    messagesBox = document.querySelector(".chat__messages"),
    openBtn = document.querySelector("[data-openChat]"),
    closeBtn = document.querySelectorAll("[data-closeChat]"),
    chatInput = document.querySelector(".chat__input"),
    inputBtn = document.querySelector("[data-send]");


function openChat() {
    chat.style.display = "block";
    openBtn.style.zIndex = "-2";
}
function closeChat() {
    chat.style.display = "none";
    openBtn.style.zIndex = "";
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



