/* eslint-disable class-methods-use-this */
import getGeoposition from './getGeoposition';
import getDate from './getDate';

const timelineMessagesField = document.querySelector('.timeline-messages-field');
const messagesInputField = document.querySelector('#input-field');
let coordinates = null;
const timelineMessages = [];

export default class MessageGenerator {
  // constructor() {
  //   this.timelineMessagesField = document.querySelector('.timeline-messages-field');
  //   this.messagesInputField = document.querySelector('#input-field');
  //   this.coordinates = null;
  //   this.timelineMessages = [];
  // }

  async create(msgObj, popup) {
    this.elPopup = document.querySelector('.popup');
    this.elPopupInput = document.querySelector('.popup-inp');
    this.elPopupCancel = document.querySelector('.popup-cancel');
    if (!coordinates) {
      try {
        coordinates = await getGeoposition(popup);
        this.addMessage(msgObj, coordinates);

        this.elPopup.classList.add('hidden');
        this.elPopupInput.classList.add('hidden');
        this.elPopupCancel.classList.add('hidden');
      } catch (e) {
        console.log('error', e);
      }
    } else {
      this.addMessage(msgObj, coordinates);
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
    timelineMessagesField.prepend(newMessage);
    messagesInputField.value = '';

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
    timelineMessagesField.prepend(newMessage);
    messagesInputField.value = '';

    timelineMessages.push({ msg: message, geo: coords, date: date });
  }
}
