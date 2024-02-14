document.addEventListener('DOMContentLoaded', function () {
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  canvas.width = video.offsetWidth;
  canvas.height = video.offsetHeight;
  window.addEventListener('resize', resized);
  function resized() {
    canvas.width = video.offsetWidth;
    canvas.height = video.offsetHeight;
  };
  draw(video, context);
  function draw(video, context) {
    context.drawImage(video, 0, canvas.offsetHeight / 2 - video.offsetHeight / 2, video.offsetWidth, video.offsetHeight);
    setTimeout(draw, 20, video, context);
  };
  canvas.width = video.offsetWidth;
  canvas.height = video.offsetHeight;
}, false);