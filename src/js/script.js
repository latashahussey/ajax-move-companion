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
  var $src = "https://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + $location;

  // Update greeting
  $greeting.text("So you wanna live at " + $streetAddress + " in " + $city + "?");

  // Position streeview image below horizontal line
  $('hr').after("<img>");

  // Add source and style image
  $('img').addClass('bgimg').attr('src', $src);

  return false;
};

$('#form-container').submit(loadData);
