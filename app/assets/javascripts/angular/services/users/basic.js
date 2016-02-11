(function(){

  angular.module('social').service('users_service', ['$http', function($http){

    //PUT
    this.update_password = function(password, new_password){
      return $http.put('/api/users/password', {password: password, new_password: new_password})
    }
    this.update_sector_area = function(sector_area_id){
      return $http.put('/api/users/sector_area', {sector_area_id: sector_area_id})
    }

  }])

}())