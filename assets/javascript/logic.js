
$(document).ready(function () {

    var sports = ["Baseball", "Soccer", "Football", "Hockey", "Golf", "Swimming", "Lacrosse", "Tennis", "Basketball"];

    function displaySportInfo() {
        var sport = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=zaEEu57nzDtnWvOM40Q8fAzHUftNNQfP";

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response);
        });
    }

    function makeButtons() {
        $(".sportButtons").empty();
        for (i in sports) {
            var newButton = $("<button>");
            newButton.addClass("sportButton");
            newButton.attr("data-name", sports[i]);
            newButton.text(sports[i]);
            $(".sportButtons").append(newButton);
        }
    }



    $("#addSport").on("click", function (event) {
        event.preventDefault();

        if ($("#sportText").val().length !== 0) {
            sports.push($("#sportText").val().trim());

            makeButtons();


            $("#sportText").val('');
        }
    });

    $(document).on("click", ".sportButton", displaySportInfo);

    makeButtons();


});