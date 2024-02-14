document.addEventListener('DOMContentLoaded', function () {
  var video = document.getElementById('video');
  var play = document.getElementById('video-play-button');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  canvas.width = video.offsetWidth;
  canvas.height = video.offsetHeight + 60;
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
  canvas.addEventListener('click', playVideo);
  play.addEventListener('click', playVideo);
  function playVideo() {
    canvas.width = video.offsetWidth;
    canvas.height = video.offsetHeight;
    document.getElementById('progress').style.display = 'block';
    if (video.paused == true) {
      play.style.display = 'none';
      video.play();
    } else {
      play.style.display = 'block';
      video.pause();
    };
  };
  video.addEventListener('progress', function () {
    var duration = video.duration;
    if (duration > 0) {
      for (var i = 0; i < video.buffered.length; i++) {
        if (video.buffered.start(video.buffered.length - 1 - i) < video.currentTime) {
          document.getElementById('buffered-amount').style.width = (video.buffered.end(video.buffered.length - 1 - i) / duration) * 100 + '%';
          break;
        }
      }
    }
  });
  video.addEventListener('timeupdate', function () {
    var duration = video.duration;
    if (duration > 0) {
      document.getElementById('progress-amount').style.width = ((video.currentTime / duration) * 100) + "%";
    }
  });
  document.getElementById('progress').addEventListener('click', setVideo);
  function setVideo(event) {
    function offset(el) {
      var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    var kontener = document.getElementById('video-container');
    var offsetArray = offset(kontener);
    var xOffset = offsetArray['left'];
    var xpos = event.clientX - xOffset;
    var lenght = document.getElementById('progress').offsetWidth;
    var progress = xpos / lenght;
    var duration = video.duration;
    var setTime = progress * duration;
    video.currentTime = setTime;
  };
}, false);