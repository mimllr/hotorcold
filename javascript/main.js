function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  } else {
      console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  lat = position.coords.latitude.toFixed(5);
  lon = position.coords.longitude.toFixed(5);
  console.log("Latitude: " + lat);
  console.log("Longitude: " + lon);
  encryptToURL(lat, lon);
}

function getURL(){
  console.log(window.location.href);
}

function playGame() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(encryptToURL());
  } else {
    alert("Can't Geolocate.");
  }
}

function encryptToURL(lat, lon) {
  cryptLat = CryptoJS.AES.encrypt(lat.toString(), "Polo");
  cryptLon = CryptoJS.AES.encrypt(lon.toString(), "Polo");
  console.log("Encrypted Lat: " + cryptLat);
  console.log("Encrypted Lon: " + cryptLon);

  urlToSend = "http://localhost:9090/findme.html?lat=" + cryptLat + "&lon=" + cryptLon;
  console.log(urlToSend);
}

// http://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a));
}

console.log('main.js loaded.');