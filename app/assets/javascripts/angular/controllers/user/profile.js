(function(){

  angular.module('social').controller('profile', ['$scope', '$http', '$window', function($scope, $http, $window) { 
        //your minsafe controller
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
  }]);

  
}())