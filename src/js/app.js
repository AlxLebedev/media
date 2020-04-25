import Popup from './Popup';
import AVRecorder from './AVRecorder';
import MessageGenerator from './MessageGenerator';

const popup = new Popup();
popup.init();

const recorder = new AVRecorder(popup);
recorder.init();

const messageGenerator = new MessageGenerator();
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
    messageGenerator.create(`<p>${mesageInputField.value}</p>`, popup);
  }
});

clearButton.addEventListener('click', () => {
  localStorage.removeItem('messagesHistory');
  window.location.reload();
});

try {
  if (localStorage.messagesHistory) {
    const loadStorage = JSON.parse(localStorage.messagesHistory);
    for (const item of loadStorage) {
      messageGenerator.loadMessage(item.msg, item.geo, item.date);
    }
  }
} catch (e) {
  console.log('error Localstorage', e);
}
