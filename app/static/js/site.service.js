function addSiteX() {
    console.log("addSite invoked");
    $.post('/addSite', {
        category: $("#category").text(),
        name: $("#name").text(),
        description: $("#description").text(),
        x: $("#x").text(),
        y: $("#y").text()
    }).done(function (status) {
        $("#status").text("Sted er lagret, status: " + status);
    }).fail(function () {
        $("#status").text("Feil ved lagring, status: " + status);
    });
}