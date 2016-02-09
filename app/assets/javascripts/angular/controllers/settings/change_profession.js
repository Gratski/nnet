(function(){

  angular.module('social').controller('change_profession', ['$scope', '$http', '$window', '$routeParams', function($scope, $http, $window, $routeParams){

      $scope.sector = 0
      $scope.sector_area = 0
      $scope.errors = {}

      $scope.change = function(){
        alert($scope.sector)
        alert($scope.sector_area)
      }

  }])


}())