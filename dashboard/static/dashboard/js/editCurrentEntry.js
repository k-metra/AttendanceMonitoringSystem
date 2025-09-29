import { getCsrfToken } from "../utils/getCsrf.js";
import { showAlert } from "../utils/alertBox.js";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const editModal = $(".edit-modal")
const editBtn = $("#editEntryBtn");
const overlay = $(".edit-entry-box");
const closeBtn = $(".close-edit-btn");
const form = $("#editEntryForm");

const formInputs = {
    full_name: $("#editFullName"),
    student_id: $("#editStudentNumber"),
};

class EditBox {
    constructor(log_id, student_id, full_name) {
        this.log_id = log_id;
        this.student_id = student_id;
        this.full_name = full_name;
        this.__init__();
    }

    __init__ () {
        // TODO: Initialize the edit box functionality
        formInputs.full_name.value = this.full_name;
        formInputs.student_id.value = this.student_id;
        editModal.style.display = 'flex';

        this.bindEvents();
    }

    bindEvents() {
        form?.addEventListener('submit', this.onSubmit);

        closeBtn?.addEventListener('click', this.close);
    }

    onSubmit = async (e) => {
        console.log("Submitted");
        e.preventDefault();
        this.close();

        const data = new FormData(form);

        data.append("log_id", this.log_id);

        await fetch("/dashboard/edit-api/", {
            method: "POST",
            body: data,
            headers: {
                "X-CSRFToken": getCsrfToken(),
            }
        })
        .then(resp => {
            if (!resp.ok) {
                showAlert("An error occurred. Please try again.");
                throw new Error("Network response was not ok");
            } else {
                return resp.json();
            }
        }).then(data => {
            if (data.status) {
                window.location.reload();
            } else {
                showAlert(data.message || "An error occurred. Please try again.");
            }
        })
    }

    close() {
        closeBtn?.removeEventListener('click', this.close);
        editModal.style.display = 'none';
        form?.removeEventListener('click', this.onSubmit);
    }
}

export { EditBox };