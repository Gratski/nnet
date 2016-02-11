(function(){

  angular.module('social').controller('change_profession', ['$scope', 'users_service', '$timeout', 'sectors_service', '$http', '$window', '$routeParams', function($scope, users_service, $timeout, sectors_service, $http, $window, $routeParams){

      $scope.errors = {}
      $scope.selected_sector;
      $scope.selected_sector_area;

      //WATCHERS
      $scope.$watch('selected_sector', function(){
        if ($scope.selected_sector != undefined && $scope.selected_sector != 'undefined'){
          console.log($scope.selected_sector)
          $scope.get_sector_areas()
        }
      })

      //GETTERS
      $scope.get_sectors = function(){

        sectors_service.all().success(function(data, status, headers, config){
          console.log('good')
          console.log(data)
          $scope.sectors = data
        })
        .error(function(data, status, headers, config){
          console.log('error')
          $scope.sectors = []
        })
      }
      $scope.get_sector_areas = function(){
        sectors_service.areas($scope.selected_sector)
        .success(function(data, status, headers, config){
          $scope.sector_areas = data
        })
        .error(function(data, status, headers, config){
          console.log('error')
        })
      }

      //SUBMIT
      $scope.change = function(){
        users_service.update_sector_area($scope.selected_sector_area)
        .success(function(){
          console.log('done!')
          $timeout(function(){
            $window.history.back()
          }, 1000)
        })
        .error(function(d, status, h, c){
          console.log('error')
          console.log(status)
        })
      }

      //call init method
      $scope.get_sectors()

  }])


}())