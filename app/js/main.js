// import {debounce} from "../utils/debounce.mjs";
// const {debounce} = require('../utils/debounce.js');


function debounce(func, timeout = 300){
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
    }else{
      console.log("s")
      window.addEventListener('scroll', debounce(showModalByScroll), 200);
    }
  }
  
  showModalByScroll();

//   function debounce(func, timeout = 300){
//     let timer;
//     return (...args) => {
//       clearTimeout(timer);
//       timer = setTimeout(() => { func.apply(this, args); }, timeout);
//     };
//   }

//   function saveInput(){
//     console.log('Saving data');
//   }


