(function(){

  var controller = function($scope, $window, $http){

    var div_user    = document.getElementById("div_user")
    var div_details = document.getElementById("div_details")

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