// ==========================================================================
// Project:   GMapDemo - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GMapDemo */

// This page describes the main user interface for your application.  
GMapDemo.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'map latLabel'.w(),
    
    map: GMap.MapView.design({
      layout: { left: 0, right: 0, top: 0, bottom: 0 },
      center: GMap.LatLng(37.75, -122.45),
      zoom: 10,
      markers: [
        GMap.Marker.create({ 
          position: GMap.LatLng(37.75, -122.45), 
          draggable: YES,
          latitudeBinding: "GMapDemo.location.latitude",
        }),
      ]
    }),
    
    latLabel: SC.LabelView.design({
      layout: {left: 10, top: 10, width: 200, height: 30},
      valueBinding: "GMapDemo.location.latitude",
      backgroundColor: 'white',
    })
    
    
  })

});

GMapDemo.location = SC.Object.create({
  latitude: 5,
  longitude: 5
});