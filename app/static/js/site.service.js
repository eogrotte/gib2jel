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
        x = $("#x").text();
        y = $("#y").text();
        site = {
            name: name,
            category: category,
            description: description,
            x: x,
            y: y
        };

        console.log("site: " + JSON.stringify(site));

        /*
        $.post('/addSite', { site: JSON.stringify(site)
        }).done(function (status) {
            $("#statusSite").text("Sted er lagret, status: " + status);
        }).fail(function () {
            $("#statusSite").text("Feil ved lagring, status: " + status);
        });
        */


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
     * Validates site
     * @param site
     */
    validateSite: function(site) {
    // TODO:
    }
};
