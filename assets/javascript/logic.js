
$(document).ready(function () {

    var sports = ["Baseball", "Soccer", "Football", "Hockey", "Golf", "Swimming", "Lacrosse", "Tennis", "Basketball"];

    var clickedSport;
    var sport;
    var offset = 0;

    function displaySportInfo() {
        sport = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=zaEEu57nzDtnWvOM40Q8fAzHUftNNQfP&limit=10&rating=g&offset="+offset;

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response);

            emptyDiv();

            // for loop for all gifs grabbed in data.
            for (i = 0; i < response.data.length; i++) {

                // Create an  div
                var gifDiv = $("<div>");
                gifDiv.addClass("gifDiv");

                // Grab the rating and prepend to the div
                var rating = response.data[i].rating;
                var ratingDiv = $("<p>").text("Rating: "+rating);
                gifDiv.prepend(ratingDiv);

                // Create an image 
                var image = $("<img>");

                // Grab the still image and set it as data-still for IMG
                image.attr("data-still", response.data[i].images.fixed_height_still.url);

                // set the SRC of IMG to data-still
                image.attr("src", response.data[i].images.fixed_height_still.url);

                // Grab the gif and set it as data-animated
                image.attr("data-animated", response.data[i].images.fixed_height.url);

                // Set data-state attribute to still
                image.attr("data-state", "still");

                // Append Img to the div.
                gifDiv.append(image);

                // prepend gifDiv to the page
                $(".sportGifs").prepend(gifDiv);

                offset = offset + 10;
                clickedSport = sport;
            }

        });
    }

    function animateGifs(){
        var state = $(this).attr("data-state");

        if (state === "still"){
            var animate = $(this).attr("data-animated");
            $(this).attr("src", animate).attr("data-state", "animated");

        } else {
            var still = $(this).attr("data-still");
            $(this).attr("src", still).attr("data-state", "still");
        }
    };

    function emptyDiv() {
        if (clickedSport !== sport) {
            $(".sportGifs").empty();
        }
    };


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

    $(document).on("click", "img", animateGifs);


    makeButtons();


});