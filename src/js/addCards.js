function createCard(cardId, title, description, date, status) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.id = cardId;
  card.draggable = true;

  const topCard = document.createElement('div');
  topCard.classList.add('top-card');

  const statusDiv = document.createElement('div');
  statusDiv.classList.add('status', status);
  statusDiv.setAttribute('aria-label', 'Status: ' + status);
  topCard.appendChild(statusDiv);

  const editIconContainer = document.createElement('div');
  editIconContainer.classList.add('edit-icon-container');

  const editIcon = document.createElement('ion-icon');
  editIcon.name = 'create';
  editIcon.id = 'edit-icon';
  editIcon.classList.add('edit-icon');
  editIconContainer.appendChild(editIcon);
  topCard.appendChild(editIconContainer);

  editIcon.addEventListener('click', () => {
      openEditModal(cardId);
  });

  card.appendChild(topCard);

  const titleElement = document.createElement('h3');
  titleElement.textContent = title;
  titleElement.classList.add('title');
  card.appendChild(titleElement);

  const paragraph = document.createElement('p');
  paragraph.textContent = description;
  paragraph.classList.add('description');
  card.appendChild(paragraph);

  const rodapeCard = document.createElement('div');
  rodapeCard.classList.add('rodape-card');

  const responsibleAvatar = document.createElement('div');
  responsibleAvatar.classList.add('responsible-avatar');

  const avatar1 = document.createElement('img');
  avatar1.src = 'https://github.com/ruanmlopes.png';
  avatar1.classList.add('r-avatar');
  responsibleAvatar.appendChild(avatar1);

  const avatar2 = document.createElement('img');
  avatar2.src = 'https://github.com/brennonmlima.png';
  avatar2.classList.add('r-avatar');
  responsibleAvatar.appendChild(avatar2);

  rodapeCard.appendChild(responsibleAvatar);

  const deliveryDate = document.createElement('div');
  deliveryDate.classList.add('delivery-date');

  const dateIcon = document.createElement('div');
  dateIcon.classList.add('date-icon');
  const icon = document.createElement('ion-icon');
  icon.name = 'calendar';
  icon.classList.add('icon-date');
  dateIcon.appendChild(icon);

  const dateElement = document.createElement('div');
  dateElement.classList.add('date');
  const dateText = document.createElement('span');
  dateText.textContent = date;
  dateElement.appendChild(dateText);

  deliveryDate.appendChild(dateIcon);
  deliveryDate.appendChild(dateElement);

  rodapeCard.appendChild(deliveryDate);

  card.appendChild(rodapeCard);

  return card;
}

function addNewCard(title, description, date, status, dropzoneElement) {
  const cardId = generateUUID();
  const newCard = createCard(cardId, title, description, date, status);
  
  newCard.addEventListener('dragstart', dragstart);
  newCard.addEventListener('drag', drag);
  newCard.addEventListener('dragend', dragend);
  
  dropzoneElement.appendChild(newCard);
  
  return cardId;
}

function editCard(cardId, title, description, date, status) {
  const cardElement = document.getElementById(cardId);

  if (cardElement) {
      cardElement.querySelector('.title').textContent = title;
      cardElement.querySelector('.description').textContent = description;
      cardElement.querySelector('.date span').textContent = date;

      const statusDiv = cardElement.querySelector('.status');
      statusDiv.className = 'status ' + status;
      statusDiv.setAttribute('aria-label', 'Status: ' + status);
  } else {
      console.error('Card not found:', cardId);
  }
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}
