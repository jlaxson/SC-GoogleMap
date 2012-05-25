GMap.deg2Rad = function(deg) {
  return deg * Math.PI / 180;
};

// Takes google.map.LatLng (same as GMap.LatLng())
GMap.distanceBetween = function(a, b) {
  var R = 6371;
  
  var lat = a.lat(), lng = b.lng();

  var dLat = GMap.deg2Rad(a.lat() - b.lat());
  var dLong = GMap.deg2Rad(a.lng() - b.lng());
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(GMap.deg2Rad(lat)) * Math.cos(GMap.deg2Rad(lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};