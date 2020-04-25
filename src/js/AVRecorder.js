/* eslint-disable class-methods-use-this */
import MessageGenerator from './MessageGenerator';

export default class AVRecorder {
  constructor(popup) {
    this.popup = popup;
    this.messageGenerator = new MessageGenerator();
  }

  init() {
    this.audioRecButton = document.querySelector('#audio-rec-button');
    this.videoRecButton = document.querySelector('#video-rec-button');
    this.saveRecButton = document.querySelector('#save-rec-button');
    this.cancelRecButton = document.querySelector('#cancel-rec-button');
    this.recTimer = document.querySelector('#timer');
    this.recordingButtons = document.querySelector('.recording-buttons');
    this.stopRecButtons = document.querySelector('.stop-recording-buttons');

    this.audioRecButton.addEventListener('click', () => {
      this.recordingButtons.classList.add('hidden');
      this.stopRecButtons.classList.remove('hidden');
      this.avRecorder();
    });

    this.videoRecButton.addEventListener('click', () => {
      this.recordingButtons.classList.add('hidden');
      this.stopRecButtons.classList.remove('hidden');
      this.avRecorder(true);
    });
  }

  async avRecorder(recVideo = false) {
    if (!navigator.mediaDevices) {
      const msg = 'Your browser don`t support this function';
      this.popup.showPopup('', msg);
      return;
    }
    try {
      const mediaContentType = recVideo ? 'video' : 'audio';
      let mediaWasSaved = true;
      let recordingTime = 0;
      let timing = null;

      if (!window.MediaRecorder) {
        const msg = 'Please, give permission in browser to record sound';
        this.popup.showPopup('', msg);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: recVideo,
      });

      if (recVideo) {
        const videoPreview = document.createElement('video');
        videoPreview.controls = true;
        videoPreview.muted = 'muted';
        videoPreview.className = 'video-preview';
        document.body.appendChild(videoPreview);
        videoPreview.srcObject = stream;
        videoPreview.play();
      }

      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.start();

      recorder.addEventListener('start', () => {
        timing = setInterval(() => {
          this.recTimer.innerText = this.timer(recordingTime += 1);
        }, 1000);
        console.log('recording started...');
      });

      recorder.addEventListener('dataavailable', (evt) => {
        chunks.push(evt.data);
      });

      recorder.addEventListener('stop', async () => {
        clearInterval(timing);
        console.log('recording stopped');
        this.recTimer.innerText = '00:00';
        if (mediaWasSaved) {
          const mediaElement = document.createElement(mediaContentType);
          const blob = new Blob(chunks, { type: `${mediaContentType}/mp4` });

          const fileReader = new FileReader();
          fileReader.readAsDataURL(blob);

          fileReader.onload = () => {
            mediaElement.src = fileReader.result;
            mediaElement.controls = true;
            this.messageGenerator.create(mediaElement.outerHTML, this.popup);
          };
        }
        if (recVideo) {
          document.body.removeChild(document.querySelector('.video-preview'));
        }
        this.recordingButtons.classList.remove('hidden');
        this.stopRecButtons.classList.add('hidden');
      });

      this.saveRecButton.addEventListener('click', () => {
        recorder.stop();
        stream.getTracks().forEach((track) => track.stop());
        mediaWasSaved = true;
      });

      this.cancelRecButton.addEventListener('click', () => {
        recorder.stop();
        stream.getTracks().forEach((track) => track.stop());
        mediaWasSaved = false;
      });
    } catch (e) {
      const msg = 'Please, give permission in browser to record video/sound';
      this.popup.showPopup('', msg);
      this.recordingButtons.classList.remove('hidden');
      this.stopRecButtons.classList.add('hidden');
    }
  }

  timer(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = (seconds - (min * 60));
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`; // eslint-disable-line prefer-template
  }
}
