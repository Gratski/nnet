(function(){

  angular.module('social').service('sectors_service', ['$http', function($http){

    this.all = function(){
      return $http.get('/api/sectors')
    }

    this.areas = function(sector_id){
      return $http.get('/api/sector_areas/'+sector_id)
    }

  }])

}())