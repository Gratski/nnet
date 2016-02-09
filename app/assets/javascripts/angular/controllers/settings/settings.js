(function(){

  angular.module('social').controller('settings', ['$scope', '$http', '$window', '$routeParams', function($scope, $http, $window, $routeParams){

    $scope.user;

    $scope.init = function(user){
      $scope.user = user
    }    

  }])


}())