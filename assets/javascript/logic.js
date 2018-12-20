
$(document).ready(function () {

    var sports = ["Baseball", "Soccer", "Football", "Hockey", "Golf", "Swimming", "Lacrosse", "Tennis", "Basketball"];

    function makeButtons() {
        $(".sportButtons").empty();
        for (sport in sports) {
            var newButton = $("<button>");
            newButton.attr("data-name", sports[sport]);
            newButton.text(sports[sport]);
            $(".sportButtons").append(newButton);
        }
    }

    makeButtons();

    $("#addSport").on("click", function (event) {
        event.preventDefault();

        var sport = $("#sportText").val().trim();
        sports.push(sport);

        makeButtons();

        $("#sportText").val('');

    });

});