(function(){

  angular.module('social').controller('logout', ['$scope', '$http', '$window', function($scope, $http, $window) { 
        //your minsafe controller
        $scope.submit = function(){

          $http.post('/api/sessions/destroy')
          .success(function(data, status, headers, config){
            $window.location.href = "/"
          })
          .error(function(data, status, headers, config){
            alert('error')
          })

        }
        
  }]);
  
}())