document.addEventListener('DOMContentLoaded', function () {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      var byteCharacters = atob(reader.result.slice(reader.result.indexOf(',') + 1));
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      var blob = new Blob([byteArray], { type: 'video/mp4' });
      var url = URL.createObjectURL(blob);
      document.getElementById('video').src = url;
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', 'video/bunny.mp4');
  xhr.responseType = 'blob';
  xhr.send();
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
}, false);