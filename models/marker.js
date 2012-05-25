// ==========================================================================
// Project:   GMap.Marker
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GMap */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/

GMap.Pins = SC.Object.create();

GMap.Pins.DefaultPin = {
  icon: new google.maps.MarkerImage(sc_static('Pin@2x.png'), new google.maps.Size(64, 78), new google.maps.Point(0,0), new google.maps.Point(7,34), new google.maps.Size(32, 39)),
};

GMap.Pins.Purple = {
  icon: new google.maps.MarkerImage(sc_static('PinPurple@2x.png'), new google.maps.Size(64, 78), new google.maps.Point(0,0), new google.maps.Point(7,34), new google.maps.Size(32, 39)),
};

GMap.Pins.Green = {
  icon: new google.maps.MarkerImage(sc_static('PinGreen@2x.png'), new google.maps.Size(64, 78), new google.maps.Point(0,0), new google.maps.Point(7, 34), new google.maps.Size(32, 39)),
};

GMap.Marker = SC.Object.extend(
/** @scope GMap.Marker.prototype */ {

  _marker: null,
  map: null,

  markerOptions: {},

  icon: GMap.Pins.DefaultPin.icon,
  iconObserver: function() {
    if(this._marker) {
      this._marker.setIcon(this.get('icon'));
    }
  }.observes('icon'),

  shadow: GMap.Pins.DefaultPin.shadow,
  shadowObserver: function() {
    if(this._marker) {
      this._marker.setShadow(this.get('shadow'));
    }
  }.observes('shadow'),
  
  position: null,
  title: '',
  positionObserver: function(key) {
    if (this._marker) {
      this._marker.setPosition(this.get('position'));
    }
  }.observes('position'),
  
  isEditable: NO,
  
  draggableObserver: function() {
    this._marker.setDraggable(this.get('isEditable'));
  }.observes('isEditable'),

  visible: YES,

  visibleObserver: function() {
    this._marker.setVisible(this.get('visible'));
  }.observes('visible'),
  
  init: function() {
    var iconURL = this.get('icon');
    
    this._marker = new google.maps.Marker($.extend({
      position: this.get('position'),
      title: this.get('title'),
      visible: this.get('visible'),
      icon: this.get('icon'),
      shadow: this.get('shadow'),
    }, this.get('markerOptions')));
    
    var that = this;
    google.maps.event.addListener(this._marker, 'dragend', function() {that._markerDragged()});
    
    sc_super();
    
    this.draggableObserver();
  },
  
  _markerDragged: function() {
    this.set('position', this._marker.getPosition())
    this.positionWasChanged();
  },
  
  positionWasChanged: function() {
    
  },
  
  latitude: function(val) {
    return this._marker.getPosition().lat();
  }.property("position").cacheable(),
  
  longitude: function(val) {
    return this._marker.getPosition().lng();
  }.property("position").cacheable(),
  
}) ;
