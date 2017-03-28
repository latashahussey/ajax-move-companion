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

  $greeting.text("So you wanna live at " + $streetAddress + "?");

  $('body').append("<img>")
  $('img').addClass('bgimg').attr('src', $src);




  return false;
};

$('#form-container').submit(loadData);
