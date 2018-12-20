
$(document).ready(function(){

var sports = ["baseball", "soccer", "football", "hockey", "golf", "swimming", "Lacrosse", "tennis", "basketball"];

function makeButtons(){
    $(".sportButtons").empty();
    for (sport in sports){
    var newButton = $("<button>");
    newButton.attr("data-name", sports[sport]);
    newButton.text(sports[sport]);
    $(".sportButtons").append(newButton);
    }
}

makeButtons();


});