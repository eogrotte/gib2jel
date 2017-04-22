GIB2.mapInitService = {
    map: undefined,

    /**
     * Initializes map
     */
    initMap: function () {

        // Instantiates map
        map = L.map('map');

        // Sets view
        map.setView(new L.LatLng(63.4269, 10.3969), 13);

        // -------------------------------------------------------------------------------------------------------------
        // Adds layers to map
        // -------------------------------------------------------------------------------------------------------------
        // Adds an OpenStreetMap tile layer to map
        var osmTileLayer = this.buildLayerOpenStreetMap();
        map.addLayer(osmTileLayer);

        // Adds a markers layer group
        var markersLayerGroup = new L.LayerGroup();	//layer contain searched elements
        map.addLayer(markersLayerGroup);

        // -------------------------------------------------------------------------------------------------------------
        // Populates map with markers from sample data
        // -------------------------------------------------------------------------------------------------------------
        this.addSiteMarkersToLayerGroup(markersLayerGroup);

        // -------------------------------------------------------------------------------------------------------------
        // Adds custom controls
        // -------------------------------------------------------------------------------------------------------------
        // Adds search control (top right), on title
        this.addSiteMarkerSearchControl(markersLayerGroup);

        this.addLoginControl();
        this.addAdminControl();
        this.addShortestPathControl();

        // -------------------------------------------------------------------------------------------------------------
        // Adds mouse-click-listener
        // -------------------------------------------------------------------------------------------------------------
        // map.addEventListener('mousedown', function (ev) {
        //     var lat = ev.latlng.lat;
        //     var lng = ev.latlng.lng;
        //
        //     console.log(lat);
        //     console.log(lng);
        //     document.getElementById("x").value = lat;
        //     document.getElementById("y").value = lng;
        // });
    },

    /**
     * Builds Open Street Map
     */
    buildLayerOpenStreetMap: function () {
        var osmUrlTemplate = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

        var tileLayerOptions = {};
        tileLayerOptions.minZoom = 0; // default 0
        tileLayerOptions.maxZoom = 18; // default 18
        tileLayerOptions.attribution = "Map data © <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors";

        return L.tileLayer(osmUrlTemplate, tileLayerOptions);
    },

    /**
     * Shows site on map
     * @param name
     * @param category
     * @param lon
     * @param lat
     */
    showSiteOnMap: function (name, category, lon, lat) {
        var marker = L.marker([lon, lat]).addTo(map);
        marker.bindPopup("<b>" + name + "</b> (" + category + ")").openPopup();
    },

    /**
     * Adds login control
     * @returns {void|*}
     */
    addLoginControl: function () {
        var loginControl = L.Control.extend({
            options: {
                position: 'topright'
            },

            onAdd: function (map) {
                var loginHtml = $("#templateLogin").html();
                var $loginContainer = $(loginHtml);

                var $loginButton = $loginContainer.find("#loginBtn");
                $loginButton.on("click", function () {
                    alert("Nå skal jeg logge inn!");
                    // GIB2.loginService.login();
                });

                var $registerButton = $loginContainer.find("#createUser");
                $registerButton.on("click", function () {
                    alert("Nå skal bruker registreres eller avvises pga opptatt brukernavn");
                });

                return $loginContainer[0];
            },

            onRemove: function (map) {
                // L.DomEvent.off()
            }
        });
        map.addControl(new loginControl());
    },

    /**
     * Adds admin control
     * @returns {void|*}
     */
    addAdminControl: function () {
        var adminControl = L.Control.extend({
            options: {
                position: 'topleft'
            },

            onAdd: function (map) {
                var adminHtml = $("#templateAdmin").html();
                var $adminContainer = $(adminHtml);

                var $hideXButton = $adminContainer.find("#x");
                $hideXButton.hide();
                //$("#y").hide();

                var $addButton = $adminContainer.find("#adminAddBtn");
                $addButton.on("click", function (event) {
                    // alert("Nå skal det lagres!");
                    GIB2.siteService.addSite();
                });

                var $coordButton = $adminContainer.find("#adminFindCoord");
                $coordButton.on("click", function () {
                    alert("Trykk på punktet ditt i kartet, og trykk deretter på lagre-knappen for å lagre punktet ditt." +
                        " Hvis du trykker på feil punkt i kartet, kan du trykke på velg punkt-koordinater igjen.");
                    map.addOneTimeEventListener('mousedown', function (ev) {
                        var lat = ev.latlng.lat;
                        var lng = ev.latlng.lng;

                        console.log(lat);
                        console.log(lng);
                        document.getElementById("x").value = lat;
                        document.getElementById("y").value = lng;
                        });
                    $("#x").prop('disabled', true);
                    $("#y").prop('disabled', true);
                });


                return $adminContainer[0];
            },

            onRemove: function (map) {
                // L.DomEvent.off()
            }
        });

        map.addControl(new adminControl());

        var adminHtml = $("#templateAdmin").html();
        var $adminContainer = $(adminHtml);
        var $hideXButton = $adminContainer.find("#x");

        $("#x").prop('disabled', true);
        $("#y").prop('disabled', true);
    },

    /**
     * Adds shortest path control
     * @returns {void|*}
     */
    addShortestPathControl: function () {
        var shortestPathControl = L.Control.extend({
            options: {
                position: 'topleft'
            },

            onAdd: function (map) {
                var shortestpathHtml = $("#templateShortestPath").html();
                var $shortestpathContainer = $(shortestpathHtml);

                var $addButton = $shortestpathContainer.find("#shortestPathBtn");
                $addButton.on("click", function () {
                    alert("Nå skal korteste vei beregnes!");
                    GIB2.pathService.findShortestPath();
                });

                return $shortestpathContainer[0];
            },

            onRemove: function (map) {
                // L.DomEvent.off()
            }
        });

        map.addControl(new shortestPathControl());
    },

    /**
     * Adds a site marker search control (plugin)
     * @param markersLayerGroup
     * @returns {*}
     */
    addSiteMarkerSearchControl: function (markersLayerGroup) {
        var siteMarkerSearchControl = new L.Control.Search({
            layer: markersLayerGroup,
            position: 'topright',
            initial: false,
            zoom: 14,
            marker: false,
            // buildTip: customTip,
            autoType: false
        });

        map.addControl(siteMarkerSearchControl);
    },

    /**
     * Adds site markers to layer group
     * @param markersLayerGroup
     */
    addSiteMarkersToLayerGroup: function (markersLayerGroup) {
        // Retrieves sites from database
        var sites = GIB2.siteService.getSitesAll()
            .done(function (sites) {
                var sitesAsJson = JSON.parse(sites);
                console.log("sites done, length: " + sitesAsJson.length);

                $.each(sitesAsJson, function (index, site) {
                    var title = site.name;	//value searched
                    var category = site.category;
                    var loc = [site.x, site.y];		//position found
                    var marker = new L.Marker(new L.latLng(loc), {title: site.name}); //se property searched
                    marker.bindPopup("<b>" + title + "</b> (" + category + ")");
                    markersLayerGroup.addLayer(marker);
                });

                /*
                                $.each(sitesAsJson, function (index, site) {
                    var location = [site.x, site.y];
                    var marker = new L.Marker(new L.latLng(location), {title: site.name});
                    marker.bindPopup("<b>" + site.name + "</b> (" + site.category + ")");
                    markersLayerGroup.addLayer(marker);
                });
                 */

            });
    }
}



