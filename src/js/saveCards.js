function saveCardsToLocalStorage(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
}

function loadCardsFromLocalStorage() {
    const cardsJSON = localStorage.getItem('cards');
    return JSON.parse(cardsJSON) || [];
}

function addNewCardAndSave(title, description, date, status, dropzoneElement, boardId) {
    const cardId = addNewCard(title, description, date, status, dropzoneElement, boardId); // Passa o ID do board
    const cards = loadCardsFromLocalStorage();
    cards.push({ id: cardId, title, description, date, status, boardId }); // Salva o ID do board com o card
    saveCardsToLocalStorage(cards);
    return cardId;
}

function editCardAndSave(cardId, title, description, date, status) {
    const cards = loadCardsFromLocalStorage();
    const cardIndex = cards.findIndex(card => card.id === cardId);
    if (cardIndex !== -1) {
        cards[cardIndex] = { id: cardId, title, description, date, status, boardId: cards[cardIndex].boardId };
        saveCardsToLocalStorage(cards);
    } else {
        console.error('Card not found:', cardId);
    }
}

function deleteCardAndSave(cardId) {
    const cards = loadCardsFromLocalStorage();
    const cardIndex = cards.findIndex(card => card.id === cardId);
    if (cardIndex !== -1) {
        cards.splice(cardIndex, 1);
        saveCardsToLocalStorage(cards);
    } else {
        console.error('Card not found:', cardId);
    }
}

function loadSavedCard(cardId, title, description, date, status, dropzoneElement) {
    const newCard = createCard(cardId, title, description, date, status);

    newCard.addEventListener('dragstart', dragstart);
    newCard.addEventListener('drag', drag);
    newCard.addEventListener('dragend', dragend);

    dropzoneElement.appendChild(newCard);
}

window.addEventListener('DOMContentLoaded', () => {
    const boards = document.querySelectorAll('.board');
    boards.forEach(board => {
        const dropzoneElement = board.querySelector('.cards');
        const boardId = board.id;
        const cards = loadCardsFromLocalStorage(boardId);
        cards.forEach(card => {
            loadSavedCard(card.id, card.title, card.description, card.date, card.status, dropzoneElement);
        });
    });
});