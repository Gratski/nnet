(function(){


  angular.module('social').controller('signup', ['$scope', '$http', '$window', function($scope, $http, $window) { 

    $scope.errors =  {}

    $scope.submit = function(){

      if (!$scope.valid_password || !$scope.valid_email)
        return false

      $http.post('/api/sessions/new', {sign_up: {name: $scope.username, email: $scope.email, password: $scope.password}})
      .success(function(data, status, headers, config){
        jq('#signup_modal').modal('hide')
      })
      .error(function(data, status, headers, config){
        $scope.errors.submission = true
      })
    }

    //validate email
    $scope.valid_email = function(){
      var valid = true
      if ($scope.email == '' || $scope.email == null)
      {
        $scope.errors.email_blank = true
        valid = false
      }
      return valid
    }
    //validate passwords
    $scope.valid_password = function(){

      var valid = true
      if (!$scope.password)
      {
        $scope.errors.password_not_filled = true
        valid = false
      }
      if (!scope.password_confirmation)
      {
        $scope.errors.password_confirmation_not_filled = true
        valid = false
      }
      if ($scope.password != $scope.password_confirmation)
      {
        $scope.errors.password_not_match = true 
        valid = false
      }

      //uncheck error flags if valid
      if (valid){
        $scope.errors.password_not_filled              = false
        $scope.errors.password_confirmation_not_filled = false
        $scope.errors.password_not_match               = false  
      }

      return valid
    }
        
  }]);
  
}())