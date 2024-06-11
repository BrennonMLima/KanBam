// modal.js
const addCardButton = document.getElementById('addCardButton');
const deleteModalButton = document.getElementById('deleteModalButton');
const addModal = document.getElementById('add-modal');
const closeButton = addModal.querySelector('.close');
const confirmButton = document.getElementById('confirmButton');
const inviteModal = document.getElementById('invite-modal');
const inviteButton = document.getElementById('invite-icon');
const CopyInvite = document.getElementById('copybtn');
const editModal = document.getElementById('edit-modal');
const confirmEditButton = document.getElementById('confirmEditButton');
const deleteButton = document.getElementById('deleteButton');

addCardButton.addEventListener('click', () => {
    if (addModal.style.display === 'block') {
        closeModal();
    } else {
        openModal();
    }
});

deleteModalButton.addEventListener('click', () => {
    closeModal();
});

window.addEventListener('DOMContentLoaded', () => {
    closeModal();
});

confirmButton.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const status = getStatus();
    const responsibles = Array.from(document.querySelectorAll('#add-modal .ks-cboxtags input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
    const targetDropzone = document.querySelector('.board');
    const boardId = targetDropzone.parentNode.id; 
    addNewCardAndSave(title, description, date, status, targetDropzone, boardId, responsibles); 
    clearAddModal();
    closeModal();
});

CopyInvite.addEventListener('click', () => {
    closeInviteModal();
});

inviteButton.addEventListener('click', () => {
    if (inviteModal.style.display === 'block') {
        closeInviteModal();
    } else {
        openInviteModal();
    }
});

document.getElementById("invite").addEventListener("input", function() {
    const inviteValue = this.value.trim();
    const urlInput = document.getElementById("url");
    const baseUrl = "invite.com/";

    if (inviteValue !== "") {
        const slashIndex = baseUrl.lastIndexOf("/");
        const newValue = baseUrl.substring(0, slashIndex + 1) + inviteValue;
        urlInput.value = newValue;
    } else {
        urlInput.value = baseUrl;
    }
});

confirmEditButton.addEventListener('click', () => {
    const cardId = confirmEditButton.getAttribute('data-card-id');
    const title = document.getElementById('edit-title').value;
    const description = document.getElementById('edit-description').value;
    const date = document.getElementById('edit-date').value;
    const status = getStatus();
    const responsibles = Array.from(document.querySelectorAll('#edit-modal .ks-cboxtags input[type="checkbox"]:checked')).map(checkbox => checkbox.value);

    editCardAndSave(cardId, title, description, date, status, responsibles);
    editCard(cardId, title, description, date, status, responsibles);
    closeEditModal();
});

deleteButton.addEventListener('click', () => {
    const cardId = confirmEditButton.getAttribute('data-card-id');
    deleteCard(cardId);
    deleteCardAndSave(cardId);
    closeEditModal();
});

function openModal() {
    addModal.style.display = 'block';
    addCardButton.style.transform = 'rotate(45deg)';
}

function closeModal() {
    addModal.style.display = 'none';
    addCardButton.style.transform = 'rotate(0deg)';
}

function getStatus() {
    const radioButton = document.querySelector('input[name="status"]:checked');
    return radioButton ? radioButton.value : 'green';
}

function openInviteModal() {
    inviteModal.style.display = 'block';
}

function closeInviteModal() {
    inviteModal.style.display = 'none';
    inviteButton.style.transform = 'rotate(0deg)';
}

function openEditModal(cardId) {
    editModal.style.display = 'block';

    const cardElement = document.getElementById(cardId);
    if (cardElement) {
        const title = cardElement.querySelector('.title').textContent;
        const description = cardElement.querySelector('.description').textContent;
        const date = cardElement.querySelector('.date').getAttribute('data-date'); 
        const priority = cardElement.querySelector('.status').classList[1];

        document.getElementById('edit-title').value = title;
        document.getElementById('edit-description').value = description;
        document.getElementById('edit-date').value = date;

        const statusRadios = document.querySelectorAll('input[name="status"]');
        statusRadios.forEach(radio => {
            if (radio.value === priority) {
                radio.checked = true;
            }
        });

        confirmEditButton.setAttribute('data-card-id', cardId);
    } else {
        alert('Erro - Card não encontrado:', cardId);
    }
}


function closeEditModal() {
    editModal.style.display = 'none';
}

function deleteCard(cardId) {
    const cardElement = document.getElementById(cardId);
    if (cardElement) {
        cardElement.remove();
    } else {
        alert('Card nao encontrado:', cardId);
    }
}

function clearAddModal() {
    const titleInput = document.getElementById('title');
    const descriptionTextarea = document.getElementById('description');
    const dateInput = document.getElementById('edit-date');
    const statusRadios = document.querySelectorAll('input[name="status"]');
    const checkboxes = document.querySelectorAll('.ks-cboxtags input[type="checkbox"]');

    titleInput.value = '';
    descriptionTextarea.value = '';
    dateInput.value = '';

    statusRadios.forEach((radio) => {
        radio.checked = false;
    });

    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
}

