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


  distance(myLat, myLon, targetLat, targetLon, "M");
}

function distance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = Math.PI * lat1 / 180
  var radlat2 = Math.PI * lat2 / 180
  var theta = lon1 - lon2
  var radtheta = Math.PI * theta / 180
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist)
  dist = dist * 180 / Math.PI
  dist = dist * 60 * 1.1515
  if (unit == "K") {
    dist = dist * 1.609344
  }
  if (unit == "N") {
    dist = dist * 0.8684
  }
  var result = dist.toFixed(2).toString();

  document.getElementById('distance').innerHTML = result + " miles away";
  setView(dist);
}

function setView(distance) {
  document.getElementById('findLoading').style.display = 'none';

  if (distance > 2) {
    r = 91;
    g = 173;
    b = 255;
    a = 1;
  } else if (distance <= 2 && distance > 1) {
    r = 91;
    g = 173;
    b = 255;
    a = (distance - 1);
  } else {
    r = 255;
    g = 119;
    b = 119;
    a = (1 - distance);
  }

  var back = document.getElementById('color');
  back.style.backgroundColor = "rgba(" + r + "," + b + "," + g + "," + a + ")";
}

getLocation();