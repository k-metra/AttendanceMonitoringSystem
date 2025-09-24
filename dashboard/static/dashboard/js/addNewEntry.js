import { getCsrfToken } from "../utils/getCsrf.js";

const $ = (selector) => document.querySelector(selector);

const overlay = $(".add-entry-box");
const closeBtn = $(".close-btn");
const form = $("#addEntryForm");

class EntryBox {
    constructor() {
        this.__init__();
    }

    __init__() {
        this.bindEvents();
        overlay.style.display = 'flex';
    }


    
    submitEvent = async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const token = getCsrfToken();

        await fetch("/dashboard/add-entry-api/", {
            method: 'POST',
            headers: {
                "X-CSRF-Token": token,
            },
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                console.error("Failed to add new entry: ", response.statusText, response.status);
                alert("Failed to add new entry. Please try again.");
                return;
            }

            return response.json();
        })
        .then(data => {
            if (data.status) {
                alert("Successfully created new entry.");
                window.location.reload();
            } else {
                if (data && data.message) {
                    alert(data.message);
                }
            }
        })
    }

    close = () => {
        overlay.style.display = 'none';
        this.unbindEvents();
    }

    bindEvents = () => {
        closeBtn.addEventListener("click", this.close);
        form.addEventListener('submit', this.submitEvent);
    }

    unbindEvents = () => {
        closeBtn.removeEventListener('click', this.close);
        form.removeEventListener('submit', this.submitEvent);
    }
}

export { EntryBox };