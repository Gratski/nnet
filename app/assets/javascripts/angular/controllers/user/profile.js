(function(){

  var controller = function($scope, $window, $http){

    //simple punch function
    $scope.punch = function(user_punched_id)
    {
      $http.post('/api/punch', {id: user_punched_id})
      .success(function(data, status, headers, config){
        alert('GOOD!')
      })
      .error(function(data, status, headers, config){
        alert("oops...")
      })
    }

  }

  angular.module('social').controller('profile', controller)
}())