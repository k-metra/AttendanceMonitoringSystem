import { getCookie } from "../utils/getCookie.js";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const attendanceForm = $("#attendance-form");

attendanceForm.addEventListener("submit", async e => {
    e.preventDefault();

    const formData = new FormData(attendanceForm);
    const csrfToken = getCookie('csrftoken');

    const resp = await fetch('/attendance/log-api/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfToken
        },
        body: formData
    });
    
    if (resp.ok) {
        const data = await resp.json();
        console.log(data);
    } else {
        console.error("Error submitting form");
    }
})