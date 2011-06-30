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
    childViews: 'button'.w(),
    
    button: SC.ButtonView.design({
      title: "Show Map",
      action: function() {
        var pane = SC.PanelPane.create({
          layout: {width: 600, height: 600},
          contentView: GMap.MapView.design({
            layout: { left: 0, right: 0, top: 0, bottom: 0 },
            _center: GMap.LatLng(0, 0),
            _zoom: 10,
            click: function() {
              this.pane().remove();
            }
          })
        });
        pane.append();
      },
      
    })
    
    
  })

});
