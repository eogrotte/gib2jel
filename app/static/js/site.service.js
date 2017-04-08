GIB2.siteService = {
    /**
     * Adds site
     */
    addSite: function () {
        console.log("addSite invoked");
        $.post('/addSite', {
            name: $("#name").text(),
            category: $("#category").text(),
            description: $("#description").text()
            x: $("#x").text(),
            y: $("#y").text()
        }).done(function (status) {
            $("#statusSite").text("Sted er lagret, status: " + status);
        }).fail(function () {
            $("#statusSite").text("Feil ved lagring, status: " + status);
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
