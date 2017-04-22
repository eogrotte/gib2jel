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
            $("#statusSite").text("Sted er lagret, status: " + status);
        }).fail(function () {
            $("#statusSite").text("Feil ved lagring, status: " + status);
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
            $.each(sites, function(index, site) {
                console.log(site.category + ": " + site.name);
            });
            $("#statusSites").text("Antall steder funnet: " + sites.length);
        }).fail(function () {
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
        }).fail(function () {
            console.log("sites fail");
            // $("#statusSites").text("Feil ved uthenting av steder: " + status);
        });
    },

    /**
     * Validates site
     * @param site
     */
    validateSite: function(site) {
    // TODO:
    }
};
