// ==========================================================================
// Project:   GMap.MapView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GMap */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
GMap.LatLng = function(lat, lng) {
  return new google.maps.LatLng(lat,lng);
};

GMap.MapView = SC.View.extend(
/** @scope GMap.MapView.prototype */ {
  MAP_ROADMAP:  google.maps.MapTypeId.ROADMAP,
  MAP_SATELLITE:google.maps.MapTypeId.SATELLITE,
  MAP_HYBRID:   google.maps.MapTypeId.HYBRID,
  MAP_TERRAIN:  google.maps.MapTypeId.TERRAIN,

  classNames: 'gmap-mapview',

  _map: null,
  _mapLayer: null,
  center: GMap.LatLng(0,0),
  zoom: 1,
  
  render: function(context, firstTime) {
    this._mapLayer = context.begin('div').addClass('gmap-container');
    this._mapLayer = this._mapLayer.addStyle('width', '100%').addStyle('height', '100%').addStyle('position', 'absolute');
    context = this._mapLayer.end();
    
    sc_super();
  },
  
  zoomObserver: function(key) {
    if (this._map) this._map.setZoom(this.get('zoom'));
  }.observes('zoom'),
  centerObserver: function(key) {
    if (this._map) this._map.setCenter(this.get('center'));
  }.observes('center'),
  mapType: google.maps.MapTypeId.ROADMAP,
  
  didCreateLayer: function() {
    this.invokeLater(function() { this.loadMap(); });
  },
  
  loadMap: function() {
    //sc_super();
    var layer = this.get('layer');
    var myOptions = {
        zoom: this.get('zoom'),
        mapTypeId: this.get('mapType'),
        disableDefaultUI: true,
    };
    var elem = layer.firstChild;
    this._map = new google.maps.Map(elem, myOptions);
    this._map.setCenter(this.get('center'));
    
    this.observeMarkers();
  },
  
  _markers: [],
  markers: [],
  
  observeMarkers: function() {
    var oldmarkers = this._markers;
    var markers = this.get('markers');
    //console.log(markers);
    //console.log(oldmarkers);
    markers.forEach(function(marker) {
      marker._marker.setMap(this._map);
      marker.set('map', this);
    }, this);
    oldmarkers.removeObjects(markers);
    oldmarkers.forEach(function(marker) {
      marker._marker.setMap(null);
      marker.set('map', null);
    }, this);
    this._markers = markers.copy();
  }.observes('*markers.[]'),


});
