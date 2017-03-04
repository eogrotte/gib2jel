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
}


function showSiteOnMap(name, category, lon, lat) {

	var marker = L.marker([lon, lat]).addTo(map);
	marker.bindPopup("<b>" + name + "</b> (" + category + ")").openPopup();

}