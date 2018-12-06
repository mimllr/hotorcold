function getLocation() {
  if (navigator.geolocation) {
    resetView();
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Can't Geolocate. Try again.")
  }
}

function showPosition(position) {
  lat = position.coords.latitude.toFixed(5);
  lon = position.coords.longitude.toFixed(5);
  encryptToURL(lat, lon);
}

function encryptToURL(lat, lon) {
  fadeLoad();
  var cryptLat = CryptoJS.AES.encrypt(lat.toString(), "Polo");
  var cryptLon = CryptoJS.AES.encrypt(lon.toString(), "Polo");
  var urlToSend = window.location.hostname + "/findme.html?lat=" + cryptLat + "&lon=" + cryptLon;
  var smsText = "sms:?&body=" + urlToSend;

  var button = document.getElementById('game');
  button.href = smsText;
  fadeButtonIn();
}

function fadeLoad() {
  var el = document.querySelector('#loading');
  if (el.classList.contains('is-paused')) {
    el.classList.remove('is-paused');
    el.style.display = "none";
  }
}

function resetView() {
  document.getElementById('loading').style.display = "inline";

  var btn = document.getElementById('game');
  btn.style.display = 'none';
  btn.innerHTML = 'Text Your Friends'
  btn.removeAttribute('onclick');
  btn.classList.add('is-paused');
  btn.classList.add('fade-in');
}

function fadeButtonIn() {
  var el = document.querySelector('#game');
  if (el.classList.contains('is-paused')) {
    el.classList.remove('is-paused');
    el.style.display = 'inline';
  }
}