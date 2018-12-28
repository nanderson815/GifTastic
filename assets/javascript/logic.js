
$(document).ready(function () {
    // Array that holds all sports for buttons.
    var sports = ["Baseball", "Soccer", "Football", "Hockey", "Golf", "Swimming", "Lacrosse", "Tennis", "Basketball"];

    // Global vars
    var clickedSport;
    var sport;
    var offset = 0;

    // Function to display gifs.
    function displaySportInfo() {
        sport = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=zaEEu57nzDtnWvOM40Q8fAzHUftNNQfP&limit=10&rating=g&offset=" + offset;

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
                var ratingDiv = $("<p>").text("Rating: " + rating);
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

                // Create Download Button.
                // var form = $("<a>");
                // form.attr("href", response.data[i].images.fixed_height.url);
                // form.attr("download", response.data[i].title);
                // form.text("Download!")

                // var button = $("<button>");
                // button.text("Download!");
                // button.attr("type", "button");

                // Append button to form, form to gifDiv
                // form.append(button);
                // gifDiv.append(form);

                // prepend gifDiv to the page
                $(".sportGifs").prepend(gifDiv);

                // Offets by ten, so the next click will grab the next ten gifs
                offset = offset + 10;
                clickedSport = sport;
            }

        });
    }

    // Function to animate gifs. Toggles between moving and still images on click.
    function animateGifs() {
        var state = $(this).attr("data-state");

        if (state === "still") {
            var animate = $(this).attr("data-animated");
            $(this).attr("src", animate).attr("data-state", "animated");

        } else {
            var still = $(this).attr("data-still");
            $(this).attr("src", still).attr("data-state", "still");
        }
    };

    // Empyts the gif Div if a new sport is selected.
    function emptyDiv() {
        if (clickedSport !== sport) {
            $(".sportGifs").empty();
            offset = 0;
        }
    };

    // Function to create a button for each element in the sports array. 
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

    // function that will push new sport to the array if the input is not empty. 
    $("#addSport").on("click", function (event) {
        event.preventDefault();

        if ($("#sportText").val().length !== 0) {
            sports.push($("#sportText").val().trim());
            makeButtons();
            $("#sportText").val('');
        }
    });

    // Runs the displaySport info function when class sportButton is clicked.
    $(document).on("click", ".sportButton", displaySportInfo);

    // Animates the gif whenever an img is clicked.
    $(document).on("click", "img", animateGifs);

    // Makes buttons on load. 
    makeButtons();


});