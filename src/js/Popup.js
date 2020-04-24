import validGeoposition from './validGeoposition';

export default class Popup {
  init() {
    this.popup = document.createElement('div');
    this.popup.className = 'popup hidden';
    this.popup.innerHTML = `
    <p class="popup-header"></p>
    <p class="popup-msg"></p>
    <input type"text" class="popup-inp hidden">
    <div class="popup-buttons">
      <div class="popup-ok button">OK</div>
      <div class="popup-cancel button hidden">Cancel</div>
    </div>
    `;
    document.body.appendChild(this.popup);

    this.popupHeader = document.querySelector('.popup-header');
    this.popupMessage = document.querySelector('.popup-msg');
    this.popupInputField = document.querySelector('.popup-inp');
    this.popupCancelButton = document.querySelector('.popup-cancel');
  }

  showPopup(type, message) {
    this.popup.classList.remove('hidden');
    this.popupHeader.innerText = 'Ooops, something went wrong...';
    this.popupMessage.innerText = message;
    if (type === 'get') {
      this.popupInputField.classList.remove('hidden');
      this.popupCancelButton.classList.remove('hidden');
    }
  }

  validate() {
    if (validGeoposition(this.popupInputField.value)) {
      this.popupInputField.style.borderColor = '#000000';
      return true;
    }
    this.popupInputField.style.borderColor = '#ff0000';
    return false;
  }
}
