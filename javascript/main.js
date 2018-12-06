function getLocation() {
  if (navigator.geolocation) {
    resetView();
    window.gameData = {};
    navigator.geolocation.getCurrentPosition(setPosition);
  } else {
    alert("Can't Geolocate. Try again.")
    window.location.reload();
  }
}

function setPosition(position) {
  var lat = position.coords.latitude.toFixed(5);
  var lon = position.coords.longitude.toFixed(5);
  window.gameData['position'] = [lat, lon];
  encryptURL();
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

function fadeButtonIn(bitlyURL) {
  var button = document.querySelector('#game');
  button.href = "sms:?&body=" + bitlyURL;
  if (button.classList.contains('is-paused')) {
    fadeLoad();
    button.classList.remove('is-paused');
    button.style.display = 'inline';
  }
}

function encryptURL() {
  var lat = window.gameData.position[0];
  var lon = window.gameData.position[1];
  var cryptLat = CryptoJS.AES.encrypt(lat.toString(), "Polo");
  var cryptLon = CryptoJS.AES.encrypt(lon.toString(), "Polo");
  var urlToSend = 'https://' + 'cryptopolo.netlify.com' + "/findme.html?lat=" + cryptLat + "&lon=" + cryptLon;
  setBitLink(urlToSend);
}

function setBitLink(encryptedURL) {
  var endPoint = 'https://api-ssl.bitly.com/v3/shorten?login=o_1u0qnc7uj9&apiKey=R_c23b2db000fa489eb9daa3a856badf56&longUrl='
  var encodedURL = encodeURIComponent(encryptedURL);

  var url = endPoint + encodedURL;

  axios.get(url)
    .then(function (response) {
      let bitlyData = response.data.data;
      console.log(bitlyData);
      fadeButtonIn(bitlyData.url);
    });
}