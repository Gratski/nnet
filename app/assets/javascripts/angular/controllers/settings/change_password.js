(function(){

  angular.module('social').controller('change_password', ['$scope', '$http', '$window', '$routeParams', function($scope, $http, $window, $routeParams){

    $scope.password = {}
    $scope.password.cur;
    $scope.password.newpass;
    $scope.password.newpass_confirmation;

    $scope.errors = {}

    $scope.change = function(){

      if ($scope.password.newpass != $scope.password.newpass_confirmation){
        $scope.errors.match = true
        return;
      }

      $scope.errors = {}

      $http.post('/api/users/password', {password: $scope.password.cur, new_password: $scope.password.newpass})
      .success(function(data, status, headers, config){
        $scope.password = {}
        $window.history.back()
      })
      .error(function(data, status, headers, config){
        
        //if wrong password
        if (status == 401){
          $scope.errors.wrong_pass = true
          //reset password
          $scope.password.newpass = null
          $scope.password.newpass_confirmation = null
          return;
        }
        //if not able to save
        if ( status == 406 ){
          $scope.errors.unable_to_save = true
          return;
        }
        else{
          $scope.errors.unknown = true
        }

      })

    }

  }])


}())