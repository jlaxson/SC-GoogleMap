sc_require('models/marker');

GMap.Circle = SC.Object.extend({
  draggableObserver: function() {}, // can't drag circles

  position: null,
  title: '',
  visible: YES,
  positionObserver: function(key) {
    if (this._marker) {
      this._marker.setCenter(this.get('position'));
    }
  }.observes('position'),

  init: function() {    
    this._marker = new google.maps.Circle({
      position: this.get('position'),
      title: this.get('title'),
      visible: this.get('visible'),
      strokeColor: "#34c7d5",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#a3d6c4",
      fillOpacity: 0.35,
      radius: 200, // 1/8 mile
      //icon: new google.maps.MarkerImage(iconURL, new google.maps.Size(32, 39), new google.maps.Point(0,0), new google.maps.Point(7, 36)),
    });
    
    var that = this;
    google.maps.event.addListener(this._marker, 'dragend', function() {that._markerDragged()});
  },
})