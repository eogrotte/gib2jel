GIB2.pathService = {
    /**
     * Finds shortest path
     */
    findShortestPath: function () {
        console.log("findShortestPath invoked");
        $.post('/shortestPath', {
            siteFrom: $("#siteFrom").text(),
            siteTo: $("#siteTo").text()
        }).done(function (status) {
            $("#statusPath").text("Korteste vei er beregnet, status: " + status);
        }).fail(function () {
            $("#statusPath").text("Feil ved beregning av korteste vei, status: " + status);
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
