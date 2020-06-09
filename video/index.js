import { Video } from "./video.js";

window.onload = function() {
  const video = new Video({
    videoElement: "#video",
    controlElement: ".controls"
  });
};
