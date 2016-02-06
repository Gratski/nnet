(function(){

  var controller = function($scope, $http, $window){

    $scope.submit = function(){

      $http.post('/api/sessions/destroy')
      .success(function(data, status, headers, config){
        $window.location.href = "/"
      })
      .error(function(data, status, headers, config){
        alert('error')
      })

    }

  }


  angular.module('social').controller('logout', controller)
}())