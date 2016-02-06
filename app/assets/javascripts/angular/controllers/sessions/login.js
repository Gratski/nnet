(function(){

  var controller = function($scope, $http, $window){

    $scope.submit = function(){

      $http.post('/api/sessions/create', {login: {email: $scope.email, password: $scope.password}})
      .success(function(data, status, headers, config){
        jq('#login_modal').modal('hide')
        $window.location.href = "/matches"
      })
      .error(function(data, status, headers, config){
        alert('error')
      })

    }

  }


  angular.module('social').controller('login', controller)
}())