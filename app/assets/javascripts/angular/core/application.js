var jq = jQuery.noConflict();

(function(){

  var app = angular.module('social',['ngRoute'])

  angular.module('social').value('ajax_headers_regular', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
}())