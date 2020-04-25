import getGeoposition from './getGeoposition';
import getDate from './getDate';

const timelineMessages = [];

export default class MessageGenerator {
  constructor() {
    this.timelineMessagesField = document.querySelector('.timeline-messages-field');
    this.messagesInputField = document.querySelector('#input-field');
    this.coordinates = null;
  }

  async create(msgObj, popup) {
    this.elPopup = document.querySelector('.popup');
    this.elPopupInput = document.querySelector('.popup-inp');
    this.elPopupCancel = document.querySelector('.popup-cancel');
    if (!this.coordinates) {
      try {
        this.coordinates = await getGeoposition(popup);
        this.addMessage(msgObj, this.coordinates);

        this.elPopup.classList.add('hidden');
        this.elPopupInput.classList.add('hidden');
        this.elPopupCancel.classList.add('hidden');
      } catch (e) {
        console.log('error', e);
      }
    } else {
      this.addMessage(msgObj, this.coordinates);
    }
  }

  addMessage(messageElement, coords) {
    const elementDate = getDate(new Date());
    const newMessage = document.createElement('div');
    newMessage.className = 'item-msg';
    newMessage.innerHTML = `
    <div class="item-message-container">
    ${messageElement}
    <div class="item-message-coords">${coords}</div>
    </div>
    <div class="item-message-date-container">${elementDate}</div>
    `;
    this.timelineMessagesField.prepend(newMessage);
    this.messagesInputField.value = '';

    timelineMessages.push({ msg: messageElement, geo: coords, date: elementDate });
    localStorage.setItem('messagesHistory', JSON.stringify(timelineMessages));
  }

  loadMessage(message, coords, date) {
    const newMessage = document.createElement('div');
    newMessage.className = 'item-msg';
    newMessage.innerHTML = `
    <div class="item-message-container">
    ${message}
    <div class="item-message-coords">${coords}</div>
    </div>
    <div class="item-message-date-container">${date}</div>
    `;
    this.timelineMessagesField.prepend(newMessage);
    this.messagesInputField.value = '';

    timelineMessages.push({ msg: message, geo: coords, date });
  }
}
