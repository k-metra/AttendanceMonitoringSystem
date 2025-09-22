const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const logoutBtn = $("#logoutBtn");

logoutBtn.addEventListener("click", async () => {
    window.location.replace("/dashboard/logout/");
});