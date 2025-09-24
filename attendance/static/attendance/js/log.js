import { getCookie } from "../utils/getCookie.js";
import { showAlert } from "../utils/alertBox.js";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const attendanceForm = $("#attendance-form");

const checkIp = async () => {
    await(fetch('/attendance/check-ip-api/'))
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status} ${response.statusText}`);
        }

        return response.json();
    })
    .then(data => {
        if (data.status) {
            console.log(data.message);
        } else {
            console.log(data.message);
            console.log("it was false.");

            window.location.replace("/attendance/already-logged/")
        }
    })

}

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

        if (data.status) {
            showAlert(data.message);
        } else {
            showAlert("Something went wrong trying to log your attendance.")
        }
    } else {
        showAlert("Something went wrong trying to submit your attendance.")
        console.error("Error submitting form");
    }
})

checkIp();