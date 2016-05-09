setInterval(getLocation, 10000);

function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getDistance);
  } else {
    alert("Can't Geolocate. Try again.")
  }
}

function getDistance(position) {
  myLat = position.coords.latitude.toFixed(5);
  myLon = position.coords.longitude.toFixed(5);

  var url = window.location.href;

  var latStrIndex = url.indexOf("lat=") + 4;
  var encryptedLat = url.substr(latStrIndex, 44);

  var lonStrIndex = url.indexOf("lon=") + 4;
  var encryptedLon = url.substr(lonStrIndex, 44);

  var lat = CryptoJS.AES.decrypt(encryptedLat, "Polo");
  var targetLat = lat.toString(CryptoJS.enc.Utf8)

  var lon = CryptoJS.AES.decrypt(encryptedLon, "Polo");
  var targetLon = lon.toString(CryptoJS.enc.Utf8)

  distance(myLat, myLon, targetLat, targetLon);
  
}

// http://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  var result=  12742 * Math.asin(Math.sqrt(a));
  console.log(result);
}

console.log('finding loaded.');