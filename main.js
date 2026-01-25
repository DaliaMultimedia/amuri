// MENÚ MOBILE
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// TOAST POÉTICO
const toastBtn = document.getElementById("toastBtn");
const toast = document.getElementById("toast");

toastBtn.addEventListener("click", () => {
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 5000);
});
