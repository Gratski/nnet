(function(){

  var controller = function($scope, $http){

    $scope.details = {}

    $scope.submit = function(){
      d = {
        mobile: 1,
        user: {
                email: $scope.details.email,
                password: $scope.details.password,
                remember_me: 1
            }
      }
      $http.post('/test', d, {headers: {'Content-Type': 'application/json'}} )
      .success(function(data, status, headers, config){
        alert('Status:' + status)
        alert('Data:' + data)
      })
      .error(function(data, status, headers, config){
        console.log('Error')
        console.log('Status:' + status)
        console.log('Data:' + data)
      })
    }

  }

  angular.module('social').controller('sign_in', controller)

}())