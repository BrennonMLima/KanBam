function createCard(cardId, title, description, date, status, responsibles) {
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
  if (responsibles) {
    responsibles.forEach(responsible => {
        const avatar = document.createElement('img');
        avatar.src = `https://github.com/${responsible}.png`;
        avatar.classList.add('r-avatar');
        responsibleAvatar.appendChild(avatar);
    });
  }
  rodapeCard.appendChild(responsibleAvatar);

  const deliveryDate = document.createElement('div');
  deliveryDate.classList.add('delivery-date');

  const dateIcon = document.createElement('div');
  dateIcon.classList.add('date-icon');
  const icon = document.createElement('ion-icon');
  icon.name = 'calendar';
  icon.classList.add('icon-date');
  dateIcon.appendChild(icon);

  const data = new Date(date);
  const offset = data.getTimezoneOffset() * 60000;
  const dataFormatada = new Date(data.getTime() + offset).toLocaleDateString('pt-BR');

  const dateElement = document.createElement('div');
  dateElement.classList.add('date');
  dateElement.setAttribute('data-date', date); 
  const dateText = document.createElement('span');
  dateText.textContent = dataFormatada;
  dateElement.appendChild(dateText);

  deliveryDate.appendChild(dateIcon);
  deliveryDate.appendChild(dateElement);

  rodapeCard.appendChild(deliveryDate);

  card.appendChild(rodapeCard);

  return card;
}

function addNewCard(title, description, date, status, dropzoneElement, responsibles) {
  const cardId = generateUUID();
  const newCard = createCard(cardId, title, description, date, status, responsibles);

  newCard.addEventListener('dragstart', dragstart);
  newCard.addEventListener('drag', drag);
  newCard.addEventListener('dragend', dragend);

  dropzoneElement.appendChild(newCard);

  return cardId;
}

function editCard(cardId, title, description, date, status, responsibles) {
  const cardElement = document.getElementById(cardId);

  if (cardElement) {
      cardElement.querySelector('.title').textContent = title;
      cardElement.querySelector('.description').textContent = description;

      const data = new Date(date);
      const offset = data.getTimezoneOffset() * 60000; 
      const formattedDueDate = new Date(data.getTime() + offset).toLocaleDateString('pt-BR');

      cardElement.querySelector('.date span').textContent = formattedDueDate;
    
      const statusDiv = cardElement.querySelector('.status');
      statusDiv.className = 'status ' + status;
      statusDiv.setAttribute('aria-label', 'Status: ' + status);

      const responsibleAvatar = cardElement.querySelector('.responsible-avatar');
      responsibleAvatar.innerHTML = '';
      responsibles.forEach(responsible => {
          const avatar = document.createElement('img');
          avatar.src = `https://github.com/${responsible}.png`;
          avatar.classList.add('r-avatar');
          responsibleAvatar.appendChild(avatar);
      });
  } else {
      console.error('Card não encontrado:', cardId);
  }
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}
