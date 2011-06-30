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
GMap.Marker = SC.Object.extend(
/** @scope GMap.Marker.prototype */ {

  _marker: null,
  map: null,
  
  position: null,
  icon: sc_static('pin.png'),
  title: '',
  positionObserver: function(key) {
    if (this._marker) {
      this._marker.setPosition(this.get('position'));
    }
  }.observes('position'),
  
  draggable: NO,
  
  draggableObserver: function() {
    this._marker.setDraggable(this.get('draggable'));
  },
  
  init: function() {
    var iconURL = this.get('icon');
    console.log(iconURL);
    
    this._marker = new google.maps.Marker({
      position: this.get('position'),
      title: this.get('title'),
      icon: new google.maps.MarkerImage(iconURL, new google.maps.Size(32, 39), new google.maps.Point(0,0), new google.maps.Point(7, 36)),
    });
    sc_super();
    
    this.draggableObserver();
    
    
  }
  
}) ;
