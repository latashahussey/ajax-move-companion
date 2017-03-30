function loadData() {

  var $body = $('body');
  var $wikiElem = $('#wikipedia-links');
  var $nytHeaderElem = $('#nytimes-header');
  var $nytElem = $('#nytimes-articles');
  var $greeting = $('#greeting');

  // clear out old data before new request
  $wikiElem.text("");
  $nytElem.text("");

  // load streetview
  var $streetAddress = $('#street').val();
  var $city = $('#city').val();
  var $location = $streetAddress + ", " + $city;
  var $src = "https://maps.googleapis.com/maps/api/streetview?size=1200x1200&location=" + $location;

  // Update greeting
  $greeting.text("So you wanna live at " + $streetAddress + " in " + $city + "?");

  // Position streeview image below horizontal line
  //$('hr').after("<img>");

  // Add source and style image
  $('body').attr('background', $src);


  // Load New York Times API Request data with filtered results

    var $apiKey = "api-key=8777759c3d664c56a7a7005eaabec777";
    var $filteredQuery = "&fq=" + $city;
    var $sort = "&sort=newest";
    var $filteredList = "&fl=web_url,snippet,headline";
    var $nytAPI = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + $apiKey +
    $filteredQuery + $sort + $filteredList;

    $.getJSON($nytAPI).done(function(data) {
        //Update NYT Header element
        $nytHeaderElem.text("New York Times Articles About " + $city);

        //Save NYT articles
       var nytArticles = data.response.docs;

       // List these articles
       for(var i = 0; i < nytArticles.length; i++) {
           var nytArticle = nytArticles[i];

           $nytElem.append('<li class="article">' +
           '<a href="'+ nytArticle.web_url+'">'+ nytArticle.headline.main+'</a>' +
           '<p>'+ nytArticle.snippet + '</p>' +
           '</li>');
       }
   }).fail(function() {
       // Display alternate heading if response fails
       $nytHeaderElem.text("New York Times Articles Could Not Be Loaded");
   });

   // Load Wikipedia API data using JSONP, no API key required
  var apiWiki = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&callback=wikiCallback&search=" + $city;

  $.ajax({

      url: apiWiki,
      dataType: "jsonp",
      success: function(response) {

          // Save all article links
          var wikiArticles = response[1];

          // List these article links
          for(var i = 0; i < wikiArticles.length; i++) {
              var wikiArticle = wikiArticles[i];

              var url='http://en.wikipedia.org/wiki/' + wikiArticle;

              $wikiElem.append('<li class="article">' +
              '<a href="'+ url +'">'+ wikiArticle +'</a>' +
              '</li>');
          };
      }

  });

  return false;
};

$('#form-container').submit(loadData);
