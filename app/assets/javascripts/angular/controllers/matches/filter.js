(function(){

  angular.module('social').controller('matches_filter', ['$scope', '$http', '$routeParams', '$window', function($scope, $http, $routeParams, $window){

    //attributes
    $scope.matches = {}

    $scope.get_matches = function(){}

    //set the search params by url
    console.log($routeParams.page)


  }])


}())