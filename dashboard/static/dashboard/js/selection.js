const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const deleteSelectedBtn = $("#deleteSelectedBtn");
const editBtn = $("#editEntryBtn");
const selectAllCheckbox = $("#selectAllCheckbox");
const logCheckboxes = $$(".logCheckbox");
const selectionCount = $("#selection-count")
const headerCheckbox = $("#header-checkbox")

const getCsrf = () => {
    let token = null
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split('; ');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];

            if (cookie.substring(0, 10) === ('csrftoken=')) {
                token = decodeURIComponent(cookie.substring(10));
                break;
            }
        }
    }

    return token;
}

class SelectionManager {
    constructor() {
        this.selectedIds = new Set();
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateUI();
    }

    bindEvents() {
        // Select all functionality
        selectAllCheckbox?.addEventListener("change", (e) => {
            this.selectAll(e.target.checked);
        }); 

        headerCheckbox?.addEventListener("change", (e) => {
            this.selectAll(e.target.checked);
        });

        const checkboxes = $$(".row-checkbox");
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                 const logId = e.target.value;
            if (e.target.checked) {
                this.selectedIds.add(logId);
                e.target.closest('tr').classList.add('selected');
            } else {
                this.selectedIds.delete(logId);
                e.target.closest('tr').classList.remove('selected');
            }

            this.updateUI();
            })
        })

        deleteSelectedBtn?.addEventListener("click", () => {
            if (this.selectedIds.size > 0) {
                this.deleteSelected();
            }
        });
    }

    selectAll(checked) {
        const checkboxes = $$(".row-checkbox");
        checkboxes.forEach(checkbox => {
            checkbox.checked = checked;
            const logId = checkbox.value;
            if (checked) {
                this.selectedIds.add(logId);
                checkbox.closest('tr').classList.add('selected');
            } else {
                this.selectedIds.delete(logId);
                checkbox.closest('tr').classList.remove('selected');
            }
        });

        this.updateUI();
    }

    updateUI() {
        const count = this.selectedIds.size;
        const totalCheckboxes = $$('.row-checkbox').length;

        /*if (selectionCount) {
            selectionCount.style.display = count > 0 ? 'inline' : 'none';
            selectionCount.textContent = count > 0 ? `${count} selected` : '';
        }*/

        if (deleteSelectedBtn) {
            deleteSelectedBtn.disabled = count === 0;
            const trashPrefix = "<i class='fa fa-trash-can'></i>&nbsp;&nbsp;";
            deleteSelectedBtn.innerHTML = count > 0 ? `${trashPrefix}Remove Selected (${count})` : `${trashPrefix}Remove Selected`;
        }

        if (editBtn) {
            editBtn.disabled = (count !== 1);
        }

        editBtn.disabled = count !== 1;

        const allSelected = (count === totalCheckboxes && totalCheckboxes > 0);
        const someSelected = (count > 0 && count < totalCheckboxes);

        if (selectAllCheckbox) {
            selectAllCheckbox.checked = allSelected;
            selectAllCheckbox.indeterminate = someSelected;
        }

        if (headerCheckbox) {
            headerCheckbox.checked = allSelected;
            headerCheckbox.indeterminate = someSelected;
        }

        async function deleteSelected() {
            const token = getCsrf();

            if (!token) {
                console.error("Cannot find CSRF token.");
                return;
            }

            try {
                const response = await fetch("dashboard/delete-selected/", {
                    method: "POST",
                    body: JSON.stringify({
                        log_ids: Array.from(this.selectedIds)
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": token
                    }
                });

                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }
            } catch (error) {
                console.error("Error deleting selected logs:", error);
            }
        }
    }

    getSelectedIds() {
        return Array.from(this.selectedIds);
    }

    clearSelection() {
        this.selectedIds.clear();
        $$('.row-checkbox').forEach(checkbox => {
            checkbox.checked = false;
            checkbox.closest('tr').classList.remove('selected');
        });

        if (selectAllCheckbox) selectAllCheckbox.checked = false;
        if (headerCheckbox) headerCheckbox.checked = false;
        this.updateUI();
    }

    deleteSelected = async () => {
        const token = getCsrf();

        if (!token) {
            console.error("Cannot find CSRF token.");
            return;
        }

        try {
            const response = await fetch("/dashboard/delete-selected/", {
                method: "POST",
                body: JSON.stringify({
                    log_ids: Array.from(this.selectedIds)
                }),
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": token
                }
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                window.location.reload();
            }
        } catch (error) {
            console.error("Error deleting selected logs:", error);
        }
    }
}

const selectionManager = new SelectionManager();