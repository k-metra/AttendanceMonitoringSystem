import { showAlert } from "../utils/alertBox.js";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const loginForm = $("#login-form");
const loginBtn = $("#login-btn");

loginForm.addEventListener("submit", async e => {
    e.preventDefault();
    loginBtn.disabled = true;
    loginBtn.textContent = "Logging in...";

    const formData = new FormData(loginForm);
    const token = document.cookie.split('; ').find(row => row.startsWith('csrftoken=')).split('=')[1];

    const request = await fetch("/dashboard/login-api/", {
        method: "POST",
        headers: {
            'X-CSRFToken': token
        },
        body: formData
    });

    const data = await request.json();

    if (data.status) {
        window.location.href = "/dashboard/";
    } else {
        showAlert(data.message || "Login failed. Please try again.");
    }

    loginBtn.disabled = false;
    loginBtn.textContent = "Login";
})