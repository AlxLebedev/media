import Popup from './Popup';
import AVRecorder from './AVRecorder';
import MessageAddGEO from './MessageAddGEO';

const popup = new Popup();
popup.init();

const recorder = new AVRecorder(popup);
recorder.init();

const cmessageAddGeo = new MessageAddGEO();
const popupWindow = document.querySelector('.popup');
const popupInputField = document.querySelector('.popup-inp');
const popupCancelButton = document.querySelector('.popup-cancel');
const popupOkButton = document.querySelector('.popup-ok');
const mesageInputField = document.querySelector('#input-field');
const clearButton = document.getElementById('clear-button');

popupCancelButton.addEventListener('click', () => {
  popupWindow.classList.add('hidden');
  return false;
});

popupOkButton.addEventListener('click', () => {
  if (popupInputField.classList.contains('hidden')) {
    popupWindow.classList.add('hidden');
  }
});

mesageInputField.addEventListener('keypress', (evt) => {
  if (evt.key === 'Enter') {
    console.log(mesageInputField.value);
    cmessageAddGeo.messageAddGEO(`<p>${mesageInputField.value}</p>`, popup);
  }
});

clearButton.addEventListener('click', () => {
  localStorage.removeItem('legends');
  window.location.reload();
});

try {
  if (localStorage.legends) {
    const loadStorage = JSON.parse(localStorage.legends);
    for (const item of loadStorage) {
      cmessageAddGeo.loadMessage(item.msg, item.geo, item.data);
    }
  }
} catch (e) {
  console.log('error Localstorage', e);
}
