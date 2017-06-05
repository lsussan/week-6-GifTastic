
  // array of movies
  var movies = ["Pulp Fiction", "Step Brothers", "Reservoir Dogs", "Zoolander", "Old School", "Back to the Future", "Tropic Thunder", "Superbad", "Rocky", "Friday"];
  // display movie buttons on page
  $(document).on("click", ".movie", function() {
        var movie = $(this).attr("data-name");
        giphyAjax(movie);

  });

  $(document).on("click", ".search", function() {
      event.preventDefault();
      var movie = $("#movie-input").val().trim();
      giphyAjax(movie);
      $("#movie-input").val("");
      var movieBtn = $("<button>");
      movieBtn.addClass("movieBtn");
      movieBtn.text(movie);
      $("#buttons-view").append(movieBtn);


  });

$(document).on("click", ".image",function() {
  var state = $(this).attr("data-state");
  if (state == "still") {
    $(this).attr("src", $(this).data("animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).data("still"));
    $(this).attr("data-state", "still");
  }
});

function giphyAjax(movie) {
  // Ajax call with the queryURL
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
    // after data comes back from the request
  }).done(function(response) {
    console.log(response.data);
    printMovieGifs(response.data);
    // var results = response.data;
    // create div to hold movie
    // var movieDiv = $("<div class='movie'>");

  });
}



function printMovieGifs(giphyData) {
  var moviesView = $("#movies-view");
  moviesView.empty();

  for (var i = 0; i < giphyData.length; i++) {
    var p = $("<p>").text("Rating: " + giphyData[i].rating);
    var div = $("<div>");
    div.text(giphyData.rating);
    // div.width(250);
    var image = $("<img>");
    image.attr("src", giphyData[i].images.fixed_width_still.url);
    image.attr("data-still", giphyData[i].images.fixed_width_still.url);
    image.attr("data-animate", giphyData[i].images.fixed_width.url);
    image.attr("data-state", "still");
    image.addClass("image");

    div.append(p);
    div.append(image);
    moviesView.append(div);

  }

}


  // function for displaying data
function renderButtons() {
  // clear buttons
  $("#buttons-view").empty();
  // for loop for movies
  for (var i = 0; i < movies.length; i++) {
    // create var a and assign buttons
    var a = $("<button>");
    //add class .movie to var a
    a.addClass("movie");
    //
    a.attr("data-name", movies[i]);

    a.text(movies[i]);

    $("#buttons-view").append(a);

  }
}

renderButtons();
