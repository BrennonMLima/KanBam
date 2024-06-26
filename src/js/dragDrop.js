const cards = document.querySelectorAll('.card');
const dropzones = document.querySelectorAll('.board');

cards.forEach(card => {
    card.addEventListener('dragstart', dragstart);
    card.addEventListener('drag', drag);
    card.addEventListener('dragend', dragend);
});

function dragstart() {
    dropzones.forEach(board => board.classList.add('highlight'));
    this.classList.add('is-dragging');
}

function drag() {}

function dragend() {
    dropzones.forEach(board => board.classList.remove('highlight'));
    this.classList.remove('is-dragging');
    saveCardBoardId(this.id);
}

dropzones.forEach(board => {
    board.addEventListener('dragenter', dragenter);
    board.addEventListener('dragover', dragover);
    board.addEventListener('dragleave', dragleave);
    board.addEventListener('drop', drop);
});

function dragenter() {}

function dragover() {
    this.classList.add('over');
    const cardBeingDragged = document.querySelector('.is-dragging');
    this.appendChild(cardBeingDragged);
}

function dragleave() {
    this.classList.remove('over');
}

function drop(event) {
    event.preventDefault();
    this.classList.remove('over');
    const cardBeingDragged = document.querySelector('.is-dragging');
    cardBeingDragged.classList.remove('is-dragging');
}

function saveCardBoardId(cardId) {
    const cardElement = document.getElementById(cardId);
    if (cardElement) {
        const boardElement = cardElement.closest('.board');
        const boardId = boardElement ? boardElement.id : null;
        
        if (boardId) {
            const cards = loadCardsFromLocalStorage();
            const cardIndex = cards.findIndex(card => card.id === cardId);
            if (cardIndex !== -1) {
                cards[cardIndex].boardId = boardId;
                saveCardsToLocalStorage(cards);
            }
        }
    }
    
}