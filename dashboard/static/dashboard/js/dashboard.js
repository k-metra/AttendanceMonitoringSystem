const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const logoutBtn = $("#logoutBtn");
const exportBtn = $("#exportBtn");
const clearBtn = $("#clearBtn");
const confirmationModal = $("#confirmationBox");

const confirmationNo = $("#confirm-clear-no");
const confirmationYes = $("#confirm-clear-yes");

const getCsrfToken = () => {
    let token = null
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split('; ');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];

            if (cookie.substring(0, 10) === ('csrftoken=')) {
                token = decodeURIComponent(cookie.substring(10));
            }
        }
    }

    return token;
}

exportBtn.addEventListener("click", async () => {
    window.location.replace("/dashboard/export/");
});

confirmationNo.addEventListener("click", () => {
    confirmationModal.style.display = "none";
})

confirmationYes.addEventListener("click", async () => {
    confirmationModal.style.display = "none";
    const token = getCsrfToken();

    if (!token) {
        console.error("Cannot find CSRF token.");
        return;
    }
    const response = await fetch("/dashboard/clear/", {
        method: "POST",
        headers: { "X-CSRFToken": token }
    });

    const data = await response.json();

    if (data.success) {
        window.location.reload();
    } else {
        console.error("Failed to clear attendance records: ", data.message);
    }
});

clearBtn.addEventListener("click", () => {
    confirmationModal.style.display = "flex";
});

logoutBtn.addEventListener("click", async () => {
    window.location.replace("/dashboard/logout/");
});