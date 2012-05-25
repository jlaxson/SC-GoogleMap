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

  classNames: 'gmap-mapview',

  _map: null,
  _mapLayer: null,
  center: null,
  zoom: 1,
  
  render: function(context, firstTime) {
    this._mapLayer = context.begin('div').addClass('gmap-container');
    this._mapLayer = this._mapLayer.addStyle('width', '100%').addStyle('height', '100%').addStyle('position', 'absolute');
    context = this._mapLayer.end();
    
    sc_super();
  },

  didCreateMap: function() {},
  
  zoomObserver: function(key) {
    if (this._map) this._map.setZoom(this.get('zoom'));
  }.observes('zoom'),
  centerObserver: function(key) {
    if (this._map) this._map.setCenter(this.get('center'));
  }.observes('center'),
  
  mapType: "MAP_ROADMAP",
  googleMapType: function() {
    var type = this.get('mapType');
    if (type === GMap.MapView.MAP_ROADMAP)
        return google.maps.MapTypeId.ROADMAP;
    else if (type === GMap.MapView.MAP_SATELLITE)
        return google.maps.MapTypeId.SATELLITE;
    else if (type === GMap.MapView.MAP_HYBRID)
        return google.maps.MapTypeId.HYBRID;
    else if (type === GMap.MapView.MAP_TERRAIN)
        return google.maps.MapTypeId.TERRAIN;
    else {
        console.error("unknown map type: " + this.get('mapType'));
        return undefined;
    }
  }.property('mapType'),
  
  didCreateLayer: function() {
    this.invokeLater(function() { this.loadMap(); });
  },
  
  loadMap: function() {
    //sc_super();
    var layer = this.get('layer');
    var myOptions = {
        zoom: this.get('zoom'),
        mapTypeId: this.get('googleMapType'),
        //disableDefaultUI: true,
        scrollwheel: false,
    };
    
    var elem = layer.firstChild, that = this;
    this._map = new google.maps.Map(elem, myOptions);
    this._map.setCenter(this.get('center') || GMap.LatLng(0, 0));

    google.maps.event.addListener(this._map, 'center_changed', function() {that._centerChanged()});
    
    this.observeMarkers();
    this.didCreateMap();
  },
  
  _markers: [],
  markers: [],

  _centerChanged: function() {
    this.set('center', this._map.getCenter());
  },
  
  observeMarkers: function() {
    var oldmarkers = this._markers;
    var markers = this.get('markers');

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

SC.mixin(GMap.MapView, {
  MAP_ROADMAP:  "MAP_ROADMAP",
  MAP_SATELLITE:"MAP_SATELLITE",
  MAP_HYBRID:   "MAP_HYBRID",
  MAP_TERRAIN:  "MAP_TERRAIN",
  _gmapLoaded: false,
});