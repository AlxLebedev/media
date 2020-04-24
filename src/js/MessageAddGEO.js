/* eslint-disable class-methods-use-this */
import getGeoposition from './getGeoposition';
import getDate from './getDate';

const timelineMessagesField = document.querySelector('.timeline-messages-field');
const messagesInputField = document.querySelector('#input-field');
let coordinates = null;
const timelineMessages = [];

export default class MsgAddGeo {
  // constructor() {
  //   this.timelineMessagesField = document.querySelector('.timeline-messages-field');
  //   this.messagesInputField = document.querySelector('#input-field');
  //   this.coordinates = null;
  //   this.timelineMessages = [];
  // }

  async messageAddGEO(msgObj, popup) {
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

  addMessage(msgObj, itemGeo) {
    const itemDate = getDate(new Date());
    const elItem = document.createElement('div');
    elItem.className = 'item-msg';
    elItem.innerHTML = `
    <div class="l-block">
    ${msgObj}
    <div class="geo-tef">${itemGeo}</div>
    </div>
    <div class="r-block">${itemDate}</div>
    `;
    timelineMessagesField.prepend(elItem);
    messagesInputField.value = '';

    timelineMessages.push({ msg: msgObj, geo: itemGeo, data: itemDate });
    localStorage.setItem('legends', JSON.stringify(timelineMessages));
  }

  loadMessage(msg, geo, data) {
    const elItem = document.createElement('div');
    elItem.className = 'item-msg';
    elItem.innerHTML = `
    <div class="l-block">
    ${msg}
    <div class="geo-tef">${geo}</div>
    </div>
    <div class="r-block">${data}</div>
    `;
    timelineMessagesField.prepend(elItem);
    messagesInputField.value = '';

    timelineMessages.push({ msg, geo, data });
  }
}
