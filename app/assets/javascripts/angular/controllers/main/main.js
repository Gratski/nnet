(function(){

  angular
    .module('social')
    .controller('main', ['$scope', '$http', function($scope, $http) { 
      
      $scope.sectors = []
      $scope.sector_areas = []

      $scope.get_all_sectors = function(){
        $http.get('/api/sectors')
        .success(function(data, status, headers, config){
          console.log('Main Controller:')
          console.log(data)
          $scope.sectors = data
        })
        .error(function(data, status, headers, config){
          console.log('Main Controller:')
          console.log(data)
        })
      }

      $scope.init = function(){
        $scope.get_all_sectors()
      }

      //call init method
      $scope.init()

    }]);

}())