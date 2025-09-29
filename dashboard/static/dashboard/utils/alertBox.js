const modal = document.querySelector('.alert-modal');
const alertMessage = document.querySelector('.alert-message');
const alertBtn = document.querySelector('.close-alert-btn');

function showAlert(message) {
    alertMessage.textContent = message;
    modal.style.display = 'flex';
}

alertBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

export { showAlert };