GIB2.siteService = {
    /**
     * Adds site
     */
    addSite: function () {

        console.log("addSite invoked");

        name = $("#name").val();
        console.log("name: " + name);
        category = $("#category").val();
        description = $("#description").val();
        x = $("#x").val();
        y = $("#y").val();

        if (name === undefined || name === null || name.trim().length === 0) {
            $("#statusSite").addClass("statusError");
            $("#statusSite").text("Navn må fylles ut");
            return;
        }

        if (category === undefined || category === null || category.trim().length === 0) {
            $("#statusSite").addClass("statusError");
            $("#statusSite").text("Kategori må fylles ut");
            return;
        }
        
        if (x === undefined || x === null || x.trim().length === 0 || y === undefined || y === null || y.trim().length === 0){
            $("#statusSite").addClass("statusError");
            $("#statusSite").text("Ugyldige koordinater.");
            return;
        }

        site = {
            name: name,
            category: category,
            description: description,
            x: x,
            y: y
        };

        console.log("site: " + JSON.stringify(site));

        $.ajax({
            type: 'POST',
            url: '/addSite',
            data: JSON.stringify(site),
            // dataType: "text",
            contentType: 'application/json;charset=UTF-8'
        }).done(function (status) {
            $("#statusSite").addClass("statusInfo");
            $("#statusSite").text("Sted er lagret");
            GIB2.mapInitService.updateSitesDatalistAndMarkers();
            // TODO: Add marker
        }).fail(function (xhr, status, error) {
            $("#statusSite").addClass("statusError");
            $("#statusSite").text("Feil ved lagring: " + xhr.responseText);
        });
    },

    deleteSite: function(name) {
        var that = this;
        $.ajax({
            type: 'GET',
            url: '/sites/delete/' + name
        }).done(function (response) {
            $("#statusDeleteSite").addClass("statusInfo");
            $("#statusDeleteSite").text("Stedet \"" + name + "\" er slettet.");
            GIB2.mapInitService.updateSitesDatalistAndMarkers();
        }).fail(function (xhr, status, error) {
            $("#statusDeleteSite").addClass("statusError");
            $("#statusDeleteSite").text("Feil ved sletting, status: " + status);
        });
    },

    /**
     * Retrieves sites for category
     */
    getSitesForCategoryAndSearchString: function (category, searchstring) {
        console.log("getSitesForCategory invoked");

        $.ajax({
            type: 'GET',
            url: '/sites/' + category + '/' + searchstring,
            contentType: 'application/json;charset=UTF-8'
        }).done(function (sites) {
            $.each(sites, function (index, site) {
                console.log(site.category + ": " + site.name);
            });
            $("#statusSites").text("Antall steder funnet: " + sites.length);
        }).fail(function (xhr, status, error) {
            $("#statusSites").text("Feil ved uthenting av steder: " + status);
        });
    },

    /**
     * Retrieves all sites
     */
    getSitesAll: function () {
        console.log("getSitesAll invoked");

        return $.ajax({
            type: 'GET',
            url: '/sites',
            data: 'json',
            contentType: 'application/json;charset=UTF-8'
        }).fail(function (xhr, status, error) {
            console.log("getSitesAll failed, status: " + status);
            // $("#statusSites").text("Feil ved uthenting av steder: " + status);
        });
    },

    /**
     * Validates site
     * @param site
     */
    validateSite: function (site) {
        // TODO:
    }
};
