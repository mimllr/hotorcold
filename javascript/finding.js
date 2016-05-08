function startSearch() {
  var url = window.location.href;

  var latStrIndex = url.indexOf("lat=") + 4;
  console.log(latStrIndex);

  var encryptedLat = url.substr(latStrIndex, 44);
  console.log(encryptedLat);

  var lonStrIndex = url.indexOf("lon=") + 4;
  console.log(lonStrIndex);

  var encryptedLon = url.substr(lonStrIndex, 44);
  console.log(encryptedLon);

  var lat = CryptoJS.AES.decrypt(encryptedLat, "Polo");
  var decryptedLat = lat.toString(CryptoJS.enc.Utf8)
  console.log(decryptedLat);

  var lon = CryptoJS.AES.decrypt(encryptedLon, "Polo");
  var decryptedLon = lon.toString(CryptoJS.enc.Utf8)
  console.log(decryptedLon);
}

console.log('finding loaded.');
startSearch();