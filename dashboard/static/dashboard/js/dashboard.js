import { EntryBox } from "./addNewEntry.js";
import { EditBox } from "./editCurrentEntry.js";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const logoutBtn = $("#logoutBtn");
const exportBtn = $("#exportBtn");
const clearBtn = $("#clearBtn");
const editBtn = $("#editEntryBtn");
const confirmationModal = $("#confirmationBox");
const addRecordBtn = $(".add-btn");
const scrollToBottomBtn = $("#scrollToBottomBtn");
const addBtnMarker = $("#addBtnMarker");

const headerHeight = $("header").offsetHeight;

const confirmationNo = $("#confirm-clear-no");
const confirmationYes = $("#confirm-clear-yes");

const bottomSection = $("#bottom");

scrollToBottomBtn?.addEventListener('click', () => {
    const bottomSection = $("#bottom");
    bottomSection.scrollIntoView({ behavior: 'smooth' });
})

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            addRecordBtn.classList.remove("floating");
            exportBtn.classList.remove("floating");
            scrollToBottomBtn.classList.remove("active");
        } else {
            addRecordBtn.classList.add("floating");
            exportBtn.classList.add("floating");
            scrollToBottomBtn.classList.add("active");
        }
    })
}, {
    root: null,
    threshold: 0,
    rootMargin: `-${headerHeight}px 0px 0px 0px`
});

const bottomObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            scrollToBottomBtn.classList.remove("active");
        } else {
            scrollToBottomBtn.classList.add("active");
        }
    })
})

observer.observe(addBtnMarker);
bottomObserver.observe(bottomSection);

window.addEventListener("scroll", () => {
    if (window.scrollY === 0) {
        addRecordBtn.classList.remove("floating");  
        exportBtn.classList.remove("floating");
    } else if (window.scrollY === document.body.scrollHeight) {
        scrollToBottomBtn.classList.remove("active");
    }
}); 

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
    const today = new Date()
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    
    const filename = `attendance_${day}-${month}-${year}.csv`;

    const link = document.createElement('a');
    link.href = '/dashboard/export/';
    link.download = filename;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

confirmationNo.addEventListener("click", () => {
    confirmationModal.style.display = "none";
})

clearBtn.addEventListener("click", () => {
    confirmationModal.style.display = "flex";

    confirmationYes.addEventListener("click", async () => {
        confirmationYes.removeEventListener("click", this);
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
});

logoutBtn.addEventListener("click", async () => {
    window.location.replace("/dashboard/logout/");
});

addRecordBtn?.addEventListener("click", () => {
    new EntryBox();
})

editBtn.addEventListener("click", () => {
    const selected = $("tr.selected");

    const log_id = selected.querySelector(".Log_ID").textContent;
    const student_id = selected.querySelector(".Student_Number").textContent;
    const full_name = selected.querySelector(".Full_Name").textContent;
    new EditBox(log_id, student_id, full_name);
})

/*window.addEventListener("beforeunload", (e) => {
    e.preventDefault();
    
}); */