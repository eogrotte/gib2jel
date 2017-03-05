var map;

function initMap() {
	console.log("initMap invoked");
	
	// -----------------------------------------------------------------------------------------------------------------
	// Initializes map
	// -----------------------------------------------------------------------------------------------------------------
	map = L.map('map');
	
	// Sets view
	map.setView(new L.LatLng(63.4269, 10.3969), 13);

	// -----------------------------------------------------------------------------------------------------------------
	// Adds an OpenStreetMap tile layer
	// -----------------------------------------------------------------------------------------------------------------
	var osmUrlTemplate = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
	
	var tileLayerOptions = {};
	tileLayerOptions.minZoom = 0; // default 0
	tileLayerOptions.maxZoom = 18; // default 18
	tileLayerOptions.attribution = "Map data © <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors";
	
	var osmTileLayer = L.tileLayer(osmUrlTemplate, tileLayerOptions);
	
	// Adds layer to map
	map.addLayer(osmTileLayer);

	// -----------------------------------------------------------------------------------------------------------------
	// Sets test sample data values for populating map
	// -----------------------------------------------------------------------------------------------------------------
	var sites = [
		{"loc":[63.4269, 10.3969], "category": "Severdighet", "title":"Nidarosdomen"},
		{"loc":[63.426935, 10.411155], "category": "Severdighet", "title":"Kristiansten Festning"},
		{"loc":[63.447369, 10.454401], "category": "Severdighet", "title":"Ringve Museum"},
		{"loc":[63.42052501, 10.35733889], "category": "Severdighet", "title":"Sverresborg Museum"}
	];

	// -----------------------------------------------------------------------------------------------------------------
	// Adds plugin search control (top right), on title
	// -----------------------------------------------------------------------------------------------------------------
	var markersLayer = new L.LayerGroup();	//layer contain searched elements
	map.addLayer(markersLayer);

	function customTip(text,val) {
		return '<a href="#">' + text + '<em style="background:'+text+'; width:14px;height:14px;float:right"></em></a>';
	}
	map.addControl(new L.Control.Search({
		layer: markersLayer,
		position: 'topright',
		initial: false,
		zoom: 13,
		marker: false,
		// buildTip: customTip,
		autoType: false
	}) );

	// -----------------------------------------------------------------------------------------------------------------
	// Populates map with markers from sample data
	// -----------------------------------------------------------------------------------------------------------------
	for (i in sites) {
		var title = sites[i].title;	//value searched
		var category = sites[i].category;
		var	loc = sites[i].loc;		//position found
		var marker = new L.Marker(new L.latLng(loc), {title: title} ); //se property searched
		marker.bindPopup("<b>" + title + "</b> (" + category + ")");
		// marker.bindPopup('title: ' + title);
		markersLayer.addLayer(marker);
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Adds custom admin control (top left), not implemented
	// -----------------------------------------------------------------------------------------------------------------
	map.addControl(new adminControl());
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

