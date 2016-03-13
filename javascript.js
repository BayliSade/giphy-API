var actions = ["Dancing", "Swimming", "Shopping", "Crying"];// array of actions, new actions will be pushed into this array;
function displayButtons(){ 
    $("#buttonsView").empty(); // erasing anything in this div id so that it doesnt duplicate the results
    for (var i = 0; i < actions.length; i++){
        var a = $("<button>");
        a.addClass("action");
        a.addClass("btn btn-primary")
        a.attr("data-name", actions[i]);
        a.text(actions[i]);
        $("#buttonsView").append(a);
    }
}
function displayGifs(){
    var action = $(this).attr("data-name");
    // console.log($(this));
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL); // displays the constructed url
    //Write code between the dashes below to hit the queryURL, take the data and display it in the div with an id of gifsView
    
    $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response); // console test to make sure something returns
            $("#gifsView").empty(); // emptys off the gifs so it doesnt keep them
            var results = response.data; //shows results of gifs
            for (var i=0; i<results.length; i++){

                var gifDiv = $("<div>");
    
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                $("#gifsView").prepend(gifDiv);
            }
    });
}
// calling fuctions
displayButtons();
$("#addGif").on("click", function(){
    var action = $("#action-input").val().trim();
    actions.push(action);
    
    displayButtons();
    return false;
});
$(document).on("click", ".action", displayGifs);
