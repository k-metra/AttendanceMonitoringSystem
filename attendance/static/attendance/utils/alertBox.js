const alertBox = document.getElementById('alert-box');
const alertMessage = document.getElementById('alert-message');
const alertBtn = document.getElementById('alert-btn');

class alertBoxManager {
    constructor(message, reloadOnClick) {
        alertMessage.textContent = message;
        alertBox.style.display = 'flex';

        this.reloadOnClick = reloadOnClick;
        this.__init__();
    }

    __init__() {
        alertBtn.addEventListener('click', () => {
            alertBox.style.display = 'none';
            alertBtn.removeEventListener('click', this);

            if (this.reloadOnClick) {
                window.location.reload();
            }
        })
    }
}

export { alertBoxManager }