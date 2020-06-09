export class Video {
  constructor(options) {
    const $video = document.querySelector(options.videoElement);
    const $toolsContainer = document.querySelector(options.controlElement);
    this.$video = $video;
    this.$toolsContainer = $toolsContainer;

    this.initControls($toolsContainer);
    // this.logEvents();
    this.logBuffered();
    // $video.addEventListener("loadedmetadata", this.loadedmetadata);
  }
  initControls($toolsContainer) {
    const $playCtr = $toolsContainer.querySelector(".play-pause");
    const $progressCtr = $toolsContainer.querySelector(".progress");
    const $volumeCtr = $toolsContainer.querySelector(".volume");
    const $fullscreenCtr = $toolsContainer.querySelector(".fullscreen");
    const $speedCtr = $toolsContainer.querySelector(".speed");

    this.$playCtr = $playCtr;

    $playCtr.addEventListener("click", e => {
      if (this.$video.paused) {
        this.play();
        e.target.innerText = "暂停";
      } else {
        this.pause();
        e.target.innerText = "播放";
      }
    });

    this.initProgress($progressCtr);
    this.initVolume($volumeCtr);
    this.initFullscreen($fullscreenCtr);
    this.initSpeed($speedCtr);
  }
  initProgress($progressCtr) {
    $progressCtr.value = 0;
    $progressCtr.min = 0;
    $progressCtr.max = this.$video.duration;
    this.totalTime = this.$video.duration;
    this.$video.addEventListener("timeupdate", e => {
      $progressCtr.value = e.target.currentTime;
    });
    $progressCtr.addEventListener("change", e => {
      this.$video.currentTime = +e.target.value;
    });
  }
  initVolume($volumeCtr) {
    $volumeCtr.value = this.$video.volume;
    $volumeCtr.step = 0.1;
    $volumeCtr.min = 0;
    $volumeCtr.max = 1;
    this.$video.addEventListener("volumechange", e => {
      $volumeCtr.value = e.target.volume;
    });
    $volumeCtr.addEventListener("change", e => {
      const volume = e.target.value;
      if (volume > 0) {
        this.$video.muted = false;
      }
      this.$video.volume = volume;
    });
  }
  initSpeed($speedCtr) {
    $speedCtr.value = 1;
    $speedCtr.step = 0.25;
    $speedCtr.min = 1;
    $speedCtr.max = 2;
    $speedCtr.addEventListener("change", e => {
      this.$video.playbackRate = +e.target.value;
    });
  }
  initFullscreen($fullscreenCtr) {
    $fullscreenCtr.addEventListener("click", e => {
      // document.querySelector(".video-box").requestFullscreen();
      toFullVideo(this.$video);
    });
  }
  logEvents() {
    function log(e) {
      console.log(`${e.type}`);
    }
    this.$video.addEventListener("canplay", log);
    this.$video.addEventListener("canplaythrough", log);
    this.$video.addEventListener("play", log);
    this.$video.addEventListener("playing", log);
    this.$video.addEventListener("waiting", log);
    this.$video.addEventListener("ended", log);
    this.$video.addEventListener("loadeddata", log);
    this.$video.addEventListener("loadedmetadata", log);
    this.$video.addEventListener("loadstart", log);
  }
  logBuffered() {
    this.$video.addEventListener("progress", e => {
      const { length } = this.$video.buffered;
      const buffers = [];
      for (let i = 0; i < length; i++) {
        const s = this.$video.buffered.start(i);
        const e = this.$video.buffered.end(i);
        buffers.push(`[${s} - ${e}]`);
      }
    });®π
  }
  play() {
    this.$video.play();
  }
  pause() {
    this.$video.pause();
  }
}

function toFullVideo(videoDom) {
  if (videoDom.requestFullscreen) {
    return videoDom.requestFullscreen();
  } else if (videoDom.webkitRequestFullScreen) {
    return videoDom.webkitRequestFullScreen();
  } else if (videoDom.mozRequestFullScreen) {
    return videoDom.mozRequestFullScreen();
  } else {
    return videoDom.msRequestFullscreen();
  }
}
