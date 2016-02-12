(function(){

  angular.module('social').controller('matches_filter', ['$scope', '$http', '$routeParams', '$window', '$timeout', function($scope, $http, $routeParams, $window, $timeout){

    //loaders
    $scope.loader = {}
    $scope.loader.countries = false
    $scope.loader.cities = false

    $scope.filter = {}
    //countries
    $scope.filter.country = {}
    $scope.filter.country.list = [];
    $scope.filter.country.selected = 1
    //cities
    $scope.filter.city = {}
    $scope.filter.city.list = []
    $scope.filter.city.selected;
    //age
    $scope.filter.age = {}
    $scope.filter.age.min;
    $scope.filter.age.max;
    //looking for
    $scope.filter.looking_for;

    //send update to server
    $scope.filter.update = function(){
      
      var obj = {}
      obj.country_id = $scope.filter.country.selected
      obj.city_id = $scope.filter.city.selected
      obj.min_age = $scope.filter.age.min
      obj.max_age = $scope.filter.age.max
      obj.looking_for = $scope.filter.looking_for

      $http.put('/api/search', obj)
      .success(function(data, status, headers, config){
        console.log('updated!')
        $scope.$parent.refresh()
      })
      .error(function(data, status, headers, config){
        console.log('oops... not updated.')
      })
    }

    $scope.get_cities = function(country_id){
      $scope.loader.cities = true
      get_cities(country_id)
      $scope.loader.cities = false
    }

    // get countries
    var get_countries = function(){
      //set loader
      $scope.loader.countries = true

      $http.get('/api/locations/country')
      .success(function(data, status, headers, config){
        $scope.filter.country.list = data
        $scope.filter.city.list = []
        console.log('done!')
        //remove loader
        $scope.loader.countries = false
      })
      .error(function(data, status, headers, config){
        $scope.filter.country.list = []
        $scope.loader.countries = false
      })
    }
    // get cities
    var get_cities = function(country_id){
      $http.get('/api/locations/country/'+country_id)
      .success(function(data, status, headers, config){
        $scope.filter.city.list = data
      })
      .error(function(data, status, headers, config){
        $scope.filter.city.list = []
      })
    }
    var init = function(){
      //get countries
      get_countries()
    }
    
    init()

  }])


}())