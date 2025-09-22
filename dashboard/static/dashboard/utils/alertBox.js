const alertBox = document.getElementById('alert-box');
const alertMessage = document.getElementById('alert-message');
const alertBtn = document.getElementById('alert-btn');

function showAlert(message) {
    alertMessage.textContent = message;
    alertBox.style.display = 'flex';
}

alertBtn.addEventListener('click', () => {
    alertBox.style.display = 'none';
});

export { showAlert };