var map;

function initMap() {
	console.log("initMap invoked");
	
	// -------------------------------------------------------------------------
	// Initializes map
	// -------------------------------------------------------------------------
	map = L.map('map');
	
	// Sets view
	map.setView(new L.LatLng(63.4269, 10.3969), 13);

	// -------------------------------------------------------------------------
	// Adds an OpenStreetMap tile layer
	// -------------------------------------------------------------------------
	var osmUrlTemplate = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
	
	var tileLayerOptions = {};
	tileLayerOptions.minZoom = 0; // default 0
	tileLayerOptions.maxZoom = 18; // default 18
	tileLayerOptions.attribution = "Map data © <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors";
	
	var osmTileLayer = L.tileLayer(osmUrlTemplate, tileLayerOptions);
	
	// Adds layer to map
	map.addLayer(osmTileLayer);
	
	map.addControl(new adminControl());
	map.addControl(new searchSiteControl());
}

function showSiteOnMap(name, category, lon, lat) {
	var marker = L.marker([lon, lat]).addTo(map);
	marker.bindPopup("<b>" + name + "</b> (" + category + ")").openPopup();
}

var adminControl = L.Control.extend({
 
  options: {
    position: 'topleft' 
  },
 
  onAdd: function (map) {
	  console.log("onAdd admin invoked");

    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
		console.log("cont added");
	container.style.width = '250px';
	container.style.height = '35px';

	container.innerHTML = "<div id='accordionLeft' class='panel-group'>" +
						"<div class='panel panel-default panel-left'>" +
							"<div class='panel-heading'>" +
								"<h4 class='panel-title'>" +
									"<a data-toggle='collapse' data-parent='#accordionLeft' href='#collapseOne'>Admin</a>" +
								"</h4>" +
							"</div>" +
							"<div id='collapseOne' class='panel-collapse collapse'>" +
								"<div class='panel-body'>" +
									"<p>Her kommer administrasjon av steder...</p>" +
								"</div>" +
							"</div>" +
						"</div>";
 
    container.onclick = function(){
      console.log('buttonClicked');
    }
    return container;
  },
 
});

var searchSiteControl = L.Control.extend({
 
  options: {
    position: 'topleft' 
  },
 
  onAdd: function (map) {
	  console.log("onAdd searchSite invoked");
    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
	container.style.width = '250px';
	container.style.height = '35px';
	console.log("cont added");
	container.innerHTML = "<div id='accordionLeft' class='panel-group'>" +
						"<div class='panel panel-default panel-left'>" +
							"<div class='panel-heading'>" +
								"<h4 class='panel-title'>" +
									"<a data-toggle='collapse' data-parent='#accordionLeft' href='#collapseTwo'>Søk</a>" +
								"</h4>" +
							"</div>" +
							"<div id='collapseTwo' class='panel-collapse collapse'>" +
								"<div class='panel-body'>" +
									"<p>Her kommer søk etter steder...</p>" +
								"</div>" +
							"</div>" +
						"</div>";
 
    container.onclick = function(){
      console.log('buttonClicked');
    }
    return container;
  },
 
});
