(function(){

  angular.module('social').controller('change_password', ['$scope', 'users_service', '$http', '$window', '$routeParams', function($scope, users_service, $http, $window, $routeParams){

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

      users_service.update_password($scope.password.cur, $scope.password.newpass)
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