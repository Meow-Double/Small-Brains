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